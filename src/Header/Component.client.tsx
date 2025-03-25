"use client";

import type { Header } from "@/payload-types";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";

import { HeaderNav } from "./Nav";

interface HeaderClientProps {
	data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const transition = {
		duration: 0.4,
		ease: "easeInOut",
	};

	// Animation variants for the mobile menu
	const menuVariants = {
		hidden: {
			height: 0,
			opacity: 0,
			overflow: "hidden",
		},
		visible: {
			height: "auto",
			opacity: 1,
			transition: {
				height: {
					duration: 0.4,
					ease: "easeOut",
				},
				opacity: {
					duration: 0.3,
					ease: "easeOut",
				},
				staggerChildren: 0.08,
				delayChildren: 0.1,
			},
		},
		exit: {
			height: 0,
			opacity: 0,
			transition: {
				height: {
					duration: 0.3,
					ease: "easeInOut",
				},
				opacity: {
					duration: 0.2,
					ease: "easeInOut",
				},
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
		exit: {
			opacity: 0,
			y: 5,
			transition: {
				duration: 0.2,
				ease: "easeIn",
			},
		},
	};

	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={transition}
			className="border-t-secondary relative sticky top-0 z-20 mb-6 border-t-3 px-4 md:px-6 lg:px-8"
		>
			<div className="-mx-[4px] flex flex-col rounded-b-4xl border-x border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
				{/* Main header content */}
				<div className="grid grid-cols-12 items-center gap-2 px-4 py-4">
					<div className="col-span-3 flex lg:col-span-2">
						<Link href="/">
							<Logo
								loading="eager"
								priority="high"
								className="object-contain object-left"
							/>
						</Link>
					</div>

					<HeaderNav data={data} />

					{data?.callToAction?.map((cta) => (
						<CMSLink
							className="col-span-2 col-start-10 justify-self-end font-semibold lg:col-start-12"
							key={cta.id}
							{...cta.link}
							appearance={cta.link.appearance || "link"}
						/>
					))}
					<div className="col-start-12 flex justify-center lg:hidden">
						<Button
							size="clear"
							variant="ghost"
							className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<span className="sr-only">
								{mobileMenuOpen ? "Close menu" : "Open main menu"}
							</span>
							{mobileMenuOpen ? (
								<X aria-hidden="true" className="size-6" />
							) : (
								<Menu aria-hidden="true" className="size-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile menu extension - part of the same header */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							className="border-t border-neutral-200 px-6 lg:hidden dark:border-neutral-700"
							variants={menuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<div className="py-6">
								<nav className="flex flex-col space-y-5">
									{data?.navItems?.map((item) => (
										<motion.div key={item.id} variants={itemVariants}>
											<CMSLink
												{...item.link}
												className="block text-lg font-medium text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-50"
											/>
										</motion.div>
									))}
								</nav>

								{data?.callToAction && data.callToAction.length > 0 && (
									<motion.div
										className="mt-8 border-t border-neutral-200 pt-6"
										variants={itemVariants}
									>
										<div className="flex flex-col space-y-4">
											{data.callToAction.map((cta) => (
												<CMSLink
													key={cta.id}
													{...cta.link}
													className="inline-block rounded-full bg-neutral-800 px-5 py-2.5 text-center font-semibold text-white hover:bg-neutral-700"
													appearance={cta.link.appearance || "default"}
												/>
											))}
										</div>
									</motion.div>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
};
