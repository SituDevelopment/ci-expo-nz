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
      className="border-t-secondary-600 relative z-20 border-t-2 bg-white p-4 md:px-6 lg:px-8 dark:bg-neutral-900/10"
    >
      <div className="grid grid-cols-12 items-center gap-2">
        <Link href="/" className="col-span-3 lg:col-span-2">
          <Logo loading="eager" priority="high" className="object-contain object-left" />
        </Link>

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
