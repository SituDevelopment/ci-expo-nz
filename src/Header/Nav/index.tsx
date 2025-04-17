"use client";

import type { Header as HeaderType } from "@/payload-types";
import React from "react";

import { CMSLink } from "@/components/Link";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
    const navItems = data?.navItems || [];

    return (
        <nav className="col-span-8 flex hidden items-center justify-center gap-6 lg:flex">
            {navItems.map(({ link }, i) => {
                return (
                    <CMSLink
                        key={i}
                        {...link}
                        appearance="link"
                        className="hover:text-primary-500 font-black tracking-widest uppercase hover:no-underline"
                    />
                );
            })}
        </nav>
    );
};
