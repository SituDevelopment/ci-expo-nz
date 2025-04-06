"use client";

import React, { useEffect } from "react";

type Props = {
	embedCode?: string;
};

const FormEmbed: React.FC<Props> = ({ embedCode }) => {
	useEffect(() => {
		if (!embedCode) return;

		const wrapper = document.createElement("div");
		wrapper.innerHTML = embedCode;

		const scripts = wrapper.querySelectorAll("script");

		scripts.forEach((script) => {
			const newScript = document.createElement("script");

			// Copy all attributes (type, charset, etc)
			Array.from(script.attributes).forEach((attr) => {
				newScript.setAttribute(attr.name, attr.value);
			});

			if (script.src) {
				// External script
				newScript.src = script.src;
				newScript.onload = () => {
					// Only run inline scripts AFTER external one loads
					scripts.forEach((s) => {
						if (!s.src) {
							const inlineScript = document.createElement("script");
							inlineScript.innerHTML = s.innerHTML;
							document.body.appendChild(inlineScript);
						}
					});
				};
				document.body.appendChild(newScript);
			}
		});

		return () => {
			// Clean up if you care
		};
	}, [embedCode]);

	return (
		<div
			id="hubspot-form"
			className="embedded-form-container rounded-[4rem] border border-neutral-200 bg-white p-4 py-8 lg:px-8 lg:pt-12 lg:pb-10 dark:border-neutral-700 dark:bg-neutral-800"
		/>
	);
};

export default FormEmbed;
