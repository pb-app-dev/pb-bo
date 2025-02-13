"use client";

import React, {useState} from 'react';
import Loader from "@/components/Loader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useGetServices from "@/hooks/service/useGetServices";
import {Button} from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/dashboard/service/DeleteConfirmationDialog";

const ServicesList = () => {

    const {isPending, data} = useGetServices();
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);


    const handleDeleteService = (serviceId: number) => {
        setSelectedServiceId(serviceId);
        setIsDeleteDialogOpen(true);
    }

    return (
        <>

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                serviceId={selectedServiceId}
            />

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
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            className="bg-red-500 hover:bg-red-600"
                                                            onClick={() => handleDeleteService(service.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
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
        </>
    );
};

export default ServicesList;