import React from 'react';
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen overflow-y-hidden bg-white">
            <div>
                <Sidebar/>
            </div>
            <div className="flex flex-col flex-grow overflow-x-hidden p-6">
                <main className="flex-grow h-full overflow-y-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;