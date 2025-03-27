"use client";

import type { Conferencedetail } from "@/payload-types";
import { Mail, Phone } from "lucide-react";
import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

interface ConferenceDetailsBlockClientProps {
	id?: string;
	title?: string | null;
	description?: string | null;
	conferenceDetails: Conferencedetail;
}

export const ConferenceDetailsBlockClient: React.FC<ConferenceDetailsBlockClientProps> = (
	props
) => {
	const { id, title, description, conferenceDetails } = props;
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.2 });

	// Extract contact details from the conference details
	const contactDetails = conferenceDetails?.contactDetails;

	if (!contactDetails) {
		return null;
	}

	const { phone, email } = contactDetails;

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
		<section
			className="my-16 rounded-[4rem] bg-white py-20 ring ring-neutral-200 sm:py-32 dark:bg-neutral-800 dark:ring-neutral-700"
			id={`block-${id}`}
			ref={containerRef}
		>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					{title && (
						<motion.h2
							className="text-secondary"
							initial={{ opacity: 0, y: -10 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}
						>
							{title}
						</motion.h2>
					)}
					{description && (
						<motion.p
							className="mt-4 mb-10 text-lg text-neutral-600 dark:text-neutral-50"
							initial={{ opacity: 0, y: -10 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							{description}
						</motion.p>
					)}

					<motion.div
						className="mt-5 md:col-span-2 md:mt-0"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
					>
						<dl className="grid max-w-xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:max-w-none">
							{/* Phone details */}
							<motion.div className="relative" variants={itemVariants}>
								<dt className="flex items-center gap-1 text-lg leading-7 tracking-wide text-neutral-900 dark:text-neutral-100">
									<div className="flex items-center justify-center rounded-xl p-1.5">
										<Phone className="text-primary size-5" strokeWidth={1.5} />
									</div>
									Phone
								</dt>
								{phone?.generalEnquiries && (
									<dd className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-200">
										<strong>General Enquiries: </strong>
										<a
											href={`tel:${phone.generalEnquiries.replace(/\s/g, "")}`}
											className="hover:text-primary-500 transition"
										>
											{phone.generalEnquiries}
										</a>
									</dd>
								)}
								{phone?.sponsorshipExhibition && (
									<dd className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-200">
										<strong>Sponsorship and Exhibition Enquiries: </strong>
										<a
											href={`tel:${phone.sponsorshipExhibition.replace(/\s/g, "")}`}
											className="hover:text-primary-500 transition"
										>
											{phone.sponsorshipExhibition}
										</a>
									</dd>
								)}
								{phone?.sponsorshipContact && (
									<dd className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-200">
										<i>{phone.sponsorshipContact}</i>
									</dd>
								)}
							</motion.div>

							{/* Email details */}
							<motion.div className="relative" variants={itemVariants}>
								<dt className="flex items-center gap-1 text-lg leading-7 tracking-wide text-neutral-900 dark:text-neutral-100">
									<div className="flex items-center justify-center rounded-xl p-1.5">
										<Mail className="text-primary size-5" strokeWidth={1.5} />
									</div>
									Email
								</dt>
								{email?.generalEnquiries && (
									<dd className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-200">
										<strong>General Enquiries: </strong>
										<a
											href={`mailto:${email.generalEnquiries}`}
											className="hover:text-primary-500 transition"
										>
											{email.generalEnquiries}
										</a>
									</dd>
								)}
								{email?.sponsorshipExhibition && (
									<dd className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-200">
										<strong>Sponsorship and Exhibition Enquiries: </strong>
										<a
											href={`mailto:${email.sponsorshipExhibition}`}
											className="hover:text-primary-500 transition"
										>
											{email.sponsorshipExhibition}
										</a>
									</dd>
								)}
								{email?.sponsorshipContact && (
									<dd className="mt-2 text-base leading-7 text-neutral-600 dark:text-neutral-200">
										<i>{email.sponsorshipContact}</i>
									</dd>
								)}
							</motion.div>
						</dl>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
