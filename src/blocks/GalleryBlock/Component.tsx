import type { Page } from "@/payload-types";
import React from "react";

import { GalleryBlockClient } from "./Component.client";

// Define props type based on the GalleryBlock configuration
type GalleryBlockProps = Extract<Page["layout"][0], { blockType: "galleryBlock" }> & {
	id?: string;
};

export const GalleryBlock: React.FC<GalleryBlockProps> = (props) => {
	const { id, galleryTitle, displayMode, images } = props;

	// If no images, don't render anything
	if (!images || images.length === 0) {
		return null;
	}

	// Process images to ensure they have the correct format and proper typing
	const processedImages = images
		.filter((img): img is NonNullable<typeof img> => img !== null && img !== undefined)
		.map((img) => ({
			image: img.image,
			caption: img.caption || "",
		}));

	return (
		<GalleryBlockClient
			id={id}
			galleryTitle={galleryTitle}
			displayMode={displayMode}
			images={processedImages}
		/>
	);
};
