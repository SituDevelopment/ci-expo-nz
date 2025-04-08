"use client";

import type { Page, Conferencedetail } from "@/payload-types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { motion } from "motion/react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

// Fix the interface declaration
interface HighImpactHeroProps {
    title: string;
    copy?: string | null;
    toggleConferenceDetails?: boolean | null;
    links?: Page["hero"]["links"];
    media?: Page["hero"]["media"];
    type: "highImpact" | "mediumImpact" | "lowImpact" | "none";
    conferenceDetails?: Conferencedetail;
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
    title,
    copy,
    links,
    media,
    conferenceDetails,
    toggleConferenceDetails,
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
                            className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-12 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-center lg:text-center"
                        >
                            <div>
                                <dt className="text-secondary-600 text-base">Dates</dt>
                                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
                                    {dateDisplay}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-secondary-600 text-base">Location</dt>
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
                        className="hidden sm:mb-8 sm:flex sm:justify-center"
                    >
                        <div className="relative flex items-center gap-4 rounded-full bg-white/10 px-5 py-3 text-sm/6 text-gray-100 ring-1 ring-white/20 backdrop-blur hover:ring-gray-100/20">
                            <span className="text-lg font-semibold tracking-wide">
                                Co-locating with AACS
                            </span>
                            <a
                                target="_blank"
                                href="https://aacs.org.au"
                                className="text-secondary-500 hover:text-secondary-600 group inline-flex items-start gap-1.5 font-semibold transition"
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
                    </motion.div>
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
