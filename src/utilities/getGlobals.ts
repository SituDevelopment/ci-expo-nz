import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import type { Config, Conferencedetail, Footer, Header } from "src/payload-types";

type Global = keyof Config["globals"];

// Define return types for specific globals
type GlobalTypeMap = {
  header: Header;
  footer: Footer;
  conferencedetails: Conferencedetail;
};

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<GlobalTypeMap[T]> {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    depth,
  });

  return global as GlobalTypeMap[T];
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug], {
    tags: [`global_${slug}`],
  });
