import type { GlobalConfig } from "payload";

export const ConferenceDetails: GlobalConfig = {
    slug: "conferencedetails",
    label: "Conference Details",
    admin: {
        group: "Global Settings",
    },
    fields: [
        {
            name: "startDate",
            type: "date",
            timezone: true,
            label: "Start Date",
            required: true,
            admin: {},
        },
        {
            name: "endDate",
            type: "date",
            timezone: true,
            label: "End Date",
            required: true,
            admin: {},
        },
        {
            name: "contactDetails",
            type: "group",
            label: "Contact Details",
            fields: [
                {
                    name: "phone",
                    type: "group",
                    label: "Phone",
                    fields: [
                        {
                            name: "generalEnquiries",
                            type: "text",
                            label: "General Enquiries",
                            defaultValue: "1300 083 022",
                        },
                        {
                            name: "sponsorshipExhibition",
                            type: "text",
                            label: "Sponsorship and Exhibition Enquiries",
                            defaultValue: "+61 2 8586 6172",
                        },
                        {
                            name: "sponsorshipContact",
                            type: "text",
                            label: "Sponsorship Contact Person",
                            defaultValue: "Safa de Valois, C&I Media",
                        },
                    ],
                },
                {
                    name: "email",
                    type: "group",
                    label: "Email",
                    fields: [
                        {
                            name: "generalEnquiries",
                            type: "email",
                            label: "General Enquiries",
                            defaultValue: "exhibition@c-store.com.au",
                        },
                        {
                            name: "sponsorshipExhibition",
                            type: "email",
                            label: "Sponsorship and Exhibition Enquiries",
                            defaultValue: "safa@c-store.com.au",
                        },
                        {
                            name: "sponsorshipContact",
                            type: "text",
                            label: "Sponsorship Contact Person",
                            defaultValue: "Safa de Valois, C&I Media",
                        },
                    ],
                },
            ],
        },
        {
            name: "location",
            type: "group",
            label: "Conference Location",
            fields: [
                {
                    name: "venueName",
                    type: "text",
                    label: "Venue Name",
                    required: true,
                },
                {
                    name: "streetAddress",
                    type: "text",
                    label: "Street Address",
                    required: true,
                },
                {
                    name: "suburb",
                    type: "text",
                    label: "Suburb",
                    required: true,
                },
                {
                    name: "state",
                    type: "select",
                    label: "State/Territory",
                    required: true,
                    options: [
                        { label: "ACT", value: "ACT" },
                        { label: "NSW", value: "NSW" },
                        { label: "NT", value: "NT" },
                        { label: "QLD", value: "QLD" },
                        { label: "SA", value: "SA" },
                        { label: "TAS", value: "TAS" },
                        { label: "VIC", value: "VIC" },
                        { label: "WA", value: "WA" },
                    ],
                },
                {
                    name: "postcode",
                    type: "text",
                    label: "Postcode",
                    required: true,
                    validate: (value: string | string[] | null | undefined) => {
                        if (typeof value !== "string") return "Postcode is required";
                        if (!/^\d{4}$/.test(value)) {
                            return "Postcode must be 4 digits";
                        }
                        return true;
                    },
                },
            ],
        },
    ],
};
