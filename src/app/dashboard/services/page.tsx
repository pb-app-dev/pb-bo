import React from 'react';
import ServicesList from "@/components/dashboard/service/ServicesList";
import Header from "@/components/dashboard/service/Header";

const Services = () => {


    return (
        <div className="flex flex-col gap-6 h-full">
            <Header/>
            <ServicesList/>
        </div>
    );
};

export default Services;