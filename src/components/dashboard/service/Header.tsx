"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa6";
import CreateServiceDialog from "@/components/dashboard/service/CreateServiceDialog";

const Header = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className="flex justify-between items-center sticky top-0 z-10 pb-4 bg-white">
                <h1 className="font-medium text-lg">
                    Services list
                </h1>
                <Button
                    onClick={handleOpenChange}
                >
                    <FaPlus className="flex-none"/> Add service
                </Button>
            </div>

            <CreateServiceDialog isOpen={open} onClose={handleOpenChange}/>
        </>
    );
};

export default Header;