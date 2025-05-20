"use client";

import React, {useState} from 'react';
import Loader from "@/components/Loader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useGetServices from "@/hooks/service/useGetServices";
import {Button} from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/dashboard/service/DeleteConfirmationDialog";
import {Service} from "@/types/Service";
import UpdateServiceDialog from "@/components/dashboard/service/UpdateServiceDialog";

const ServicesList = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const {isPending, data} = useGetServices({
        page: currentPage
    });
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false)


    const handleDeleteService = (serviceId: number) => {
        setSelectedServiceId(serviceId);
        setIsDeleteDialogOpen(true);
    }

    const handleUpdateService = (service: Service) => {
        setSelectedService(service);
        setIsUpdateDialogOpen(true);
    }

    return (
        <>

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                serviceId={selectedServiceId}
                currentPage={currentPage}
            />

            <UpdateServiceDialog
                isOpen={isUpdateDialogOpen}
                onClose={() => setIsUpdateDialogOpen(false)}
                service={selectedService}
                currentPage={currentPage}
            />

            <div className="h-full">
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
                                                    <TableHead className="w-1/4 text-start p-2.5">Label</TableHead>
                                                    <TableHead className="w-1/4 text-start p-2.5">Price</TableHead>
                                                    <TableHead className="w-1/4 text-start p-2.5">Category</TableHead>
                                                    <TableHead className="w-1/4 text-start p-2.5">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {data.data.map((service) => (
                                                    <TableRow key={service.id}>
                                                        <TableCell className="p-2.5">{service.label}</TableCell>
                                                        <TableCell className="p-2.5">{service.price}</TableCell>
                                                        <TableCell className="p-2.5">{service.category.name}</TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    className="bg-red-500 hover:bg-red-600"
                                                                    onClick={() => handleDeleteService(service.id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleUpdateService(service)}
                                                                >
                                                                    Update
                                                                </Button>
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
                                    <p>No services found</p>
                                </div>
                            )
                }
            </div>
        </>
    );
};

export default ServicesList;