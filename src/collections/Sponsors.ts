import { CollectionConfig } from "payload";

export const Sponsors: CollectionConfig = {
	slug: "sponsors",
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
			label: "Sponsor Logo",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "url",
			label: "URL",
			type: "text",
			admin: {
				description: "Optional: Add a link to the Sponsor's website.",
			},
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			admin: {
				description: "Optional: Add a description to the Sponsor's website.",
			},
		},
	],
};
