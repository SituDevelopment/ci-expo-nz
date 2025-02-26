"use client";

import type { Header } from "@/payload-types";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

import { HeaderNav } from "./Nav";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  const transition = {
    duration: 0.4,
    ease: "easeInOut",
  };

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
      className="border-t-secondary-600 relative sticky top-0 z-20 border-y border-t-2 border-neutral-200 bg-white p-8 dark:border-b-neutral-700 dark:bg-neutral-900"
    >
      <div className="grid grid-cols-12 items-center">
        <Link href="/" className="col-span-2">
          <Logo loading="eager" priority="high" className="object-contain object-left" />
        </Link>
        <HeaderNav data={data} />

        {data?.callToAction?.map((cta) => (
          <CMSLink
            className="col-span-2 justify-self-end"
            key={cta.id}
            {...cta.link}
            appearance={cta.link.appearance || "link"}
            size="lg"
          />
        ))}
      </div>
    </motion.header>
  );
};
