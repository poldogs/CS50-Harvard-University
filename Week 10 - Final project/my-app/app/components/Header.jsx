"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image'; 


const Header = () => {

    const pathname = usePathname();
    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-1">
                <Image
                    src="/Harvard-Logo.png" 
                    alt="Harvard Logo"
                    width={50} 
                    height={50} 
                />
                <span className="font-bold text-4xl">Poldo's CS50 Final Project</span>
            </div>
        <ul className="flex space-x-4">
            <li>
            <Link href="/" className={pathname === "/" ? "text-blue-500 font-bold" : "" }>
                Home
            </Link>
            </li>
            <li>
            <Link href="/about" className={pathname === "/about" ? "text-blue-500 font-bold" : "" }>
                About
            </Link>
            </li>
            <li>
            <Link href="/tasks" className={pathname === "/tasks" ? "text-blue-500 font-bold" : "" }>
                Tasks
            </Link>
            </li>
        </ul>
        </div>
    );
}

export default Header;