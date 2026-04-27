"use client";

import Image from "next/image";
import TopMenuItem from "@/components/TopMenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SignOutPanel from "@/components/modals/SignOutPanel";
import { useTheme } from "./ThemeProvider";

export default function TopMenu() {
    const { data: session } = useSession();
    const { resolvedTheme, toggleTheme } = useTheme();
    const [showSignOut, setShowSignOut] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <div className="bg-surface/90 backdrop-blur-md border-b border-surface-border fixed top-0 h-16 w-full z-50 shadow-sm transition-all">

                <div className="flex flex-row items-center justify-between w-full h-full px-4 md:px-10 gap-4">

                    <div className="flex items-center gap-4 md:gap-8 shrink-0">
                        <Link href="/" className="shrink-0 mr-2" onClick={() => setIsMenuOpen(false)}>
                            <Image
                                src={"/images/JobFairLogo.png"}
                                className="h-10 md:h-12.5 w-auto cursor-pointer rounded-xl"
                                alt="logo"
                                width={0}
                                height={0}
                                sizes="100vh"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2 md:gap-4">
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


                    <div className="flex items-center gap-2 md:gap-5 ml-auto">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 mr-1 rounded-xl bg-surface-border/20 hover:bg-surface-border/40 text-primary transition-all active:scale-95 flex items-center justify-center h-10 w-10 shrink-0"
                            title="Toggle Theme"
                        >
                            {resolvedTheme === "dark" ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="4" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                                </svg>
                            )}
                        </button>

                        {/* Desktop Session Info */}
                        <div className="hidden md:flex items-center">
                            {session ? (
                                <div className="flex items-center gap-4 md:gap-6 shrink-0">
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

                        {/* Hamburger Button (Mobile Only) */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-xl bg-surface-border/20 text-primary transition-all active:scale-95 flex items-center justify-center h-10 w-10 shrink-0"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div 
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            >
                <div 
                    className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-surface border-l border-surface-border shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full pt-20 px-6 pb-10">
                        <div className="flex flex-col gap-4 mb-auto">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-2 pl-2">Navigation</h3>
                            <TopMenuItem
                                title="Company"
                                pageRef="/companies"
                                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                                onClick={() => setIsMenuOpen(false)}
                            />
                            <TopMenuItem
                                title={bookingMenuText}
                                pageRef="/bookings"
                                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                onClick={() => setIsMenuOpen(false)}
                            />
                            {role === "company" && (
                                <TopMenuItem
                                    title="Payment"
                                    pageRef="/payments"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    onClick={() => setIsMenuOpen(false)}
                                />
                            )}
                        </div>

                        <div className="border-t border-surface-border pt-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4 pl-2">Account</h3>
                            {session ? (
                                <div className="space-y-6">
                                    <TopMenuItem
                                        title={profileMenuText}
                                        pageRef="/api/auth/profile"
                                        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setShowSignOut(true);
                                        }}
                                        className="w-full bg-primary hover:bg-primary-hover text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
                                    >
                                        Sign-Out of {session.user?.name}
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/api/auth/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full bg-primary hover:bg-primary-hover text-white px-6 py-4 rounded-2xl font-bold text-sm text-center shadow-lg shadow-primary/20 transition-all active:scale-95"
                                >
                                    Sign-In
                                </Link>
                            )}
                        </div>
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