"use client";

import type { Media as MediaType } from "@/payload-types";
import { motion, useInView } from "motion/react";
import React, { useRef, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Media } from "@/components/Media";

interface GalleryImage {
	image: string | MediaType;
	caption: string;
}

interface GalleryBlockClientProps {
	id?: string;
	galleryTitle?: string | null;
	displayMode: "carousel" | "grid";
	images: GalleryImage[];
}

export const GalleryBlockClient: React.FC<GalleryBlockClientProps> = ({
	id,
	galleryTitle,
	displayMode,
	images,
}) => {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.2 });
	const [activeIndex, setActiveIndex] = useState(0);

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
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	// If there are not enough images, don't render
	if (images.length < 1) {
		return null;
	}

	return (
		<div className="my-16 py-12 sm:py-20" id={`block-${id}`} ref={containerRef}>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{galleryTitle && (
						<motion.div
							className="mb-10 flex items-center gap-x-8"
							initial={{ opacity: 0, y: -10 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="font-display text-center text-2xl font-semibold tracking-wider text-neutral-800 sm:text-left">
								{galleryTitle}
							</h2>
							<div className="h-px flex-auto bg-neutral-200"></div>
						</motion.div>
					)}

					{displayMode === "carousel" ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : { opacity: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="relative"
						>
							<Swiper
								modules={[Navigation, Pagination, A11y, EffectFade]}
								spaceBetween={30}
								slidesPerView={1}
								navigation
								pagination={{ clickable: true }}
								onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
								className="overflow-hidden rounded-lg"
								effect="fade"
							>
								{images.map((item, index) => (
									<SwiperSlide key={`slide-${index}`}>
										<div className="aspect-w-16 aspect-h-9 relative">
											<Media
												resource={item.image}
												className="object-cover"
												priority={index === 0}
											/>
											{item.caption && (
												<div className="absolute right-0 bottom-0 left-0 bg-black/60 p-4 text-white">
													<p className="text-sm sm:text-base">
														{item.caption}
													</p>
												</div>
											)}
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</motion.div>
					) : (
						// Grid layout
						<motion.div
							className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
							variants={containerVariants}
							initial="hidden"
							animate={isInView ? "show" : "hidden"}
						>
							{images.map((item, index) => (
								<motion.div
									key={`grid-item-${index}`}
									variants={itemVariants}
									className="overflow-hidden rounded-lg"
								>
									<div className="aspect-w-4 aspect-h-3 relative">
										<Media
											resource={item.image}
											className="object-cover transition-transform duration-500 hover:scale-105"
										/>
									</div>
									{item.caption && (
										<div className="bg-white p-4 dark:bg-neutral-800">
											<p className="text-sm text-neutral-600 dark:text-neutral-300">
												{item.caption}
											</p>
										</div>
									)}
								</motion.div>
							))}
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};
