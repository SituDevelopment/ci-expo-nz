"use client";

import type { Page, Post, Conferencedetail, Media as MediaType } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { motion } from "motion/react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

interface HighImpactHeroProps {
    title: string;
    copy?: string | null;
    conferenceDetails?: Conferencedetail;
    toggleConferenceDetails?: boolean | null;
    announcementBarSettings?: {
        toggleAnnouncementBar?: boolean | null;
        customiseAnnouncementBar?: boolean | null;
        customisationOptions?: {
            announcementText?: string | null;
            addImage?: boolean | null;
            logo?: (string | null) | MediaType;
            link?: {
                type?: ("reference" | "custom") | null;
                newTab?: boolean | null;
                reference?:
                | ({
                    relationTo: "pages";
                    value: string | Page;
                } | null)
                | ({
                    relationTo: "posts";
                    value: string | Post;
                } | null);
                url?: string | null;
            };
        };
    };
    links?: Page["hero"]["links"];
    media?: Page["hero"]["media"];
    type: "highImpact" | "mediumImpact" | "lowImpact" | "none";
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
    title,
    copy,
    links,
    media,
    conferenceDetails,
    toggleConferenceDetails,
    announcementBarSettings,
}) => {
    // Format conference details
    let dateDisplay = "17-18 MARCH 2026"; // Default fallback
    let venueDisplay = "ICC Sydney dd"; // Default fallback

    if (conferenceDetails) {
        const startDate = conferenceDetails.startDate
            ? new Date(conferenceDetails.startDate)
            : null;
        const endDate = conferenceDetails.endDate ? new Date(conferenceDetails.endDate) : null;

        if (startDate && endDate) {
            if (
                startDate.getFullYear() === endDate.getFullYear() &&
                startDate.getMonth() === endDate.getMonth()
            ) {
                dateDisplay = `${format(startDate, "d")} - ${format(endDate, "d")} ${format(endDate, "MMMM yyyy").toUpperCase()}`;
            } else {
                dateDisplay = `${format(startDate, "d MMM")}-${format(endDate, "d MMM yyyy").toUpperCase()}`;
            }
        }

        if (conferenceDetails.location?.venueName) {
            venueDisplay = conferenceDetails.location.venueName;
        }
    }

    const showAnnouncementBar =
        announcementBarSettings && announcementBarSettings.toggleAnnouncementBar === false;

    const useCustomAnnouncement =
        showAnnouncementBar && announcementBarSettings.customiseAnnouncementBar === true;

    const customOptions = useCustomAnnouncement
        ? announcementBarSettings.customisationOptions
        : null;

    const hasLogo =
        customOptions?.addImage && customOptions?.logo && typeof customOptions.logo === "object";

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center overflow-hidden rounded-[4rem] bg-black lg:h-[75dvh] lg:min-h-[--spacing(160)]"
        >
            <div className="relative z-10 flex">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.3,
                                duration: 0.6,
                                ease: "easeOut",
                            },
                        },
                    }}
                    className="max-w-[36.5rem] p-6 py-12 text-center lg:py-24"
                >
                    <motion.div
                        className="text-white"
                        variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: "tween",
                                    duration: 0.5,
                                    ease: "easeOut",
                                },
                            },
                        }}
                    >
                        <div className="flex flex-col gap-2">
                            <h1 className="m-0 text-5xl font-semibold tracking-tight text-balance lg:text-7xl">
                                {title}
                            </h1>
                            {copy && <p className="mt-6 text-2xl text-pretty opacity-95">{copy}</p>}
                        </div>
                    </motion.div>
                    {!toggleConferenceDetails && (
                        <motion.dl
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "tween",
                                        duration: 0.5,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                            className="mt-8 grid gap-x-10 gap-y-6 sm:mt-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-center lg:text-center"
                        >
                            <div className="flex items-baseline justify-center gap-3 sm:block">
                                <dt className="text-primary-600 text-base">Dates</dt>
                                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
                                    {dateDisplay}
                                </dd>
                            </div>
                            <div className="flex items-baseline justify-center gap-3 sm:block">
                                <dt className="text-primary-600 text-base">Location</dt>
                                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
                                    {venueDisplay}
                                </dd>
                            </div>
                        </motion.dl>
                    )}

                    {Array.isArray(links) && links.length > 0 && (
                        <motion.ul
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        duration: 0.6,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-x-6"
                        >
                            {links.map(({ link }, i) => (
                                <motion.li
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                type: "tween",
                                                duration: 0.5,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                    className="w-full lg:w-auto"
                                >
                                    <CMSLink {...link} className="w-full border-white text-white" />
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}

                    {showAnnouncementBar && (
                        <div>
                            <hr className="my-6 border-white opacity-50 lg:my-8" />
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: "tween",
                                            duration: 0.5,
                                            ease: "easeOut",
                                        },
                                    },
                                }}
                                className="flex justify-center"
                            >
                                {useCustomAnnouncement && customOptions ? (
                                    <div
                                        className={cn(
                                            "relative flex items-center rounded-full bg-white/10 px-5 py-3 text-gray-100 ring-1 ring-white/20 backdrop-blur hover:ring-gray-100/20",
                                            hasLogo ? "gap-4 text-lg/8" : "gap-2 text-base/6"
                                        )}
                                    >
                                        {customOptions.announcementText && (
                                            <span>{customOptions.announcementText}</span>
                                        )}

                                        {customOptions.link && (
                                            <CMSLink
                                                {...customOptions.link}
                                                className="text-primary-500 hover:text-primary-600 group inline-flex items-start gap-1.5 font-semibold transition"
                                            >
                                                {hasLogo &&
                                                    typeof customOptions.logo === "object" && (
                                                        <div>
                                                            <Media
                                                                resource={customOptions.logo}
                                                                imgClassName="pointer-events-none inline-flex w-18 object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                <span aria-hidden="true">
                                                    <ArrowTopRightOnSquareIcon
                                                        className={cn(
                                                            hasLogo ? "-mt-[2px] size-3" : "size-5"
                                                        )}
                                                    />
                                                </span>
                                            </CMSLink>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative flex items-center gap-4 rounded-full bg-white/10 px-5 py-3 text-lg/6 text-gray-100 ring-1 ring-white/20 backdrop-blur hover:ring-gray-100/20">
                                        <span>Co-locating with</span>
                                        <a
                                            target="_blank"
                                            href="https://aacs.org.au"
                                            className="text-primary-500 hover:text-primary-600 group inline-flex items-start gap-1.5 font-semibold transition"
                                        >
                                            <img
                                                className="pointer-events-none inline-flex w-18 object-contain transition duration-300 group-hover:scale-[1.02]"
                                                src="/api/media/file/AACS_Connect26_Logo_WHITE-RED_RGB.png"
                                            />
                                            <span aria-hidden="true">
                                                <ArrowTopRightOnSquareIcon className="-mt-[2px] size-4" />
                                            </span>
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
            <div className="select-none">
                {media && typeof media === "object" && (
                    <Media
                        fill
                        imgClassName="z-0 object-cover opacity-25"
                        priority
                        resource={media}
                    />
                )}
            </div>
        </motion.header>
    );
};
