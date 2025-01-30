import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import * as Yup from "yup";
import {useFormik} from "formik";
import useCreateSupervisor from "@/hooks/supervisor/useCreateSupervisor";
import {AxiosError} from "axios";
import {useQueryClient} from "@tanstack/react-query";

interface AddSupervisorDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddSupervisorDialog = ({isOpen, onClose}: AddSupervisorDialogProps) => {

    const queryClient = useQueryClient();
    const {isPending, mutateAsync} = useCreateSupervisor();
    const [error, setError] = React.useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            gender: '',
            age: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            gender: Yup.string()
                .oneOf(['male', 'female'], 'Gender must be either "male" or "female"')
                .required('Gender is required'),
            age: Yup.number()
                .required('Age is required')
                .min(0, 'Age must be a positive number'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values, {resetForm}) => {
            setError(null);
            await mutateAsync({
                username: values.username,
                age: Number(values.age),
                email: values.email,
                gender: values.gender as "male" | "female",
                password: values.password
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: ['get-supervisors', 1, 10, undefined, "desc"],
                        type: 'all',
                        exact: true,
                    });
                    resetForm();
                    onClose();
                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        if (error.status === 401) {
                            setError("You are not authenticated. Please log in and try again.");
                        } else if (error.status === 403) {
                            setError("You are not authorized to perform this action. Only ADMIN can create supervisors.");
                        } else {
                            setError("An error occurred. Please try again.");
                        }
                    } else {
                        setError("An error occurred. Please try again.");
                    }
                }
            });
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
                        Add supervisor
                    </DialogTitle>
                    <DialogDescription>
                        Add a new supervisor to the list
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.username && formik.errors.username ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.username}
                                    </div> : null
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="gender" className="text-sm">
                                Gender
                            </label>
                            <Select
                                name="gender"
                                value={formik.values.gender}
                                onValueChange={(value) =>
                                    formik.setFieldValue('gender', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a gender"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Gender
                                        </SelectLabel>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {
                                formik.touched.gender && formik.errors.gender ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.gender}
                                    </div> : null
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="age" className="text-sm">
                                Age
                            </label>
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.age && formik.errors.age ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.age}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.email && formik.errors.email ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.email}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.password && formik.errors.password ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.password}
                                    </div> : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirmPassword" className="text-sm">
                                Confirm password
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.confirmPassword}
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
                                    isPending ? 'Adding supervisor...' : 'Add supervisor'
                                }
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddSupervisorDialog;