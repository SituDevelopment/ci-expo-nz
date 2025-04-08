// RenderHero.tsx
import { HighImpactHero } from "@/heros/HighImpact";
import { LowImpactHero } from "@/heros/LowImpact";
import { MediumImpactHero } from "@/heros/MediumImpact";
import type { Page, Conferencedetail } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import React from "react";

const heroes = {
    highImpact: HighImpactHero,
    lowImpact: LowImpactHero,
    mediumImpact: MediumImpactHero,
};

export async function RenderHero(props: Page["hero"]) {
    const { type } = props || {};

    if (!type || type === "none") return null;

    const HeroToRender = heroes[type];
    if (!HeroToRender) return null;

    // Fetch conference details
    const conferenceDetails = (await getCachedGlobal("conferencedetails", 1)()) as Conferencedetail;

    // Pass the full conferenceDetails object to the hero component
    return <HeroToRender {...props} conferenceDetails={conferenceDetails} />;
}
