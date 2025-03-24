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

  return (
    <footer className="dark:bg-secondary-950 mt-auto border-t border-neutral-200 dark:border-neutral-950/50 dark:text-white">
      <div className="container flex flex-col items-center gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo className="object-contain object-left" />
        </Link>
        <nav className="flex flex-col gap-4 md:flex-row">
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
      <div className="container py-4 pt-8">
        <hr className="dark:border-netural-950/50 my-12 border-neutral-200" />
        <div className="flex gap-6">
          <h2 className="text-secondary-600 grow text-lg font-semibold">
            Acknowledgement of Country
          </h2>
          <p className="shrink text-sm text-neutral-600">
            We acknowledge the traditional custodians of country throughout Australia
            and their ongoing connection to land, waters and community. We pay our
            respects to the people, the cultures and the Elders past, present and
            emerging.
          </p>
        </div>
      </div>
    </footer>
  );
}
