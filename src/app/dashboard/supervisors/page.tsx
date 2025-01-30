import React from 'react';
import SupervisorsList from "@/components/dashboard/supervisors/SupervisorsList";
import Header from "@/components/dashboard/supervisors/Header";

const Supervisors = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <Header/>
            <hr/>
            <SupervisorsList/>
        </div>
    );
};

export default Supervisors;