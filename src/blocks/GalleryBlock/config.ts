import { Block } from "payload";

export const GalleryBlock: Block = {
    slug: "galleryBlock",
    labels: {
        singular: "Gallery Block",
        plural: "Gallery Blocks",
    },
    fields: [
        {
            name: "galleryTitle",
            label: "Gallery Title",
            type: "text",
        },
        {
            name: "displayMode",
            label: "Display Mode",
            type: "radio",
            options: [
                {
                    label: "Carousel",
                    value: "carousel",
                },
                {
                    label: "Grid",
                    value: "grid",
                },
            ],
            defaultValue: "carousel",
            required: true,
            admin: {
                layout: "horizontal",
            },
        },
        {
            name: "images",
            label: "Gallery Images",
            type: "array",
            minRows: 4,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    label: "Image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "caption",
                    label: "Caption",
                    type: "text",
                },
            ],
            admin: {
                description: "Add at least 4 images to your gallery",
            },
        },
    ],
};
