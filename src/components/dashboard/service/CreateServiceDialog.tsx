import React, {useState} from 'react';
import {useQueryClient} from "@tanstack/react-query";
import useGetCategories from "@/hooks/category/useGetCategories";
import {useFormik} from "formik";
import * as Yup from "yup";
import useCreateService from "@/hooks/service/useCreateService";
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
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


interface CreateServiceDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateServiceDialog = ({isOpen, onClose}: CreateServiceDialogProps) => {
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const {isPending: isCategoryPending, data} = useGetCategories({
        page: 1
    });
    const {isPending, mutateAsync} = useCreateService();


    const formik = useFormik({
        initialValues: {
            label: "",
            price: 0,
            currency: "eur",
            category_id: ""
        },
        validationSchema: Yup.object({
            label: Yup.string()
                .required('Label is required'),
            price: Yup.number()
                .required('Price is required'),
            currency: Yup.string()
                .required('Currency is required'),
            category_id: Yup.string()
                .required('Category is required')
        }),
        onSubmit: async (values, {resetForm}) => {
            const {label, price, currency, category_id} = values;

            await mutateAsync({label, price, currency, category_id: Number(category_id)})
                .then(async () => {
                    await queryClient.invalidateQueries({
                        queryKey: ["get-services", 1],
                        type: "all",
                        exact: true,
                    });
                    resetForm();
                    onClose();
                }).catch((error) => {
                    console.log("error", error);
                    setError("Failed to create service");
                })
        }

    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="sm:max-w-[32rem]">
                <DialogHeader>
                    <DialogTitle>
                        Add new service
                    </DialogTitle>
                    <DialogDescription>
                        Add a new service to the list
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="label" className="text-sm">
                                Label
                            </label>
                            <Input
                                id="label"
                                name="label"
                                type="text"
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.label && formik.errors.label ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.label}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="price" className="text-sm">
                                Price
                            </label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.price && formik.errors.price ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.price}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="currency" className="text-sm">
                                Currency
                            </label>
                            <Select
                                name="currency"
                                value={formik.values.currency}
                                onValueChange={(value) =>
                                    formik.setFieldValue('currency', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select currency"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem
                                            value="eur"
                                        >
                                            Euro
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {
                                formik.touched.currency && formik.errors.currency ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.currency}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="currency" className="text-sm">
                                Category
                            </label>
                            <Select
                                name="category_id"
                                value={formik.values.category_id}
                                onValueChange={(value) =>
                                    formik.setFieldValue('category_id', value)
                                }
                                disabled={isCategoryPending}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            data?.data.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {
                                formik.touched.currency && formik.errors.currency ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.currency}
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
                                disabled={isPending}
                                className="w-max self-end"
                            >
                                {
                                    isPending ? "Adding service..." : "Add service"
                                }
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateServiceDialog;