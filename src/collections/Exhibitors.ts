import { CollectionConfig } from "payload";

export const Exhibitors: CollectionConfig = {
    slug: "exhibitors",
    admin: {
        useAsTitle: "name",
        group: "Conference Content",
    },
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "media",
            label: "Exhibitor Logo",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "url",
            label: "URL",
            type: "text",
            admin: {
                description: "Optional: Add a link to the Exhibitor\'s website.",
            },
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            admin: {
                description: "Optional: Add a description to the Exhibitors's website.",
            },
        },
    ],
};
