import type { CollectionConfig } from "payload";

export const Schedule: CollectionConfig = {
	slug: "schedule",
	admin: {
		useAsTitle: "scheduleName",
		group: "Conference Content",
	},
	fields: [
		{
			name: "scheduleName",
			label: "Schedule Name",
			type: "text",
		},
		{
			name: "days",
			type: "array",
			minRows: 1,
			maxRows: 3,
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "date",
					type: "date",
					admin: {
						date: {
							displayFormat: "dd/MM/yyyy",
						},
					},
					required: true,
				},
				{
					name: "sessions",
					type: "array",
					fields: [
						{
							name: "title",
							type: "text",
							required: true,
						},
						{
							name: "startTime",
							type: "date",
							admin: {
								date: {
									pickerAppearance: "timeOnly",
								},
							},
							required: true,
						},
						{
							name: "endTime",
							type: "date",
							admin: {
								date: {
									pickerAppearance: "timeOnly",
								},
							},
							required: true,
						},
						{
							name: "subtitle",
							type: "text",
						},
						{
							name: "description",
							type: "textarea",
						},
						{
							name: "location",
							type: "text",
						},
					],
				},
			],
		},
	],
};
