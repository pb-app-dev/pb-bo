import React from 'react';
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa6";

const Header = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="font-medium text-lg">
                    Services list
                </h1>
                <Button
                >
                    <FaPlus className="flex-none"/> Add service
                </Button>
            </div>

            {/*<AddSupervisorDialog isOpen={open} onClose={handleOpenChange}/>*/}
        </>
    );
};

export default Header;