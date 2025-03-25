"use client";

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface ScheduleBlockClientProps {
	scheduleData: {
		scheduleName?: string | null;
		days?: {
			name: string;
			date: string;
			sessions?: {
				title: string;
				startTime: string;
				endTime: string;
				subtitle?: string;
				description?: string;
				location?: string;
			}[];
		}[];
	};
	title?: string;
	description?: string;
}

export const ScheduleBlockClient: React.FC<ScheduleBlockClientProps> = ({
	scheduleData,
	title,
	description,
}) => {
	const [tabOrientation, setTabOrientation] = useState("horizontal");
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.2 });

	useEffect(() => {
		const smMediaQuery = window.matchMedia("(min-width: 640px)");

		function onMediaQueryChange({ matches }: { matches: boolean }) {
			setTabOrientation(matches ? "vertical" : "horizontal");
		}

		onMediaQueryChange(smMediaQuery);
		smMediaQuery.addEventListener("change", onMediaQueryChange);

		return () => {
			smMediaQuery.removeEventListener("change", onMediaQueryChange);
		};
	}, []);

	if (!scheduleData?.days?.length) return null;

	// Format date in a way that's consistent between server and client
	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			// Use explicit formatting to avoid hydration mismatches
			const options = { day: "numeric", month: "long" } as const;
			return new Intl.DateTimeFormat("en-US", options).format(date);
		} catch (error) {
			return dateString;
		}
	};

	// Format time in a way that's consistent between server and client
	const formatTime = (timeString: string) => {
		try {
			const date = new Date(timeString);
			// Use explicit time components
			const hours = date.getHours();
			const minutes = date.getMinutes().toString().padStart(2, "0");
			const ampm = hours >= 12 ? "PM" : "AM";
			const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
			return `${displayHours}:${minutes}${ampm}`;
		} catch (error) {
			return timeString;
		}
	};

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
				type: "spring",
				stiffness: 80,
				damping: 15,
			},
		},
	};

	const fadeIn = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<section className="py-16 sm:py-24" ref={containerRef}>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<motion.div
					className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24"
					initial={{ opacity: 0, y: -20 }}
					animate={isInView
						? { opacity: 1, y: 0 }
						: { opacity: 0, y: -20 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h2 className="text-secondary-600 text-3xl font-bold tracking-tight sm:text-4xl">
						{title || scheduleData.scheduleName}
					</h2>
					{description && (
						<motion.p
							className="mt-4 text-xl text-gray-700"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : { opacity: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.2,
								ease: "easeOut",
							}}
						>
							{description}
						</motion.p>
					)}
				</motion.div>

				<div className="relative mt-14 sm:mt-24">
					{/* Tabbed Interface for Mobile/Tablet */}
					<Tab.Group
						as="div"
						className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
						vertical={tabOrientation === "vertical"}
					>
						<Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pb-4 pl-4 sm:mx-0 sm:flex-col sm:pr-8 sm:pb-0 sm:pl-0">
							{({ selectedIndex }) => (
								<>
									{scheduleData.days?.map((day, dayIndex) => (
										<motion.div
											key={day.date}
											className={clsx(
												"relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0",
												dayIndex !== selectedIndex &&
													"opacity-70",
											)}
											initial={{ opacity: 0, x: -20 }}
											animate={isInView
												? { opacity: 1, x: 0 }
												: { opacity: 0, x: -20 }}
											transition={{
												duration: 0.5,
												delay: 0.1 * dayIndex,
											}}
										>
											<div>
												<h3 className="text-secondary-900 flex items-center text-2xl font-semibold tracking-tight">
													<Tab className="focus:outline-none">
														<span className="absolute inset-0" />
														<Calendar className="mr-2 inline-block h-5 w-5" />
														{day.name} -{" "}
														{formatDate(day.date)}
													</Tab>
												</h3>
												<p className="text-secondary-900 mt-1.5 text-base tracking-tight">
													{day.sessions?.length}{" "}
													sessions
												</p>
											</div>
										</motion.div>
									))}
								</>
							)}
						</Tab.List>

						<Tab.Panels>
							{scheduleData.days.map((day) => (
								<Tab.Panel
									key={day.date}
									className="focus:outline-none"
								>
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate={isInView ? "show" : "hidden"}
									>
										<SessionsList
											day={day}
											formatTime={formatTime}
											variants={itemVariants}
										/>
									</motion.div>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>

					{/* Static Grid for Desktop */}
					<motion.div
						className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						{scheduleData.days.map((day, dayIndex) => (
							<motion.section
								key={day.date}
								variants={itemVariants}
								custom={dayIndex}
							>
								<div className="flex items-baseline gap-2">
									<Calendar className="text-secondary-500 h-5 w-5" />
									<div>
										<h3 className="text-secondary-900 text-2xl font-semibold tracking-tight">
											{day.name} - {formatDate(day.date)}
										</h3>
										<p className="text-secondary-900 mt-1.5 text-base tracking-tight">
											{day.sessions?.length}{" "}
											{day.sessions?.length === 1
												? "session"
												: "sessions"}
										</p>
									</div>
								</div>
								<SessionsList
									day={day}
									formatTime={formatTime}
									className="mt-10"
									variants={itemVariants}
								/>
							</motion.section>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

interface SessionsListProps {
	day: {
		name: string;
		date: string;
		sessions?: {
			title: string;
			startTime: string;
			endTime: string;
			subtitle?: string;
			description?: string;
			location?: string;
		}[];
	};
	formatTime: (timeString: string) => string;
	className?: string;
	variants?: any;
}

function SessionsList(
	{ day, formatTime, className, variants }: SessionsListProps,
) {
	return (
		<motion.ol
			role="list"
			className={clsx(
				className,
				"shadow-secondary-900/5 space-y-8 rounded-xl border border-gray-100 bg-white/60 px-10 py-14 text-center shadow-xl backdrop-blur-sm",
			)}
			variants={variants}
		>
			{day.sessions?.map((session, sessionIndex) => (
				<motion.li
					key={`${session.startTime}-${sessionIndex}`}
					aria-label={`${session.title} at ${
						formatTime(
							session.startTime,
						)
					} - ${formatTime(session.endTime)}`}
					variants={variants}
					custom={sessionIndex}
					transition={{ delay: 0.1 * sessionIndex }}
				>
					{sessionIndex > 0 && (
						<div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
					)}
					<h4 className="text-secondary-900 text-lg font-semibold tracking-tight">
						{session.title}
					</h4>
					{session.subtitle && (
						<p className="text-secondary-900 mt-1 tracking-tight italic">
							{session.subtitle}
						</p>
					)}
					{session.description && (
						<p className="text-secondary-900 mt-1 tracking-tight">
							{session.description}
						</p>
					)}
					<p className="mt-1 flex items-center justify-center font-mono text-sm text-slate-500">
						<Clock className="mr-1 inline-block h-4 w-4" />
						<time>{formatTime(session.startTime)}</time> -{" "}
						<time>{formatTime(session.endTime)}</time>
						{session.location && (
							<span className="text-secondary-500 ml-2 flex items-center">
								<span className="mx-1">•</span>
								<MapPin className="mr-1 h-4 w-4" />
								{session.location}
							</span>
						)}
					</p>
				</motion.li>
			))}
		</motion.ol>
	);
}

export default ScheduleBlockClient;
