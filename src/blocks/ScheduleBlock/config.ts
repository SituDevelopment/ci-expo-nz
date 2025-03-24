import { Block } from "payload";

export const ScheduleBlock: Block = {
	slug: "scheduleBlock",
	interfaceName: "ScheduleBlock",
	labels: {
		singular: "Schedule Block",
		plural: "Schedule Blocks",
	},
	fields: [
		{
			name: "title",
			label: "Section Heading",
			type: "text",
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
		},
		{
			name: "scheduleReference",
			label: "Conference Schedule",
			type: "relationship",
			relationTo: "schedule",
			required: true,
		},
	],
};
