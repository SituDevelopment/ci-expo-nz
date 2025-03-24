import { linkGroup } from "@/fields/linkGroup";
import type { Field } from "payload";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
        {
          label: "Medium Impact",
          value: "mediumImpact",
        },
        {
          label: "Low Impact",
          value: "lowImpact",
        },
      ],
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "copy",
      type: "textarea",
      maxLength: 500,
    },
    {
      name: "toggleConferenceDetails",
      type: "checkbox",
      label: "Hide Conference Information in Header",
      admin: {
        condition: (_, { type } = {}) => ["highImpact"].includes(type),
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type),
      },
      relationTo: "media",
      required: true,
    },
  ],
  label: false,
};
