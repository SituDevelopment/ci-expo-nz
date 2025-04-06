import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const FormBlock: Block = {
	slug: "formBlock",
	interfaceName: "FormBlock",
	fields: [
		{
			name: "formSource",
			label: "Form Source",
			type: "select",
			required: true,
			options: [
				{
					label: "Form Builder",
					value: "formBuilder",
				},
				{
					label: "Embed Form",
					value: "formEmbed",
				},
			],
		},
		{
			name: "form",
			type: "relationship",
			relationTo: "forms",
			required: true,
			admin: {
				condition: (_, { formSource }) => formSource === "formBuilder",
			},
		},
		{
			name: "embedCode",
			label: "Embed Code",
			type: "code",
			required: true,
			admin: {
				condition: (_, { formSource }) => formSource === "formEmbed",
				language: "html",
			},
		},
		{
			name: "introContent",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
			label: "Intro Content",
		},
	],
	graphQL: {
		singularName: "FormBlock",
	},
	labels: {
		plural: "Form Blocks",
		singular: "Form Block",
	},
};
