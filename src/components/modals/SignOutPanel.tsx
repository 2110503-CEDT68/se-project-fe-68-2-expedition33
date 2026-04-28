"use client";

import { useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function SignOutModal({ onClose }: Readonly<{ onClose: () => void }>) {
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    useClickOutside(modalRef, () => !loading && onClose());

    const handleSignOut = async () => {
        setLoading(true);
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div ref={modalRef} className="bg-background rounded-3xl shadow-2xl w-[90%] max-w-md p-10 relative flex flex-col items-center border border-surface-border">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={loading}
                    title="Close sign out panel"
                    className="absolute top-4 right-5 text-primary text-2xl hover:text-primary-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H6"></path>
                        <path d="M12 18l-6-6 6-6"></path>
                    </svg>
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-primary tracking-widest mb-4">
                    Sign Out
                </h2>

                {/* Message */}
                <p className="text-foreground/60 tracking-widest text-sm mb-6">
                    Do you want to sign out from your account?
                </p>

                {/* Sign-Out Button */}
                <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="bg-primary hover:bg-primary-hover disabled:bg-surface-border disabled:text-foreground/40 text-white font-bold px-12 py-3 rounded-xl transition-colors tracking-widest disabled:cursor-not-allowed"
                >
                    {loading ? "Signing out..." : "Sign-out"}
                </button>

            </div>
        </div>
    );
}