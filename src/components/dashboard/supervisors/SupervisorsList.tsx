"use client";

import React, {useEffect, useState} from 'react';
import {Meta} from "@/types/Meta";
import useGetSupervisors from "@/hooks/supervisor/useGetSupervisors";
import SkeletonLoader from "@/components/dashboard/SkeletonLoader";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {RiUserUnfollowFill} from "react-icons/ri";

const SupervisorsList = () => {

    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta | null>(null);


    const {isPending, data, error} = useGetSupervisors({
        page,
        orderDirection: 'desc',
        limit: 10
    });


    useEffect(() => {
        if (data) {
            setMeta(data.meta);
        }
    }, [data]);


    return (
        <div className="h-full">
            {
                isPending ? (
                    <SkeletonLoader
                        columns={4}
                    />
                ) : error ? (
                    <div className="h-full flex justify-center items-center text-red-500">Error: {error.message}</div>
                ) : (
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Username
                                    </TableHead>
                                    <TableHead>
                                        Gender
                                    </TableHead>
                                    <TableHead>
                                        Email
                                    </TableHead>
                                    <TableHead>
                                        Age
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data && data.data.map((supervisor) => (
                                        <TableRow key={supervisor.id}>
                                            <TableCell>
                                                {
                                                    supervisor.username
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    supervisor.gender === "male" ? "Male" : "Female"
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    supervisor.email
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    supervisor.age
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
                                            <TableCell colSpan={8}>
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
                                        </TableRow>
                                        : <TableRow>
                                            <TableCell colSpan={8}>
                                                <div className="flex justify-center items-center gap-2 mt-6">
                                                    <RiUserUnfollowFill className="flex-none" size={20} /> No supervisors found
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
    );
};

export default SupervisorsList;