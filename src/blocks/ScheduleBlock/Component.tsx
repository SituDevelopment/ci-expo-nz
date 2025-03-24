import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

import { ScheduleBlockClient } from "./Component.client";

export type ScheduleBlockComponentProps = {
	scheduleReference: string;
	title?: string;
	description?: string;
};

export const ScheduleBlock: React.FC<ScheduleBlockComponentProps> = async ({
	scheduleReference,
	title,
	description,
}) => {
	console.log("ScheduleReference received:", scheduleReference);

	if (!scheduleReference) {
		console.log("No scheduleReference provided, returning null");
		return null;
	}

	try {
		// Get a Payload instance using getPayload
		const payload = await getPayload({ config: configPromise });

		// Fetch the full schedule with nested data
		const schedule = await payload.findByID({
			collection: "schedule",
			id: scheduleReference,
			depth: 2, // Ensures we get `days` and `sessions`
		});

		console.log("Fetched Schedule:", schedule);

		if (!schedule?.days?.length) {
			console.log("Schedule has no days, returning null");
			return null;
		}

		// Create a properly formatted schedule object for the client component
		const formattedSchedule = {
			scheduleName: schedule.scheduleName || null,
			days: schedule.days.map((day) => ({
				name: day.name,
				date: day.date,
				sessions:
					day.sessions?.map((session) => ({
						title: session.title,
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
