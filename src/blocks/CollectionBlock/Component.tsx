import type { Exhibitor, Sponsor, CollectionBlock as CollectionBlockProps } from "@/payload-types";
import configPromise from "@payload-config";
import { MoveRight } from "lucide-react";
import { getPayload } from "payload";
import React from "react";

import { CMSLink } from "../../components/Link";

export const CollectionBlock: React.FC<CollectionBlockProps & { id?: string }> = async (props) => {
	const {
		id,
		title,
		collectionSelect,
		displayMode,
		limit: limitFromProps,
		selectedItems,
		enableLink,
		link,
	} = props;
	const limit = limitFromProps || 100;
	const payload = await getPayload({ config: configPromise });

	let items: (Exhibitor | Sponsor)[] = [];

	if (displayMode === "all") {
		const fetchedItems = await payload.find({
			collection: collectionSelect,
			depth: 1,
			limit,
			sort: "name",
		});
		items = fetchedItems.docs as (Exhibitor | Sponsor)[]; // Explicitly cast the response
	} else if (selectedItems?.length) {
		items = selectedItems
			.map((item) => (typeof item === "object" ? (item as Exhibitor | Sponsor) : null))
			.filter(Boolean) as (Exhibitor | Sponsor)[];
	}

	return (
		<div
			className="my-16 rounded-[4rem] bg-white py-20 ring ring-neutral-200 sm:mt-32 sm:py-32 dark:ring-0"
			id={`block-${id}`}
			data-theme="light"
		>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					{title && (
						<div className="flex items-center gap-x-8">
							<h2 className="font-display text-center text-sm font-semibold tracking-wider text-neutral-800 sm:text-left">
								{title}
							</h2>
							<div className="h-px flex-auto bg-neutral-200"></div>
						</div>
					)}
					<div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-6">
						{items.map((item) => (
							<div key={item.id} className="">
								{item.media && (
									<img
										src={item.media.url}
										alt={item.media.alt}
										className="h-20 self-start rounded-lg object-contain object-left"
									/>
								)}
							</div>
						))}
					</div>

					<div className="mt-16">
						{enableLink && (
							<CMSLink
								{...link}
								appearance="link"
								className="group items-center gap-2 text-base font-semibold text-neutral-600"
							>
								<MoveRight
									absoluteStrokeWidth
									strokeWidth={0.5}
									className="size-8 text-neutral-500 opacity-95 transition duration-500 group-hover:translate-x-2"
								/>
							</CMSLink>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
