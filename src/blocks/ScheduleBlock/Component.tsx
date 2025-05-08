import { Schedule } from "@/payload-types";
// Import your existing type
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

import { ScheduleBlockClient } from "./Component.client";

export type ScheduleBlockComponentProps = {
    scheduleReference: string | Schedule;
    title?: string;
    description?: string;
};

export const ScheduleBlock: React.FC<ScheduleBlockComponentProps> = async ({
    scheduleReference,
    title,
    description,
}) => {
    if (!scheduleReference) {
        return null;
    }

    try {
        // Get a Payload instance using getPayload
        const payload = await getPayload({ config: configPromise });

        // Extract just the ID if scheduleReference is an object
        const scheduleId =
            typeof scheduleReference === "string" ? scheduleReference : scheduleReference.id;

        // Fetch the full schedule with nested data
        const schedule = await payload.findByID({
            collection: "schedule",
            id: scheduleId,
            depth: 2, // Ensures we get `days` and `sessions`
        });

        if (!schedule?.days?.length) {
            return null;
        }

        // Create a properly formatted schedule object for the client component
        const formattedSchedule = {
            scheduleName: schedule.scheduleName || null,
            days: schedule.days.map((day) => ({
                name: day.name || undefined,
                date: day.date,
                sessions:
                    day.sessions?.map((session) => ({
                        title: session.title,
                        timeZone: session.startTime_tz,
                        startTime: session.startTime,
                        endTime: session.endTime,
                        subtitle: session.subtitle || undefined,
                        description: session.description || undefined,
                        location: session.location || undefined,
                    })) || [],
            })),
        };

        return (
            <ScheduleBlockClient
                scheduleData={formattedSchedule}
                title={title}
                description={description}
            />
        );
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return null;
    }
};
