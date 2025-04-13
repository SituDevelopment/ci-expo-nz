import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import type { Metadata } from "next";
import React from "react";

import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <InitTheme />
                <link href="/favicon.ico" rel="icon" sizes="32x32" />
                <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
            </head>
            <body className="grid min-h-dvh auto-rows-[min-content_1fr_min-content]">
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    metadataBase: new URL(getServerSideURL()),
    openGraph: mergeOpenGraph(),
    title: "C&I Expo New Zealand 2026",
    themeColor: "#289137",
    twitter: {
        card: "summary_large_image",
        creator: "@payloadcms",
    },
};
