'use client';

import Link from 'next/link';
import {FiHome, FiLogOut} from 'react-icons/fi';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode} from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {logo} from "../../../public";
import {signOut} from "@/actions/auth/signOut";
import {IoIosList} from "react-icons/io";
import {MdSupervisorAccount} from "react-icons/md";
import {useQueryClient} from "@tanstack/react-query";
import useGetMe from "@/hooks/user/useGetMe";

interface NavItem {
    name: string;
    href: string;
    icon: ReactNode;
}

const navItems: NavItem[] = [
    {name: 'Home', href: '/dashboard', icon: <FiHome/>},
    {name: 'Appointments', href: '/dashboard/appointments', icon: <IoIosList/>},
    {name: 'Supervisors', href: '/dashboard/supervisors', icon: <MdSupervisorAccount/>}
];

const Sidebar = () => {

    const {data, isLoading} = useGetMe();

    const pathname = usePathname();
    const queryClient = useQueryClient();

    const router = useRouter();

    const handleSignOut = async () => {
        await queryClient.cancelQueries();
        queryClient.clear();

        await signOut();

        router.replace('/signin');
    }

    return (
        <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl">
            <div className="flex items-center justify-center py-4 border-b border-gray-700">
                <div className="flex-shrink-0 text-center font-semibold">
                    <Image
                        src={logo}
                        alt="zawaji-logo"
                        className="w-32 object-cover object-center"
                    />
                </div>
            </div>

            {
                isLoading ? <div className="flex flex-col gap-2 px-4 py-6">
                        {
                            Array.from({length: 3}).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-12 w-full bg-gray-700 animate-pulse rounded-lg"
                                />
                            ))
                        }
                    </div> :
                    <>
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {navItems.map((item) => (
                                data && data.type === "SUPERVISOR" && item.name === "Supervisors" ? null : (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                                            pathname === item.href
                                                ? 'bg-gray-700 text-gray-200'
                                                : 'hover:bg-gray-700 hover:text-gray-300 text-gray-400'
                                        }`}
                                    >
                                        <div
                                            className={`text-xl mr-4 ${
                                                pathname === item.href
                                                    ? 'text-gray-200'
                                                    : 'text-gray-400 group-hover:text-gray-200'
                                            }`}
                                        >
                                            {item.icon}
                                        </div>
                                        <span className="text-base font-medium">{item.name}</span>
                                    </Link>
                                )
                            ))}
                        </nav>
                        <div className="px-4 py-6 border-t border-gray-700">
                            <Button
                                className="flex items-center justify-center w-full bg-primary hover:bg-accent text-white rounded-lg transition-colors group"
                                onClick={handleSignOut}
                            >
                                <FiLogOut className="text-xl mr-0.5 text-white group-hover:text-gray-200"/>
                                <span className="text-sm font-medium">Log Out</span>
                            </Button>
                        </div>
                    </>
            }
        </div>
    );
};

export default Sidebar;