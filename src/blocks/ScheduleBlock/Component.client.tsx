// In your ScheduleBlockClient component
"use client";

import React from "react";

// In your ScheduleBlockClient component

interface ScheduleBlockClientProps {
	scheduleData: {
		scheduleName?: string | null;
		days?: {
			name: string;
			date: string;
			sessions?: {
				title: string;
				startTime: string;
				endTime: string;
				subtitle?: string;
				description?: string;
				location?: string;
			}[];
		}[];
	};
	title?: string;
	description?: string;
}

export const ScheduleBlockClient: React.FC<ScheduleBlockClientProps> = ({
	scheduleData,
	title,
	description,
}) => {
	if (!scheduleData?.days?.length) return null;

	// Format date in a way that's consistent between server and client
	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			// Use explicit date components instead of localized formatting
			const day = date.getDate().toString().padStart(2, "0");
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		} catch (error) {
			return dateString;
		}
	};

	// Format time in a way that's consistent between server and client
	const formatTime = (timeString: string) => {
		try {
			const date = new Date(timeString);
			// Use explicit time components instead of localized formatting
			const hours = date.getHours();
			const minutes = date.getMinutes().toString().padStart(2, "0");
			const ampm = hours >= 12 ? "PM" : "AM";
			const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
			return `${displayHours}:${minutes} ${ampm}`;
		} catch (error) {
			return timeString;
		}
	};

	return (
		<section className="rounded-lg bg-gray-100 p-6">
			<h2 className="text-xl font-bold">{title || scheduleData.scheduleName}</h2>
			{description && <p className="mb-4 text-gray-700">{description}</p>}
			{scheduleData.days.map((day) => (
				<div key={day.date} className="mb-6">
					<h3 className="text-lg font-semibold">
						{day.name} – {formatDate(day.date)}
					</h3>
					<ul className="mt-2 space-y-2">
						{day.sessions?.map((session, index) => (
							<li key={index} className="rounded-md bg-white p-3 shadow-md">
								<h4 className="font-medium">{session.title}</h4>
								<p className="text-sm text-gray-600">
									{formatTime(session.startTime)} - {formatTime(session.endTime)}
								</p>
								{session.subtitle && (
									<p className="text-sm italic">{session.subtitle}</p>
								)}
								{session.description && (
									<p className="text-sm">{session.description}</p>
								)}
								{session.location && (
									<p className="text-sm font-semibold">📍 {session.location}</p>
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
};
