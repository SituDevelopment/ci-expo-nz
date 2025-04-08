import type { Page } from "@/payload-types";
import React from "react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

export const MediumImpactHero: React.FC<Page["hero"]> = ({ title, copy, links, media }) => {
    return (
        <div className="">
            <h1>{title}</h1>
            <div className="container mb-8">
                {Array.isArray(links) && links.length > 0 && (
                    <ul className="flex gap-4">
                        {links.map(({ link }, i) => {
                            return (
                                <li key={i}>
                                    <CMSLink {...link} />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div className="container">
                {media && typeof media === "object" && (
                    <div>
                        <Media
                            className="-mx-4 md:-mx-8 2xl:-mx-16"
                            imgClassName=""
                            priority
                            resource={media}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
