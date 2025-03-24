import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CollectionBlock } from "@/blocks/CollectionBlock/Component";
import { ConferenceDetailsBlock } from "@/blocks/ConferenceDetails/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { GalleryBlock } from "@/blocks/GalleryBlock/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { ScheduleBlock } from "@/blocks/ScheduleBlock/Component";
import { Page } from "@/payload-types";
import React, { Fragment } from "react";

const blockComponents = {
	archive: ArchiveBlock,
	content: ContentBlock,
	collectionBlock: CollectionBlock,
	conferenceDetailsBlock: ConferenceDetailsBlock,
	cta: CallToActionBlock,
	formBlock: FormBlock,
	galleryBlock: GalleryBlock,
	mediaBlock: MediaBlock,
	scheduleBlock: ScheduleBlock,
};

export const RenderBlocks: React.FC<{
	blocks: Page["layout"][0][];
}> = (props) => {
	const { blocks } = props;

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

	if (hasBlocks) {
		return (
			<Fragment>
				{blocks.map((block, index) => {
					const { blockType } = block;

					if (blockType && blockType in blockComponents) {
						const Block = blockComponents[blockType];

						if (Block) {
							return (
								<div key={index}>
									{/* @ts-expect-error there may be some mismatch between the expected types here */}
									<Block key={index} {...block} disableInnerContainer />
								</div>
							);
						}
					}
					return null;
				})}
			</Fragment>
		);
	}

	return null;
};
