import type { Metadata } from "next";

import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
    type: "website",
    description: "An open-source website built with Payload and Next.js.",
    images: [
        {
            url: `${getServerSideURL()}/website-template-OG.webp`,
        },
    ],
    siteName: "C&I Expo",
    title: "C&I Expo New Zealand 2026",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
    return {
        ...defaultOpenGraph,
        ...og,
        images: og?.images ? og.images : defaultOpenGraph.images,
    };
};
