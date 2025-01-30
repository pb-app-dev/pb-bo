"use client";

import React, {useEffect, useState} from 'react';
import useGetAppointments from "@/hooks/appointment/useGetAppointments";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getReformulatedDate} from "@/utils/getReformulatedDate";
import {getStatusText} from "@/utils/getStatusText";
import {Meta} from "@/types/Meta";
import {Button} from "@/components/ui/button";
import SkeletonLoader from "@/components/dashboard/SkeletonLoader";
import {MdPlaylistRemove} from "react-icons/md";
import AssignSupervisorDialog from "@/components/dashboard/appointments/AssignSupervisorDialog";
import {getReformulatedTimeFromDate} from "@/utils/getReformulatedTimeFromDate";

const AppointmentsList = () => {

    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [openAssignDialog, setOpenAssignDialog] = useState<boolean>(false);
    const [selectedRequester, setSelectedRequester] = useState<string>('');
    const [selectedReceiver, setSelectedReceiver] = useState<string>('');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

    const {isPending, data, error} = useGetAppointments({
        page,
        orderDirection: 'desc',
        limit: 10
    });


    const handleAssignDialog = (requester: string, receiver: string, appointmentId: number) => {
        setSelectedRequester(requester);
        setSelectedReceiver(receiver);
        setSelectedAppointmentId(appointmentId);
        setOpenAssignDialog(true);
    }

    useEffect(() => {
        if (data) {
            setMeta(data.meta);
        }
    }, [data]);

    return (
        <>
            <AssignSupervisorDialog
                isOpen={openAssignDialog}
                onClose={() => setOpenAssignDialog(false)}
                requesterName={selectedRequester}
                receiverName={selectedReceiver}
                appointmentId={selectedAppointmentId}
            />
            <div className="h-full">
                {
                    isPending ? (
                        <SkeletonLoader
                            columns={8}
                        />
                    ) : error ? (
                        <div
                            className="h-full flex justify-center items-center text-red-500">Error: {error.message}</div>
                    ) : (
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Requester username
                                        </TableHead>
                                        <TableHead>
                                            Receiver username
                                        </TableHead>
                                        <TableHead>
                                            Requested at
                                        </TableHead>
                                        <TableHead>
                                            Status
                                        </TableHead>
                                        <TableHead>
                                            Accepted at
                                        </TableHead>
                                        <TableHead>
                                            Meeting date
                                        </TableHead>
                                        <TableHead>
                                            Meeting start time
                                        </TableHead>
                                        <TableHead>
                                            Meeting end time
                                        </TableHead>
                                        <TableHead>
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        data && data.data.map((appointment) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell>
                                                    {
                                                        appointment.requester.username
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        appointment.receiver.username
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        getReformulatedDate(appointment.requested_at)
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        getStatusText(appointment.status)
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        appointment.accepted_at ? getReformulatedDate(appointment.accepted_at) : 'N/A'
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        appointment.meeting_date ? getReformulatedDate(appointment.meeting_date) : 'N/A'
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        appointment.meeting_start_time ? getReformulatedTimeFromDate(appointment.meeting_start_time) : 'N/A'
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        appointment.meeting_end_time ? getReformulatedTimeFromDate(appointment.meeting_end_time) : 'N/A'
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        appointment.status === "ACCEPTED" ?
                                                            appointment.supervisor ? `Assigned to ${appointment.supervisor.username}` :
                                                                appointment.meeting_start_time && new Date(appointment.meeting_start_time) > new Date() ?
                                                                    <Button
                                                                        className="bg-green-500 hover:bg-green-600"
                                                                        onClick={() => handleAssignDialog(
                                                                            appointment.requester.username,
                                                                            appointment.receiver.username,
                                                                            appointment.id)
                                                                        }
                                                                    >
                                                                        Assign
                                                                    </Button> : "-"
                                                            : "-"
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    {
                                        data && data.data.length > 0 ?
                                            <TableRow>
                                                <TableCell colSpan={9}>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            Showing {meta?.currentItems} of {meta?.totalItems} items
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() => setPage(page - 1)}
                                                                disabled={!meta?.hasPreviousPage}
                                                                className="bg-primary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Previous
                                                            </Button>
                                                            <Button
                                                                onClick={() => setPage(page + 1)}
                                                                disabled={!meta?.hasNextPage}
                                                                className="bg-primary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow> :
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <div className="flex justify-center items-center gap-2 mt-6">
                                                        <MdPlaylistRemove className="flex-none" size={20}/> No
                                                        appointments found
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                    }
                                </TableFooter>
                            </Table>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default AppointmentsList;