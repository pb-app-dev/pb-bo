"use client";

import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import useCreateCategory from "@/hooks/category/useCreateCategory";
import {useQueryClient} from "@tanstack/react-query";
import useSignedUrl from "@/hooks/files/useSignedUrl";
import useUploadFile from "@/hooks/files/useUploadFile";
import {AxiosError} from "axios";

interface CreateCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateCategoryDialog = ({isOpen, onClose}: CreateCategoryDialogProps) => {

    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const {isPending: isCreating, mutateAsync} = useCreateCategory();
    const {isPending: isSigning, mutateAsync: signedUrl} = useSignedUrl();
    const {isPending: isUploading, mutateAsync: uploadFile} = useUploadFile();


    const formik = useFormik<{
        name: string,
        thumbnail: File | null
    }>({
        initialValues: {
            name: "",
            thumbnail: null
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            thumbnail: Yup.mixed()
                .required('Thumbnail is required')
        }),
        onSubmit: async (values, {resetForm}) => {

            const mimeType = values.thumbnail?.type || 'image/png';
            const extension = mimeType.split('/')[1];

            await signedUrl({mimeType, extension})
                .then(async (response) => {
                    const {url, filePath} = response;

                    console.log("url", url);
                    console.log("filePath", filePath);

                    await uploadFile({file: values.thumbnail as File, url})
                        .then(async () => {
                            await mutateAsync({name: values.name, thumbnail: filePath})
                                .then(async () => {
                                    await queryClient.invalidateQueries({
                                        queryKey: ["get-categories", 1],
                                        type: "all",
                                        exact: true,
                                    });
                                    resetForm();
                                    onClose();
                                })
                                .catch((error) => {
                                    if (error instanceof AxiosError) {
                                        if (error.status === 422) {
                                            setError("Category with this name already exists");
                                        } else {
                                            setError("Failed to create category!");
                                        }
                                    } else {
                                        setError("Failed to create category!");
                                    }
                                });
                        })
                        .catch(() => {
                            setError("Failed to upload the thumbnail");
                        });
                })
                .catch(() => {
                    setError("Failed to get signed url for the thumbnail");
                });
        }
    });


    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="sm:max-w-[32rem]">
                <DialogHeader>
                    <DialogTitle>
                        Add new category
                    </DialogTitle>
                    <DialogDescription>
                        Add a new category to the list
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm">
                                Category name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.name && formik.errors.name ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.name}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="thumbnail" className="text-sm">
                                Thumbnail
                            </label>
                            <Input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files?.[0] || null;
                                    formik.setFieldValue("thumbnail", file);
                                }}
                            />
                            {
                                formik.touched.thumbnail && formik.errors.thumbnail ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.thumbnail}
                                    </div> : null
                            }
                        </div>

                    </div>
                    <DialogFooter>
                        <div className="flex flex-col w-full gap-2">
                            {
                                error ?
                                    <div className="text-sm text-red-500">
                                        {error}
                                    </div> : null
                            }
                            <Button
                                type="submit"
                                disabled={isCreating || isSigning || isUploading}
                                className="w-max self-end"
                            >
                                {
                                    isCreating || isSigning || isUploading ? 'Adding category...' : 'Add category'
                                }
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryDialog;