"use client";

import type { Page } from "@/payload-types";
import { motion } from "motion/react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

export const HighImpactHero: React.FC<Page["hero"]> = ({ title, links, media }) => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex items-center justify-center overflow-hidden rounded-4xl bg-black lg:h-[calc(100dvh-7.125rem)]"
    >
      <div className="relative z-10 mb-8 flex">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2, delayChildren: 0.5 },
            },
          }}
          className="max-w-[36.5rem] p-6 md:text-center"
        >
          <motion.dl
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="mt-4 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-6 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-center lg:text-center"
          >
            <div>
              <dt className="font-mono text-sm text-red-600">Dates</dt>
              <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
                17-18 MARCH 2026
              </dd>
            </div>
            <div>
              <dt className="font-mono text-sm text-red-600">Location</dt>
              <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
                ICC Sydney
              </dd>
            </div>
          </motion.dl>

          {Array.isArray(links) && links.length > 0 && (
            <motion.ul
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
              }}
              className="mt-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-x-6"
            >
              {links.map(({ link }, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="w-full lg:w-auto"
                >
                  <CMSLink {...link} className="w-full" />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
      <div className="select-none">
        {media && typeof media === "object" && (
          <Media
            fill
            imgClassName="z-0 object-cover opacity-35"
            priority
            resource={media}
          />
        )}
      </div>
    </motion.header>
  );
};
