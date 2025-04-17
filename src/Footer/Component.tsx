import type { Footer } from "@/payload-types";
import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";
import React from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

export async function Footer() {
    const footerData: Footer = await getCachedGlobal("footer", 1)();
    const navItems = footerData?.navItems || [];
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <div className="border-t border-neutral-200 bg-white px-4 py-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="container">
                    <div className="grid grid-cols-6 justify-items-center gap-x-16 lg:grid-cols-12">
                        <h4 className="text-secondary-600 dark:text-secondary-300 col-span-full mt-0 lg:col-span-4">
                            Acknowledgement of Country
                        </h4>
                        <p className="col-span-full text-center text-sm font-light text-balance text-neutral-600 lg:col-span-8 lg:text-left dark:text-neutral-50">
                            We acknowledge the traditional custodians of country throughout
                            Australia and their ongoing connection to land, waters and community. We
                            pay our respects to the people, the cultures and the Elders past,
                            present and emerging.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
                <div className="container flex flex-col items-center gap-8 py-8 md:flex-row md:justify-between">
                    <Link className="flex items-center" href="/">
                        <Logo className="object-contain object-left" />
                    </Link>
                    <nav className="flex flex-row justify-center gap-4">
                        {navItems.map(({ link }, i) => {
                            return <CMSLink key={i} {...link} appearance="link" />;
                        })}
                    </nav>
                    <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                            <ThemeSelector />
                        </div>
                    </div>
                </div>
                <div className="container px-3 pt-6 pb-3 text-center opacity-75 lg:px-0 lg:text-left">
                    Copyright © {currentYear} C&I Expo. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
