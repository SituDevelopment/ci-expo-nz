"use client";

import type { Header as HeaderType } from "@/payload-types";
import React from "react";

import { CMSLink } from "@/components/Link";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="col-span-8 flex items-center justify-center gap-6">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="hover:text-secondary text-lg font-bold tracking-wider uppercase hover:no-underline"
          />
        );
      })}
    </nav>
  );
};
