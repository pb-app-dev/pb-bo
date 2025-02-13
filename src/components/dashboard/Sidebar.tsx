'use client';

import Link from 'next/link';
import {FiHome, FiLogOut} from 'react-icons/fi';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode} from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {logo} from "../../../public";
import {useQueryClient} from "@tanstack/react-query";
import useGetMe from "@/hooks/user/useGetMe";
import {deleteCookie} from 'cookies-next';
import {MdMiscellaneousServices} from "react-icons/md";
import {BiSolidCategoryAlt} from "react-icons/bi";
import {FaUsers} from "react-icons/fa6";

interface NavItem {
    name: string;
    href: string;
    icon: ReactNode;
}

const navItems: NavItem[] = [
    {name: 'Home', href: '/dashboard', icon: <FiHome/>},
    {name: 'Users', href: '/dashboard/users', icon: <FaUsers/>},
    {name: 'Services', href: '/dashboard/services', icon: <MdMiscellaneousServices/>},
    {name: 'Categories', href: '/dashboard/categories', icon: <BiSolidCategoryAlt/>}
];

const Sidebar = () => {

    const {isLoading} = useGetMe();

    const pathname = usePathname();
    const queryClient = useQueryClient();

    const router = useRouter();

    const handleSignOut = async () => {
        deleteCookie('token');
        await queryClient.cancelQueries();
        queryClient.clear();
        router.replace('/signin');
    }

    return (
        <div className="flex flex-col h-screen w-64 bg-primary text-white shadow-xl">
            <div className="flex items-center justify-center py-4 border-b border-gray-700">
                <div className="flex-shrink-0 text-center font-semibold">
                    <Image
                        src={logo}
                        alt="zawaji-logo"
                        className="w-48 object-cover object-center"
                    />
                </div>
            </div>

            {
                isLoading ? <div className="flex flex-col gap-2 px-4 py-6">
                        {
                            Array.from({length: 3}).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-12 w-full bg-secondary/50 animate-pulse rounded-lg"
                                />
                            ))
                        }
                    </div> :
                    <>
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                                        pathname === item.href
                                            ? 'bg-secondary/10 text-secondary'
                                            : 'hover:bg-secondary/10'
                                    }`}
                                >
                                    <div
                                        className={`text-xl mr-4 text-secondary`}
                                    >
                                        {item.icon}
                                    </div>
                                    <span className="text-secondary text-base font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="px-4 py-6 border-t border-gray-700">
                            <Button
                                className="flex items-center justify-center w-full bg-secondary hover:bg-secondary/80 text-primary rounded-lg transition-colors group"
                                onClick={handleSignOut}
                            >
                                <FiLogOut className="text-xl mr-0.5 text-primary"/>
                                <span className="text-sm font-medium">Log Out</span>
                            </Button>
                        </div>
                    </>
            }
        </div>
    );
};

export default Sidebar;