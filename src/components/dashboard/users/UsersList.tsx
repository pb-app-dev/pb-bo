"use client";

import React from 'react';
import useGetUsers from "@/hooks/user/useGetUsers";
import Loader from "@/components/Loader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const UsersList = () => {

    const {isPending, data} = useGetUsers({
        is_store: 1,
        status: "pending",
        is_customer: 1
    });

    return (
        <div className="h-full">
            {
                isPending ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <Loader size="medium"/>
                        </div>
                    ) :
                    data && data.data.length > 0 ?
                        (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-start p-2.5">First name</TableHead>
                                        <TableHead className="text-start p-2.5">Last name</TableHead>
                                        <TableHead className="text-start p-2.5">Email</TableHead>
                                        <TableHead className="text-start p-2.5">Phone</TableHead>
                                        <TableHead className="text-start p-2.5">Profile picture</TableHead>
                                        <TableHead className="text-start p-2.5">Actions</TableHead>
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
                                                        <div className="rounded-lg border w-max overflow-hidden">
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
                                                <div className="flex gap-2">
                                                    <Button
                                                        className="bg-red-500 hover:bg-red-600"
                                                    >
                                                        Decline
                                                    </Button>
                                                    <Button
                                                    >
                                                        Validate
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <p>
                                    No users found
                                </p>
                            </div>
                        )
            }
        </div>
    );
};

export default UsersList;