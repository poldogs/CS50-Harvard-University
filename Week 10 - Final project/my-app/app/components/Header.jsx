"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {

    const pathname = usePathname();
    return (
        <div className="flex justify-between items-center py-4">
        <span className="font-bold text-4xl">Logo</span>
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
            <li>
            <Link href="/crud" className={pathname === "/crud" ? "text-blue-500 font-bold" : "" }>
                Crud
            </Link>
            </li>
        </ul>
        </div>
    );
}

export default Header;