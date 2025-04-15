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
            maxRows: 7,
            fields: [
                {
                    name: "name",
                    type: "text",
                },
                {
                    name: "hideDayName",
                    type: "checkbox",
                    label: "Hide Day Name",
                    defaultValue: true,
                },
                {
                    name: "date",
                    type: "date",
                    timezone: true,
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
                            timezone: true,
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
                            timezone: true,
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
