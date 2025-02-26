import { link } from "@/fields/link";
import { Block } from "payload";

export const CollectionBlock: Block = {
	slug: "collectionBlock",
	interfaceName: "CollectionBlock",
	labels: {
		singular: "Collection Block",
		plural: "Collection Blocks",
	},
	fields: [
		{
			name: "title",
			label: "Section Heading",
			type: "text",
		},
		{
			name: "collectionSelect",
			label: "Select Collection",
			type: "select",
			required: true,
			options: [
				{ label: "Sponsors", value: "sponsors" },
				{ label: "Exhibitors", value: "exhibitors" },
			],
		},
		{
			name: "displayMode",
			label: "Display Mode",
			type: "radio",
			admin: {
				layout: "horizontal",
				width: "50%",
			},
			defaultValue: "all",
			options: [
				{ label: "All Items", value: "all" },
				{ label: "Selected Items", value: "selected" },
			],
			required: true,
		},
		{
			name: "limit",
			label: "Limit Number of Items",
			type: "number",
			admin: {
				condition: (_, siblingData) => siblingData.displayMode === "all",
			},
		},
		{
			name: "selectedItems",
			label: "Choose Items",
			type: "relationship",
			relationTo: ["sponsors", "exhibitors"],
			hasMany: true,
			admin: {
				condition: (_, siblingData) => siblingData.displayMode === "selected",
			},
		},
		{
			name: "enableLink",
			type: "checkbox",
		},
		link({
			overrides: {
				admin: {
					condition: (_, { enableLink }) => Boolean(enableLink),
				},
			},
		}),
	],
};
