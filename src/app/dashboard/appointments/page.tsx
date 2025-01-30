import React from 'react';
import AppointmentsList from "@/components/dashboard/appointments/AppointmentsList";

const Appointments = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <h1 className="font-medium text-lg">Appointments list</h1>
            <hr />
            <AppointmentsList />
        </div>
    );
};

export default Appointments;