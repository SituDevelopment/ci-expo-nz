import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const GridBlock: Block = {
	slug: "gridBlock",
	interfaceName: "GridBlock",
	labels: {
		singular: "Grid Block",
		plural: "Grid Blocks",
	},
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
		},
		{
			name: "subtitle",
			label: "Subtitle",
			type: "text",
		},
		{
			name: "richText",
			label: "Description",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
		},
		{
			name: "gridItems",
			label: "Grid Items",
			type: "array",
			minRows: 1,
			maxRows: 6,
			labels: {
				singular: "Grid Item",
				plural: "Grid Items",
			},
			fields: [
				{
					name: "title",
					label: "Title",
					type: "text",
				},
				{
					name: "description",
					label: "Description",
					type: "richText",
					editor: lexicalEditor({
						features: ({ rootFeatures }) => {
							return [
								...rootFeatures,
								HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
								FixedToolbarFeature(),
								InlineToolbarFeature(),
							];
						},
					}),
				},
				{
					name: "image",
					label: "Image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "colSpan",
					label: "Width",
					type: "select",
					defaultValue: "1",
					options: [
						{ label: "Regular", value: "1" },
						{ label: "Wide", value: "2" },
					],
				},
			],
		},
	],
};
