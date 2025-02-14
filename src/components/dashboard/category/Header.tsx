"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa6";
import CreateCategoryDialog from "@/components/dashboard/category/CreateCategoryDialog";

const Header = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className="flex justify-between items-center pb-4 bg-white">
                <h1 className="font-medium text-lg">
                    Categories list
                </h1>
                <Button
                    onClick={handleOpenChange}
                >
                    <FaPlus className="flex-none"/> Add category
                </Button>
            </div>

            <CreateCategoryDialog isOpen={open} onClose={handleOpenChange}/>
        </>
    );
};

export default Header;