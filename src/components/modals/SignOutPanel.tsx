"use client";

import { signOut } from "next-auth/react";

export default function SignOutModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-background rounded-3xl shadow-2xl w-[90%] max-w-md p-10 relative flex flex-col items-center border border-surface-border">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-primary text-2xl hover:text-primary-hover transition-colors"
                >
                    ↩
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
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-primary hover:bg-primary-hover text-white font-bold px-12 py-3 rounded-xl transition-colors tracking-widest"
                >
                    Sign-out
                </button>

            </div>
        </div>
    );
}