import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { ConferenceDetails } from "./Conference/config";
import { Footer } from "./Footer/config";
import { Header } from "./Header/config";
import { Categories } from "./collections/Categories";
import { Exhibitors } from "./collections/Exhibitors";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Schedule } from "./collections/Schedule";
import { Sponsors } from "./collections/Sponsors";
import { Users } from "./collections/Users";
import { plugins } from "./plugins";
import { getServerSideURL } from "./utilities/getURL";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        timezones: {
            defaultTimezone: "Australia/Sydney",
        },
        components: {
            graphics: {
                Logo: "/components/payload/LoginLogo",
            },
        },
    },
    collections: [Pages, Posts, Categories, Media, Exhibitors, Sponsors, Schedule, Users],
    cors: [getServerSideURL()].filter(Boolean),
    globals: [Header, Footer, ConferenceDetails],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || "",
    }),
    sharp,
    plugins: [
        ...plugins,
        vercelBlobStorage({
            enabled: true, // Optional, defaults to true
            // Specify which collections should use Vercel Blob
            collections: {
                media: true,
            },
            // Token provided by Vercel once Blob storage is added to your Vercel project
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
});
