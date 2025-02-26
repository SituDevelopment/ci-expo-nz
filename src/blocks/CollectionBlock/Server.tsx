// CollectionBlock.server.tsx
"use server";

import type { Exhibitor, Sponsor, CollectionBlock as CollectionBlockProps } from "@/payload-types";
import { getPayload } from "payload";

// CollectionBlock.server.tsx

// CollectionBlock.server.tsx

export async function getData(collectionSelect: string, displayMode: string, limit: number) {
	const payload = await getPayload();
	const items = await payload.find({
		collection: collectionSelect,
		depth: 1,
		limit,
		sort: "name",
	});
	return items.docs;
}
