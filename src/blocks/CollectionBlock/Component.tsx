import type { Exhibitor, Sponsor, CollectionBlock as CollectionBlockProps } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

import { CollectionBlockClient } from "./Component.client";

export async function CollectionBlock(props: CollectionBlockProps & { id?: string }) {
    const {
        id,
        collectionSelect,
        displayMode,
        limit: limitFromProps,
        selectedItems,
        title,
        enableLink,
        link,
        blockType,
    } = props;

    const limit = limitFromProps || 9000;
    const payload = await getPayload({ config: configPromise });

    let items: (Exhibitor | Sponsor)[] = []; // Explicitly typed array

    if (displayMode === "all") {
        const fetchedItems = await payload.find({
            collection: collectionSelect,
            depth: 1,
            limit,
            sort: "name",
        });
        items = fetchedItems.docs as (Exhibitor | Sponsor)[]; // Explicit cast
    } else if (selectedItems?.length) {
        // Handle the complex type structure of selectedItems based on the config
        items = selectedItems
            .map((item) => {
                if (!item) return null;

                if (typeof item === "object" && "value" in item) {
                    const value = item.value;
                    if (typeof value === "object" && value !== null) {
                        return value as Exhibitor | Sponsor;
                    }
                } else if (typeof item === "object") {
                    return item as Exhibitor | Sponsor;
                }
                return null;
            })
            .filter(Boolean) as (Exhibitor | Sponsor)[];
    }

    // Pass props explicitly to match the client component's interface
    return (
        <CollectionBlockClient
            id={id}
            title={title}
            enableLink={enableLink}
            link={link}
            items={items}
            collectionSelect={collectionSelect}
            displayMode={displayMode}
            blockType={blockType}
        />
    );
}
