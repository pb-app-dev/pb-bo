import React from 'react';
import Header from "@/components/dashboard/users/Header";
import UsersList from "@/components/dashboard/users/UsersList";

const Users = () => {
    return (
        <div className="flex flex-col gap-6 h-full overflow-hidden">
            <Header/>
            <UsersList/>
        </div>
    );
};

export default Users;