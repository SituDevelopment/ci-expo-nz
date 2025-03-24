import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import type { StaticImageData } from "next/image";
import React from "react";

import { Media } from "../../components/Media";

type Props = MediaBlockProps & {
  breakout?: boolean;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const { className, enableGutter = true, imgClassName, media, staticImage } = props;

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn("border border-border rounded-[0.8rem]", imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
    </div>
  );
};
