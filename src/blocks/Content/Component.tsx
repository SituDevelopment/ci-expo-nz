import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import React from "react";

import { CMSLink } from "../../components/Link";
import RichText from "@/components/RichText";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
    const { columns } = props;

    const colsSpanClasses = {
        full: "lg:col-span-12",
        half: "md:col-span-3 lg:col-span-6",
        oneThird: "md:col-span-2 lg:col-span-4",
        twoThirds: "md:col-span-4 lg:col-span-8",
    };

    return (
        <div className="container my-16">
            <div className="grid grid-cols-6 gap-x-16 gap-y-8 lg:grid-cols-12">
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        const { enableLink, link, richText, size } = col;

                        return (
                            <div
                                className={cn(`col-span-full ${colsSpanClasses[size!]}`)}
                                key={index}
                            >
                                {richText && <RichText data={richText} enableGutter={false} />}

                                {enableLink && <CMSLink {...link} />}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
