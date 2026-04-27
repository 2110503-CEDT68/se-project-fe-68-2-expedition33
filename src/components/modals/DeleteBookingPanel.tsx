"use client";
import { useRef, useState, type MouseEvent } from "react";
import { BookingItem } from "@/../interfaces";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function DeleteBookingPanel({ booking, onClose, onDelete }: Readonly<{ booking: BookingItem, onClose: () => void, onDelete: (e: MouseEvent<HTMLButtonElement>) => Promise<void> | void }>) {
    const [isDeleting, setIsDeleting] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    useClickOutside(modalRef, () => !isDeleting && onClose());

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        setIsDeleting(true);
        try {
            await onDelete(e);
        } catch (error) {
            console.error("Failed to delete booking:", error);
            setIsDeleting(false);
        }
    };

    const bookingDate = new Date(booking.bookingDate);
    const formattedDate = Number.isNaN(bookingDate.getTime())
        ? "Unknown date"
        : bookingDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        
            <div ref={modalRef} className="bg-surface border border-surface-border rounded-[2.5rem] p-10 md:p-16 max-w-lg w-full relative flex flex-col items-center shadow-2xl text-center">
                
                <button 
                onClick={onClose} 
                disabled={isDeleting}
                title="Close delete panel"
                className="absolute top-8 right-8 text-primary hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 14L4 9l5-5" />
                        <path d="M4 9h10.5a5.5 5.5 0 015.5 5.5v.5" />
                    </svg>
                </button>

                <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-widest mb-6 mt-2">
                    Cancel
                </h2>

                <p className="text-foreground font-bold text-lg md:text-xl tracking-wide mb-10 leading-relaxed">
                    Do you want to Cancel a Booking of{" "}
                    <span className="text-primary">{booking.user.name || "Unknown User"}</span>
                    {" with "}
                    <br className="hidden md:block" />
                    <span className="text-primary">{booking.company.name || "Unknown Company"}</span>
                    {" on "}
                    <span className="text-primary">{formattedDate}</span>
                    {"?"}
                </p>

                <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 disabled:bg-surface-border disabled:text-foreground/40 text-white px-16 py-4 rounded-full font-bold text-xl tracking-widest shadow-[0_8px_15px_rgba(239,68,68,0.25)] hover:shadow-[0_15px_20px_rgba(239,68,68,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isDeleting ? "Cancelling..." : "Cancel"}
                </button>

                <button 
                onClick={onClose} 
                disabled={isDeleting}
                className="mt-6 text-sm font-bold text-foreground/50 hover:text-foreground disabled:text-foreground/20 transition-colors tracking-widest cursor-pointer disabled:cursor-not-allowed"
                >
                    I changed my mind
                </button>

            </div>
        </div>
    );
}