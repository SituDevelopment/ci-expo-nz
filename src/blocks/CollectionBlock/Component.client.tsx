"use client";

import type { Exhibitor, Sponsor } from "@/payload-types";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { useRef } from "react";

import { CMSLink } from "../../components/Link";

// Define interface that matches exactly what we need from the config.js
interface CollectionBlockClientProps {
	id?: string;
	title?: string | null;
	collectionSelect: "sponsors" | "exhibitors";
	displayMode: "all" | "selected";
	limit?: number | null;
	selectedItems?: Array<{
		relationTo: "sponsors" | "exhibitors";
		value: string | Sponsor | Exhibitor;
	} | null> | null;
	enableLink?: boolean | null;
	link?: Record<string, any> | null;
	blockType: "collectionBlock";
	items: (Exhibitor | Sponsor)[];
}

export const CollectionBlockClient: React.FC<CollectionBlockClientProps> = (props) => {
	// Defensive destructuring with defaults
	const { id = undefined, title = null, enableLink = false, link = null, items = [] } = props;
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.2 });

	// Safety check for items array
	if (!Array.isArray(items)) {
		console.error("Expected items to be an array, got:", items);
		return null;
	}

	/*
	 * Animation variants for container and items.
	 * The parent acts as a trigger/watcher. When
	 * it is in view, then we trigger the child
	 * animations. This could be refactored later
	 * to be more granular in the future.
	 */
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
		hidden: { opacity: 0, y: 15 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "tween",
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	return (
		<div
			className="my-16 rounded-[4rem] bg-white py-20 ring ring-neutral-200 sm:mt-32 sm:py-32 dark:ring-0"
			id={`block-${id}`}
			ref={containerRef}
		>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					{title && (
						<motion.div
							className="flex items-center gap-x-8"
							initial={{ opacity: 0, y: -10 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="font-display text-center text-sm font-semibold tracking-wider text-neutral-800 sm:text-left">
								{title}
							</h2>
							<div className="h-px flex-auto bg-neutral-200"></div>
						</motion.div>
					)}
					<motion.div
						className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-6"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						{items.map((item) => (
							<motion.div key={item.id} className="" variants={itemVariants}>
								{item.media &&
									typeof item.media === "object" &&
									"url" in item.media &&
									typeof item.media.url === "string" && (
										<img
											src={item.media.url}
											alt={
												typeof item.media.alt === "string"
													? item.media.alt
													: ""
											}
											className="h-20 self-start rounded-lg object-contain object-left"
										/>
									)}
							</motion.div>
						))}
					</motion.div>
					<div className="mt-16">
						{enableLink && link && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : { opacity: 0 }}
								transition={{ delay: 0.6, duration: 0.5 }}
							>
								<CMSLink
									{...link}
									appearance="link"
									className="group items-center gap-2 text-base font-semibold text-neutral-600"
								>
									<MoveRight
										absoluteStrokeWidth
										strokeWidth={0.5}
										className="size-8 text-neutral-500 opacity-95 transition duration-500 group-hover:translate-x-2"
									/>
								</CMSLink>
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
