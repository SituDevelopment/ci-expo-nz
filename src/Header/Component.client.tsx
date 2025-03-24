"use client";

import type { Header } from "@/payload-types";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { Button } from "@/components/ui/button";

import { HeaderNav } from "./Nav";

interface HeaderClientProps {
	data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
	/* Storing the value in a useState to avoid hydration errors */

	const transition = {
		duration: 0.4,
		ease: "easeInOut",
	};

	return (
		<motion.header
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={transition}
			className="border-t-secondary relative sticky top-0 z-20 border-t-3 px-4 md:px-6 lg:px-8"
		>
			<div className="-mx-[4px] grid grid-cols-12 items-center gap-2 rounded-b-4xl border-x border-b border-neutral-200 bg-neutral-50 px-4 py-4 ring ring-neutral-300/50 dark:bg-neutral-900/10">
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
						className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Menu aria-hidden="true" className="size-6" />
					</Button>
				</div>
			</div>
		</motion.header>
	);
};
