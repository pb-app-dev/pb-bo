import React, {useState} from 'react';
import {Category} from "@/types/Category";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useFormik} from "formik";
import * as Yup from "yup";
import Image from "next/image";
import useUpdateCategory from "@/hooks/category/useUpdateCategory";
import useSignedUrl from "@/hooks/files/useSignedUrl";
import useUploadFile from "@/hooks/files/useUploadFile";
import {useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";

interface UpdateCategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
}

const UpdateCategoryDialog = ({isOpen, onClose, category}: UpdateCategoryDialogProps) => {

    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const {isPending: isUpdating, mutateAsync} = useUpdateCategory();
    const {isPending: isSigning, mutateAsync: signedUrl} = useSignedUrl();
    const {isPending: isUploading, mutateAsync: uploadFile} = useUploadFile();

    const formik = useFormik<{
        name: string,
        thumbnail: File | null
    }>({
        enableReinitialize: true,
        initialValues: {
            name: category?.name || "",
            thumbnail: null
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            thumbnail: Yup.mixed()
                .required('Thumbnail is required')
        }),
        onSubmit: async (values, {resetForm}) => {

            if (!category) return;

            const mimeType = values.thumbnail?.type || 'image/png';
            const extension = mimeType.split('/')[1];

            await signedUrl({
                mimeType,
                extension
            }).then(async (response) => {
                const {url, filePath} = response;

                await uploadFile({
                    file: values.thumbnail as File,
                    url
                }).then(async () => {

                    await mutateAsync({
                        id: category.id,
                        name: values.name,
                        thumbnail: filePath
                    })
                        .then(async () => {
                            await queryClient.invalidateQueries({
                                queryKey: ['get-categories'],
                                type: 'all',
                                exact: true,
                            });
                            resetForm();
                            onClose();
                        })
                        .catch(error => {
                            if (error instanceof AxiosError) {
                                if (error.status === 422) {
                                    setError("Category with this name already exists");
                                } else {
                                    setError("Failed to update category!");
                                }
                            } else {
                                setError("Failed to update category!");
                            }
                        })
                }).catch(error => {
                    console.log(error);
                    setError("Failed to upload the thumbnail");
                })
            }).catch(error => {
                console.log(error);
                setError("Failed to get signed url for the thumbnail");
            })
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
                        Update category
                    </DialogTitle>
                    <DialogDescription>
                        Update category details.
                    </DialogDescription>
                </DialogHeader>

                {
                    !category ? (
                            <div className="py-4 text-center text-primary">
                                There is no category to update.
                            </div>
                        ) :
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

                                {
                                    category.thumbnail ? (
                                        <div>
                                            <Image
                                                src={category.thumbnail}
                                                alt={category.name + " thumbnail"}
                                                width={500}
                                                height={500}
                                                className="rounded-lg object-contain object-center w-full h-48"
                                            />
                                        </div>
                                    ) : null
                                }

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
                                        disabled={isUpdating || isSigning || isUploading}
                                        className="w-max self-end"
                                    >
                                        {
                                            isUpdating || isSigning || isUploading ? "Updating category..." : "Update category"
                                        }
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                }
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCategoryDialog;