"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {FaUserPlus} from "react-icons/fa6";
import AddSupervisorDialog from "@/components/dashboard/supervisors/AddSupervisorDialog";

const Header = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="font-medium text-lg">Supervisors list</h1>
                <Button
                    onClick={handleOpenChange}
                >
                    <FaUserPlus className="flex-none"/> Add supervisor
                </Button>
            </div>

            <AddSupervisorDialog isOpen={open} onClose={handleOpenChange}/>
        </>
    );
};

export default Header;