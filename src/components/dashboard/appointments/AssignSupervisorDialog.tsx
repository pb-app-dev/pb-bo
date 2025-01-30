import React from 'react';
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
import {FaPeopleArrows} from "react-icons/fa6";
import useGetAvailableSupervisors from "@/hooks/supervisor/useGetAvailableSupervisors";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useFormik} from "formik";
import * as Yup from "yup";
import useAssignSupervisor from "@/hooks/appointment/useAssignSupervisor";
import {AxiosError} from "axios";
import {useQueryClient} from "@tanstack/react-query";


interface AssignSupervisorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    requesterName: string;
    receiverName: string;
    appointmentId: number | null;
}

const AssignSupervisorDialog = ({
                                    isOpen,
                                    onClose,
                                    requesterName,
                                    receiverName,
                                    appointmentId
                                }: AssignSupervisorDialogProps) => {

    const {data: supervisors} = useGetAvailableSupervisors();
    const {isPending, mutateAsync} = useAssignSupervisor();
    const queryClient = useQueryClient();

    const [error, setError] = React.useState<string | null>(null);


    const formik = useFormik({
        initialValues: {
            supervisor: "",
            meetingUrl: ""
        },
        validationSchema: Yup.object({
            supervisor: Yup.string().required("Supervisor is required"),
            meetingUrl: Yup.string().url("Invalid URL").required("Meeting URL is required")
        }),
        onSubmit: async (values, {resetForm}) => {
            setError(null);
            if (appointmentId) {
                await mutateAsync({
                    appointmentId: appointmentId,
                    meetingUrl: values.meetingUrl,
                    supervisorId: values.supervisor
                }, {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries({
                            queryKey: ['get-appointments', 1, 10, undefined, "desc"],
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
                                setError("You are not authorized to perform this action. Only ADMIN can assign supervisors.");
                            } else {
                                setError("An error occurred. Please try again.");
                            }
                        } else {
                            setError("An error occurred. Please try again.");
                        }
                    }
                });
            }
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
                        Assign supervisor
                    </DialogTitle>
                    <DialogDescription>
                        Assign supervisor to this appointment
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-1.5">
                    <p>
                        {requesterName}
                    </p>
                    <FaPeopleArrows/>
                    <p>
                        {receiverName}
                    </p>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="meetingUrl" className="text-sm">
                                Meeting URL
                            </label>
                            <Select
                                name="supervisor"
                                value={formik.values.supervisor}
                                onValueChange={(value) =>
                                    formik.setFieldValue('supervisor', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a supervisor"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            supervisors?.map((supervisor) => (
                                                <SelectItem
                                                    key={supervisor.id}
                                                    value={supervisor.id}
                                                >
                                                    {supervisor.username}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {
                                formik.touched.supervisor && formik.errors.supervisor ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.supervisor}
                                    </div> : null
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="meetingUrl" className="text-sm">
                                Meeting URL
                            </label>
                            <Input
                                id="meetingUrl"
                                name="meetingUrl"
                                type="url"
                                value={formik.values.meetingUrl}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.meetingUrl && formik.errors.meetingUrl ?
                                    <div className="text-sm text-red-500">
                                        {formik.errors.meetingUrl}
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
                                className="w-max self-end"
                                disabled={isPending || formik.isSubmitting}
                            >
                                {
                                    isPending ?
                                        "Assigning supervisor..." :
                                        "Assign supervisor"
                                }
                            </Button>
                        </div>
                    </DialogFooter>
                </form>

            </DialogContent>

        </Dialog>
    );
};

export default AssignSupervisorDialog;