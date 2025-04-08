"use client";

import type { Exhibitor, Sponsor } from "@/payload-types";
import { Dialog, Transition } from "@headlessui/react";
import { ExternalLink, MoveRight, X } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { Fragment, useRef, useState } from "react";

import { CMSLink } from "../../components/Link";
import { Media } from "../../components/Media";

// Define interface that matches exactly what we need from the config.js
interface CollectionBlockClientProps {
    id?: string;
    title?: string | null;
    collectionSelect: "sponsors" | "exhibitors";
    displayMode: "all" | "selected";
    limit?: number | null;
    selectedItems?: Array<{
        relationTo: "sponsors" | "exhibitors";
        value: string | Sponsor | Exhibitor;
    } | null> | null;
    enableLink?: boolean | null;
    link?: Record<string, any> | null;
    blockType: "collectionBlock";
    items: (Exhibitor | Sponsor)[];
}

export const CollectionBlockClient: React.FC<CollectionBlockClientProps> = (props) => {
    // Defensive destructuring with defaults
    const { id = undefined, title = null, enableLink = false, link = null, items = [] } = props;
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    // Modal state
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Exhibitor | Sponsor | null>(null);

    // Safety check for items array
    if (!Array.isArray(items)) {
        console.error("Expected items to be an array, got:", items);
        return null;
    }

    // Function to open modal with selected item only if there's description or URL
    const openModal = (item: Exhibitor | Sponsor) => {
        // Only open the modal if there's a description or URL
        if (item.description || item.url) {
            setSelectedItem(item);
            setIsOpen(true);
        }
    };

    // Function to close modal
    const closeModal = () => {
        setIsOpen(false);
    };

    /*
     * Animation variants for container and items.
     * The parent acts as a trigger/watcher. When
     * it is in view, then we trigger the child
     * animations. This could be refactored later
     * to be more granular in the future.
     */
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div
            className="my-16 rounded-[4rem] bg-white py-20 ring ring-neutral-200 sm:py-32 dark:bg-neutral-800 dark:ring-neutral-700"
            id={`block-${id}`}
            ref={containerRef}
        >
            <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    {title && (
                        <motion.div
                            className="flex items-center gap-x-8"
                            initial={{ opacity: 0, y: -10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-display text-center text-sm font-semibold tracking-wider text-neutral-800 sm:text-left dark:text-neutral-100">
                                {title}
                            </h2>
                            <div className="h-px flex-auto bg-neutral-200 dark:bg-neutral-700"></div>
                        </motion.div>
                    )}
                    <motion.div
                        className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {items.map((item) => (
                            <motion.div key={item.id} variants={itemVariants}>
                                {item.media &&
                                    typeof item.media === "object" &&
                                    "url" in item.media &&
                                    typeof item.media.url === "string" && (
                                        <img
                                            onClick={() => openModal(item)}
                                            src={item.media.url}
                                            alt={
                                                typeof item.media.alt === "string"
                                                    ? item.media.alt
                                                    : ""
                                            }
                                            className="h-20 cursor-pointer self-start rounded-lg object-cover object-center ring ring-neutral-100 transition duration-300 hover:scale-105 dark:ring-neutral-700"
                                        />
                                    )}
                            </motion.div>
                        ))}
                    </motion.div>
                    {enableLink && link && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-16"
                        >
                            <CMSLink
                                {...link}
                                appearance="link"
                                className="group items-center gap-2 text-base font-semibold text-neutral-600 dark:text-neutral-300"
                            >
                                <MoveRight
                                    absoluteStrokeWidth
                                    strokeWidth={0.5}
                                    className="size-8 text-neutral-500 opacity-95 transition duration-500 group-hover:translate-x-2 dark:text-neutral-400"
                                />
                            </CMSLink>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    {/* Backdrop */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    </Transition.Child>

                    {/* Modal panel */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 text-left align-middle shadow-2xl transition-all dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-600/50">
                                    {selectedItem && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-secondary dark:text-secondary-400"
                                                >
                                                    {selectedItem.name}
                                                </Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="hover:text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-200 rounded-full p-1 text-neutral-400 focus:outline-none"
                                                    onClick={closeModal}
                                                >
                                                    <X className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>

                                            <div className="mt-6 grid grid-cols-3 items-start gap-6">
                                                {/* Media container */}
                                                <div className="col-span-1 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                                                    {selectedItem.media &&
                                                        typeof selectedItem.media === "object" && (
                                                            <div className="flex justify-center">
                                                                <Media
                                                                    resource={selectedItem.media}
                                                                    imgClassName="max-h-60 max-w-full object-contain"
                                                                />
                                                            </div>
                                                        )}
                                                </div>
                                                <div className="col-span-2">
                                                    {/* Description */}
                                                    {selectedItem.description && (
                                                        <div className="mb-6">
                                                            <h4 className="text-secondary-500 dark:text-secondary-400 mb-2">
                                                                About
                                                            </h4>
                                                            <p className="text-neutral-700 dark:text-neutral-300">
                                                                {selectedItem.description}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* URL */}
                                                    {selectedItem.url && (
                                                        <div className="mt-4">
                                                            <a
                                                                href={selectedItem.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-primary hover:bg-primary-700 focus-visible:ring-primary-300 text-primary-100 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2"
                                                            >
                                                                Visit Website
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};
