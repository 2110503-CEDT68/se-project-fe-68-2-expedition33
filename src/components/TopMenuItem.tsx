"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopMenuItem({ title, pageRef, icon }: { title: string, pageRef: string, icon: React.ReactElement }) {
    const pathname = usePathname();
    const isActive = pathname === pageRef;

    return (
        <Link 
            href={pageRef} 
            className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 font-sans text-[15px] font-semibold transition-all duration-200 ease-in-out whitespace-nowrap
            ${isActive 
                ? 'bg-primary/15 text-primary shadow-inner ring-1 ring-primary/20' 
                : 'text-primary hover:bg-primary/10'
            }`}
        >
            <div className={`${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {icon}
            </div>
            {title}
        </Link>
    );
}