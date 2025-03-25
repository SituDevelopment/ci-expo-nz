import { link } from "@/fields/link";
import type { GlobalConfig } from "payload";

import { revalidateHeader } from "./hooks/revalidateHeader";

export const Header: GlobalConfig = {
    slug: "header",
    admin: {
        group: "Global Settings",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "headerLogo",
            type: "relationship",
            relationTo: "media",
        },
        {
            name: "navItems",
            type: "array",
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 6,
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: "@/Header/RowLabel#RowLabel",
                },
            },
        },
        {
            name: "callToAction",
            type: "array",
            fields: [link()],
            maxRows: 1,
        },
    ],
    hooks: {
        afterChange: [revalidateHeader],
    },
};
