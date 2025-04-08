import clsx from "clsx";
import React from "react";

import { Media } from "@/components/Media";

interface Props {
    className?: string;
    loading?: "lazy" | "eager";
    priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
    const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

    const loading = loadingFromProps || "lazy";
    const priority = priorityFromProps || "low";

    return (
        /* eslint-disable @next/next/no-img-element */
        <>
            <img
                alt="Payload Logo"
                width={203}
                height={64}
                loading={loading}
                fetchPriority={priority}
                decoding="async"
                className={clsx("h-16 w-full max-w-[12rem] dark:hidden", className)}
                src="/api/media/file/blacklogo-1.png"
            />
            <img
                alt="Payload Logo"
                width={203}
                height={64}
                loading={loading}
                fetchPriority={priority}
                decoding="async"
                className={clsx("hidden h-16 w-full max-w-[12rem] dark:block", className)}
                src="/api/media/file/whitelogo-1.png"
            />
        </>
    );
};
