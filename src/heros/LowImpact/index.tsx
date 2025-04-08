import type { Page } from "@/payload-types";
import React from "react";

type LowImpactHeroType =
    | {
          title: string;
      }
    | (Omit<Page["hero"], "richText"> & {
          children?: never;
      });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ title }) => {
    return (
        <div className="container mt-16">
            <div className="max-w-[48rem]">
                <h1 className="m-0 text-5xl font-semibold tracking-tight text-balance lg:text-7xl">
                    {title}
                </h1>
            </div>
        </div>
    );
};
