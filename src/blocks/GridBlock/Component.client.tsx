"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { useRef } from "react";

import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

import type { GridBlockProps } from "./Component";

// Import RichText component

export const GridBlockClient: React.FC<GridBlockProps> = (props) => {
	const { id, title, subtitle, richText, gridItems = [] } = props;

	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.1 });

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "tween",
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const headerVariants = {
		hidden: { opacity: 0, y: -20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	// Helper function to determine grid column span based on colSpan prop
	const getColSpan = (colSpan?: string) => {
		return colSpan === "2" ? "lg:col-span-3" : "lg:col-span-2";
	};

	// Helper function to assign special corner radius classes based on item position
	// Now we'll assign these automatically based on order
	const getCornerClasses = (index: number, totalItems: number) => {
		// First item (top left on desktop)
		if (index === 0) return "max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]";

		// Last item in the top row on desktop (usually index 2, but could be 1 if we have a wide item)
		let itemsInTopRow = gridItems.slice(0, 3).filter((item, i) => {
			// If previous items have a colSpan of 2, they take up 2 spots
			if (i === 0) return true;
			let previousSpan = gridItems.slice(0, i).reduce((total, item) => {
				return total + (item.colSpan === "2" ? 2 : 1);
			}, 0);
			return previousSpan < 3; // If previous items take less than 3 spots, this item is in top row
		}).length;

		let lastTopRowIndex = itemsInTopRow - 1;
		if (index === lastTopRowIndex) return "lg:rounded-tr-[2rem]";

		// First item in bottom row
		let firstBottomRowIndex = itemsInTopRow;
		if (index === firstBottomRowIndex) return "lg:rounded-bl-[2rem]";

		// Last item (bottom right on desktop, bottom on mobile)
		if (index === totalItems - 1) return "max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]";

		return "";
	};

	return (
		<div className="py-24 sm:py-32" id={`block-${id}`} ref={containerRef}>
			<div className="container">
				<motion.div
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					variants={headerVariants}
				>
					{subtitle && (
						<h2 className="text-secondary-600 text-base/7 font-semibold">{subtitle}</h2>
					)}
					{title && (
						<p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
							{title}
						</p>
					)}
					{richText && (
						<div className="mt-4 max-w-2xl text-gray-600">
							<RichText data={richText} />
						</div>
					)}
				</motion.div>

				<motion.div
					className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
				>
					{gridItems.map((item, index) => {
						const cornerClasses = getCornerClasses(index, gridItems.length);

						return (
							<motion.div
								key={item.id || index}
								className={`relative ${getColSpan(item.colSpan)}`}
								variants={itemVariants}
							>
								<div
									className={`absolute inset-px rounded-lg bg-white ${cornerClasses}`}
								/>
								<div
									className={`relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] ${cornerClasses.replace("rounded", "rounded-").replace(/\[/g, "[calc(").replace(/\]/g, "+1px)]")}`}
								>
									{item.image && (
										<Media
											resource={item.image}
											imgClassName="h-80 object-cover object-left"
											alt={typeof item.title === "string" ? item.title : ""}
										/>
									)}
									<div className="p-10 pt-4">
										{item.title && (
											<p className="mt-0 text-lg font-medium tracking-tight text-gray-950">
												{item.title}
											</p>
										)}
										{item.description && (
											<div className="mt-2 max-w-lg text-sm/6 text-gray-600">
												<RichText data={item.description} />
											</div>
										)}
									</div>
								</div>
								<div
									className={`pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 ${cornerClasses}`}
								/>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
};
