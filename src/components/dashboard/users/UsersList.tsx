"use client";

import React, {useState} from 'react';
import useGetUsers from "@/hooks/user/useGetUsers";
import Loader from "@/components/Loader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Filters from "@/components/dashboard/users/Filters";
import DeclineUserConfirmationDialog from "@/components/dashboard/users/DeclineUserConfirmationDialog";
import {useQueryClient} from "@tanstack/react-query";
import ValidateUserConfirmationDialog from "@/components/dashboard/users/ValidateUserConfirmationDialog";

const UsersList = () => {

    const queryClient = useQueryClient();
    const [isStore, setIsStore] = useState<0 | 1 | undefined>(undefined);
    const [isCustomer, setIsCustomer] = useState<0 | 1 | undefined>(undefined);
    const [status, setStatus] = useState<"pending" | "validated" | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
    const [isValidateDialogOpen, setIsValidateDialogOpen] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    const handleDeclineDialog = (userId: number) => {
        setUserId(userId);
        setIsDeclineDialogOpen(true);
    }

    const handleValidateDialog = (userId: number) => {
        setUserId(userId);
        setIsValidateDialogOpen(true);
    }

    const invalidateQuery = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["get-users", isStore, status, isCustomer, currentPage],
            type: 'all',
            exact: true,
        })
        setUserId(null);
    }

    const {isPending, data} = useGetUsers({
        is_store: isStore,
        status: status,
        is_customer: isCustomer,
        page: currentPage
    });

    return (
        <>

            <DeclineUserConfirmationDialog
                isOpen={isDeclineDialogOpen}
                onClose={() => setIsDeclineDialogOpen(false)}
                userId={userId}
                revalidateState={invalidateQuery}
            />

            <ValidateUserConfirmationDialog
                isOpen={isValidateDialogOpen}
                onClose={() => setIsValidateDialogOpen(false)}
                userId={userId}
                revalidateState={invalidateQuery}
            />

            <div className="relative h-full overflow-y-auto">
                <Filters
                    isStore={isStore}
                    setIsStore={setIsStore}
                    isCustomer={isCustomer}
                    setIsCustomer={setIsCustomer}
                    status={status}
                    setStatus={setStatus}
                    resetPage={() => setCurrentPage(1)}
                />
                {
                    isPending ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <Loader size="medium"/>
                            </div>
                        ) :
                        data && data.data.length > 0 ?
                            (
                                <div className="w-full">
                                    <div className="rounded-md border overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-start p-2.5">First name</TableHead>
                                                    <TableHead className="text-start p-2.5">Last name</TableHead>
                                                    <TableHead className="text-start p-2.5">Email</TableHead>
                                                    <TableHead className="text-start p-2.5">Phone</TableHead>
                                                    <TableHead className="text-start p-2.5">Profile picture</TableHead>
                                                    <TableHead className="text-start p-2.5">Status</TableHead>
                                                    <TableHead className="w-[10%] text-start p-2.5">
                                                        Actions
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {data.data.map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell className="p-2.5">{user.first_name}</TableCell>
                                                        <TableCell className="p-2.5">{user.last_name}</TableCell>
                                                        <TableCell className="p-2.5">{user.email}</TableCell>
                                                        <TableCell className="p-2.5">{user.phone}</TableCell>
                                                        <TableCell className="p-2.5">
                                                            {
                                                                user.profile_picture ?
                                                                    <div
                                                                        className="rounded-lg border w-max overflow-hidden">
                                                                        <Image
                                                                            src={user.profile_picture}
                                                                            alt={user.first_name + "-" + user.last_name}
                                                                            width={200}
                                                                            height={200}
                                                                            className="object-cover object-center rounded-lg size-12"
                                                                        />
                                                                    </div>
                                                                    : "-"
                                                            }
                                                        </TableCell>
                                                        <TableCell className="p-2.5">
                                                            {
                                                                user.store?.status ?
                                                                    user.store.status === "pending" ?
                                                                        "Pending" :
                                                                        user.store.status === "validated" ? "Validated" :
                                                                            user.store.status === "declined" ? "Declined" : "-"
                                                                    : "-"
                                                            }
                                                        </TableCell>
                                                        <TableCell className="p-2.5">
                                                            <div className="flex justify-end gap-2">
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        className="bg-red-500 hover:bg-red-600"
                                                                        onClick={() => handleDeclineDialog(user.id)}
                                                                    >
                                                                        Decline
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => handleValidateDialog(user.id)}
                                                                    >
                                                                        Validate
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex justify-end items-center gap-2 pt-6 pb-2.5">
                                        <Button
                                            className="disabled:opacity-50"
                                            disabled={data.meta.current_page === 1}
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="disabled:opacity-50"
                                            disabled={data.meta.current_page === data.meta.last_page}
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.meta.last_page))}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex justify-center items-center">
                                    <p>
                                        No users found
                                    </p>
                                </div>
                            )
                }
            </div>
        </>
    );
};

export default UsersList;