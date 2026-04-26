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
    const role = session?.user?.role;

    let bookingMenuText;
    if (role === "admin") {
        bookingMenuText = "All Session"
    } else if (role === "company") {
        bookingMenuText = "Booked Session"
    } else {
        bookingMenuText = "My Session"
    }

    let profileMenuText;
    if (role === "admin") {
        profileMenuText = "Admin"
    } else if (role === "company") {
        profileMenuText = "Manage"
    } else {
        profileMenuText = "Profile"
    }

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
                                title={bookingMenuText}
                                pageRef="/bookings"
                                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                            />

                            {role === "company" && (
                                <TopMenuItem
                                    title="Payment"
                                    pageRef="/payments"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                />
                            )}

                        </div>

                        
                    </div>

                    <div className="flex items-center">
                        {session ? (
                            <div className="flex items-center gap-4 md:gap-6 shrink-0 ml-auto">
                                <TopMenuItem
                                    title={profileMenuText}
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