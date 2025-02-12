"use client";

import React from 'react';
import useGetServices from "@/hooks/service/useGetServices";

const Services = () => {

    const {isPending, data} = useGetServices();

    return (
        <div className="grid grid-cols-4 gap-4">
            {
                isPending ? Array.from({length: 4}).map((_, index) => (
                    <div
                        key={index}
                        className="h-32 w-full bg-gray-100 animate-pulse rounded-lg"
                    />
                )) : data?.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white shadow-lg rounded-lg p-4"
                    >
                        <h3 className="text-lg font-semibold">{service.label}</h3>
                        <p className="text-sm text-gray-500">{service.price}</p>
                        <small>
                            Category {service.category.name}
                        </small>
                    </div>
                ))
            }
        </div>
    );
};

export default Services;