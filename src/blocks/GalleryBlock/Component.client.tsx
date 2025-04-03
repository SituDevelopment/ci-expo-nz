"use client";

import type { Media as MediaType } from "@/payload-types";
import { motion, useInView } from "motion/react";
import React, { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Pagination, A11y } from "swiper/modules";
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
	const isInView = useInView(containerRef, { once: true, amount: 0.5 });
	const [activeIndex, setActiveIndex] = useState(0);
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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
		<div className="py-12 sm:py-20" id={`block-${id}`} ref={containerRef}>
			<div className="container mx-auto px-6 lg:px-8">
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
						{/* Main gallery Slider */}
						<Swiper
							style={
								{
									"--swiper-navigation-color": "var(--color-neutral-800)",
									"--swiper-pagination-color": "var(--color-neutral-800)",
								} as React.CSSProperties
							}
							modules={[FreeMode, Navigation, Thumbs, Pagination, A11y]}
							spaceBetween={24}
							navigation={true}
							thumbs={{
								swiper:
									thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
							}}
							loop={true}
							className="gallery-main-swiper mb-3 w-full overflow-visible"
							effect="slide"
						>
							{images.map((item, index) => (
								<SwiperSlide key={`slide-${index}`}>
									<div className="relative">
										<Media
											resource={item.image}
											imgClassName="rounded-[4rem] object-cover aspect-video"
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

						{/* Thumbnail Slider */}
						<Swiper
							onSwiper={setThumbsSwiper}
							modules={[FreeMode, Navigation, Thumbs]}
							slidesPerView={8}
							spaceBetween={12}
							freeMode={true}
							watchSlidesProgress={true}
							loop={true}
							className="gallery-thumbs-swiper overflow-visible"
						>
							{images.map((item, index) => (
								<SwiperSlide key={`thumb-${index}`} className="cursor-pointer">
									<Media
										resource={item.image}
										imgClassName="rounded-xl aspect-4/3 object-cover"
									/>
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
								className="overflow-hidden rounded-4xl"
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
	);
};
