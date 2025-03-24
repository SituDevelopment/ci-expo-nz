import { Block } from "payload";

export const ConferenceDetailsBlock: Block = {
	slug: "conferenceDetailsBlock",
	interfaceName: "ConferenceDetailsBlock",
	labels: {
		singular: "Conference Details Block",
		plural: "Conference Details Blocks",
	},
	fields: [
		{
			name: "title",
			label: "Section Title",
			type: "text",
			defaultValue: "Contact Information",
		},
		{
			name: "description",
			label: "Section Description",
			type: "textarea",
		},
	],
};
