import { link } from "@/fields/link";
import { linkGroup } from "@/fields/linkGroup";
import type { Field } from "payload";

export const hero: Field = {
    name: "hero",
    type: "group",
    fields: [
        {
            name: "type",
            type: "select",
            defaultValue: "lowImpact",
            label: "Type",
            options: [
                {
                    label: "None",
                    value: "none",
                },
                {
                    label: "High Impact",
                    value: "highImpact",
                },
                {
                    label: "Medium Impact",
                    value: "mediumImpact",
                },
                {
                    label: "Low Impact",
                    value: "lowImpact",
                },
            ],
            required: true,
        },
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "copy",
            type: "textarea",
            maxLength: 500,
        },
        {
            name: "toggleConferenceDetails",
            type: "checkbox",
            label: "Hide Conference Information in Header",
            admin: {
                condition: (_, { type } = {}) => type === "highImpact",
            },
        },
        linkGroup({
            overrides: {
                maxRows: 2,
                label: "Button Group",
            },
        }),
        {
            name: "media",
            type: "upload",
            admin: {
                condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type),
            },
            relationTo: "media",
            required: true,
        },
        {
            name: "announcementBarSettings",
            label: "Announcement Bar Settings",
            type: "group",
            admin: {
                condition: (_, { type } = {}) => type === "highImpact",
                description:
                    'The "Announcement Bar" is the small text & logo section beneath the Button Group.',
                hideGutter: true,
            },
            fields: [
                {
                    name: "toggleAnnouncementBar",
                    type: "checkbox",
                    label: "Hide Announcement Bar",
                },
                {
                    name: "customiseAnnouncementBar",
                    type: "checkbox",
                    label: "Customise Announcement Bar",
                    admin: {
                        condition: (_, { toggleAnnouncementBar } = {}) => !toggleAnnouncementBar,
                    },
                },
                {
                    name: "customisationOptions",
                    type: "group",
                    fields: [
                        {
                            name: "announcementText",
                            type: "text",
                        },
                        {
                            name: "addImage",
                            type: "checkbox",
                            label: "Add an image",
                        },
                        {
                            name: "logo",
                            type: "upload",
                            relationTo: "media",
                            admin: {
                                condition: (_, { addImage } = {}) => addImage,
                            },
                        },
                        link({
                            appearances: false,
                            disableLabel: true,
                        }),
                    ],
                    admin: {
                        condition: (_, { customiseAnnouncementBar, toggleAnnouncementBar }) =>
                            customiseAnnouncementBar && !toggleAnnouncementBar,
                        hideGutter: true,
                    },
                },
            ],
        },
    ],
    label: false,
};
