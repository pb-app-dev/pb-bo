"use client";

import React from 'react';
import Loader from "@/components/Loader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useGetServices from "@/hooks/service/useGetServices";

const ServicesList = () => {

    const {isPending, data} = useGetServices();

    return (
        <div className="h-full">
            {
                isPending ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <Loader size="medium"/>
                        </div>
                    ) :
                    data && data.length > 0 ?
                        (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-start p-2.5">Label</TableHead>
                                        <TableHead className="text-start p-2.5">Price</TableHead>
                                        <TableHead className="text-start p-2.5">Currency</TableHead>
                                        <TableHead className="text-start p-2.5">Category</TableHead>
                                        <TableHead className="text-start p-2.5">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell className="p-2.5">{service.label}</TableCell>
                                            <TableCell className="p-2.5">{service.price}</TableCell>
                                            <TableCell className="p-2.5">{service.currency}</TableCell>
                                            <TableCell className="p-2.5">{service.category.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <p>No services found</p>
                            </div>
                        )
            }
        </div>
    );
};

export default ServicesList;