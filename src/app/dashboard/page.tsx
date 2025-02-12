'use client';

import useGetMe from "@/hooks/user/useGetMe";
import Loader from "@/components/Loader";

const Dashboard = () => {

    const {
        data,
        error,
        isPending
    } = useGetMe();

    return (
        <div className="h-full">
            {
                isPending ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader size="medium"/>
                    </div>
                ) : error ? (
                    <div className="text-sm text-center text-red-500">Error: {error.message}</div>
                ) : (
                    <div className="flex flex-col border-b pb-4">
                        {
                            data ? <div className="flex justify-between items-center">
                                <div className="text-gray-800">
                                    <div>{data.first_name + " " + data.last_name}</div>
                                    <div className="text-sm">{data.email}</div>
                                </div>
                            </div> : null
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Dashboard;