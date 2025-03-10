"use client";

import type { Post } from "@/payload-types";
import { cn } from "@/utilities/ui";
import useClickableCard from "@/utilities/useClickableCard";
import Link from "next/link";
import React from "react";

import { Media } from "@/components/Media";

export type CardPostData = Pick<Post, "slug" | "meta" | "title">;

export const Card: React.FC<{
  alignItems?: "center";
  className?: string;
  doc?: CardPostData;
  relationTo?: "posts";
  showCategories?: boolean;
  title?: string;
}> = (props) => {
  const { card, link } = useClickableCard({});
  const { className, doc, relationTo, title: titleFromProps } = props;

  const { slug, meta, title } = doc || {};
  const { description, image: metaImage } = meta || {};

  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, " "); // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`;

  return (
    <article
      className={cn(
        "bg-card overflow-hidden rounded-lg border hover:cursor-pointer",
        className
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== "string" && (
          <Media resource={metaImage} size="33vw" />
        )}
      </div>
      <div className="p-4">
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
        )}
      </div>
    </article>
  );
};
