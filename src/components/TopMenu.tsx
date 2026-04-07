"use client";

import Image from "next/image";
import TopMenuItem from "@/components/TopMenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SignOutPanel from "@/components/modals/SignOutPanel";

export default function TopMenu() {
    const { data: session } = useSession();
    const [showSignOut, setShowSignOut] = useState(false);

    return (
        <>
            <div className="bg-surface/90 backdrop-blur-md border-b border-surface-border fixed top-0 h-16 w-full z-50 shadow-sm transition-all">
                
                <div className="flex flex-row items-center justify-between w-full h-full px-4 md:px-10 overflow-x-auto no-scrollbar gap-4">

                    <div className="flex items-center gap-4 md:gap-8 shrink-0">
                        <Link href="/" className="shrink-0 mr-2">
                            <Image 
                                src={"/images/JobFairLogo.png"}
                                className="h-12.5 w-auto cursor-pointer rounded-xl"
                                alt="logo"
                                width={0}
                                height={0}
                                sizes="100vh"
                                priority
                            />
                        </Link>

                        <div className="flex items-center gap-2 md:gap-4">
                            <TopMenuItem 
                                title="Company" 
                                pageRef="/companies" 
                                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                            />
                            <TopMenuItem 
                                title="My Session" 
                                pageRef="/bookings" 
                                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        {session ? (
                            <div className="flex items-center gap-4 md:gap-6 shrink-0 ml-auto">
                                <TopMenuItem 
                                    title="Profile" 
                                    pageRef="/api/auth/profile" 
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                />
                                <button
                                    onClick={() => setShowSignOut(true)}
                                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-bold text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap"
                                >
                                    Sign-Out of {session.user?.name}
                                </button>
                            </div>
                        ) : (
                            <Link 
                                href="/api/auth/login"
                                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap"
                            >
                                Sign-In
                            </Link>
                        )}
                    </div>

                </div>
            </div>

            {/* Sign-Out Modal */}
            {showSignOut && (
                <SignOutPanel onClose={() => setShowSignOut(false)} />
            )}
        </>
    );
}