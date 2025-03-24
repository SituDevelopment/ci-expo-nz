import type { Conferencedetail } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

import { ConferenceDetailsBlockClient } from "./Component.client";

export interface ConferenceDetailsBlockProps {
	id?: string;
	title?: string | null;
	description?: string | null;
	blockType: "conferenceDetailsBlock";
}

export async function ConferenceDetailsBlock(props: ConferenceDetailsBlockProps) {
	const { id, title, description } = props;

	// Fetch conference details from global
	const payload = await getPayload({ config: configPromise });
	const conferenceDetails = await payload.findGlobal({
		slug: "conferencedetails",
	});

	return (
		<ConferenceDetailsBlockClient
			id={id}
			title={title}
			description={description}
			conferenceDetails={conferenceDetails as Conferencedetail}
		/>
	);
}
