import type { Media } from "@/payload-types";
import React from "react";

import { GridBlockClient } from "./Component.client";

// Define the GridItem interface based on the config
interface GridItem {
	id?: string;
	title?: string;
	description?: any; // Rich text content from Lexical editor
	image: string | Media;
	colSpan?: "1" | "2";
}

// Define the GridBlock props interface
export interface GridBlockProps {
	id?: string;
	blockName?: string;
	blockType: "gridBlock";
	title?: string;
	subtitle?: string;
	richText?: any; // Rich text content from Lexical editor
	gridItems?: GridItem[];
}

export const GridBlock: React.FC<GridBlockProps> = (props) => {
	const { id, title, subtitle, richText, gridItems = [] } = props;

	// Pass all props to the client component
	return (
		<GridBlockClient
			id={id}
			title={title}
			subtitle={subtitle}
			richText={richText}
			gridItems={gridItems}
			blockType="gridBlock"
		/>
	);
};
