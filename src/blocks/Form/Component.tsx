"use client";

import { getClientSideURL } from "@/utilities/getURL";
import type { FormFieldBlock, Form as FormType } from "@payloadcms/plugin-form-builder/types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";

import FormEmbed from "./FormEmbed.client";
import { fields } from "./fields";

export type FormBlockType = {
    blockName?: string;
    blockType?: "formBlock";
    formSource?: "formBuilder" | "formEmbed";
    form?: FormType;
    embedCode?: string;
    introContent?: SerializedEditorState;
};

export const FormBlock: React.FC<
    {
        id?: string;
    } & FormBlockType
> = (props) => {
    const {
        formSource = "formBuilder",
        form: formFromProps,
        form: {
            id: formID,
            confirmationMessage,
            confirmationType,
            redirect,
            submitButtonLabel,
        } = {},
        embedCode,
        introContent,
    } = props;

    const formMethods = useForm({
        defaultValues: formFromProps?.fields as any,
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = formMethods;

    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>();
    const [error, setError] = useState<{ message: string; status?: string } | undefined>();
    const router = useRouter();

    const onSubmit = useCallback(
        (data: FormFieldBlock[]) => {
            let loadingTimerID: ReturnType<typeof setTimeout>;
            const submitForm = async () => {
                setError(undefined);

                const dataToSend = Object.entries(data).map(([name, value]) => ({
                    field: name,
                    value,
                }));

                // delay loading indicator by 1s
                loadingTimerID = setTimeout(() => {
                    setIsLoading(true);
                }, 1000);

                try {
                    const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
                        body: JSON.stringify({
                            form: formID,
                            submissionData: dataToSend,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    });

                    const res = await req.json();

                    clearTimeout(loadingTimerID);

                    if (req.status >= 400) {
                        setIsLoading(false);

                        setError({
                            message: res.errors?.[0]?.message || "Internal Server Error",
                            status: res.status,
                        });

                        return;
                    }

                    setIsLoading(false);
                    setHasSubmitted(true);

                    if (confirmationType === "redirect" && redirect) {
                        const { url } = redirect;

                        const redirectUrl = url;

                        if (redirectUrl) router.push(redirectUrl);
                    }
                } catch (err) {
                    console.warn(err);
                    setIsLoading(false);
                    setError({
                        message: "Something went wrong.",
                    });
                }
            };

            void submitForm();
        },
        [router, formID, redirect, confirmationType]
    );
    return (
        <div className="py-20 sm:py-32">
            <div className="container mx-auto grid grid-cols-6 gap-x-16 px-6 lg:grid-cols-12 lg:px-8">
                {introContent && !hasSubmitted && (
                    <RichText
                        className="col-span-full my-8 self-start lg:col-span-4 lg:mb-12"
                        data={introContent}
                        enableGutter={false}
                    />
                )}
                <div className="col-span-full lg:col-span-8">
                    {formSource === "formBuilder" ? (
                        <FormProvider {...formMethods}>
                            {!isLoading && hasSubmitted && confirmationType === "message" && (
                                <RichText data={confirmationMessage} />
                            )}
                            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                            {error && (
                                <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
                            )}
                            {!hasSubmitted && formFromProps && (
                                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4 last:mb-0">
                                        {formFromProps.fields &&
                                            formFromProps.fields?.map((field, index) => {
                                                const Field: React.FC<any> =
                                                    fields?.[
                                                        field.blockType as keyof typeof fields
                                                    ];
                                                if (Field) {
                                                    return (
                                                        <div className="mb-6 last:mb-0" key={index}>
                                                            <Field
                                                                form={formFromProps}
                                                                {...field}
                                                                {...formMethods}
                                                                control={control}
                                                                errors={errors}
                                                                register={register}
                                                            />
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                    </div>

                                    <Button form={formID} type="submit" variant="default">
                                        {submitButtonLabel || "Submit"}
                                    </Button>
                                </form>
                            )}
                        </FormProvider>
                    ) : (
                        // Render embedded form
                        <FormEmbed embedCode={embedCode || ""} />
                    )}
                </div>
            </div>
        </div>
    );
};
