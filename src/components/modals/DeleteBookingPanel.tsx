"use client";
import { BookingItem } from "../../../interfaces";

export default function DeleteBookingPanel({ booking, onClose, onDelete }: { booking: BookingItem, onClose: () => void, onDelete: (e: React.MouseEvent) => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        
            <div className="bg-surface border border-surface-border rounded-[2.5rem] p-10 md:p-16 max-w-lg w-full relative flex flex-col items-center shadow-2xl text-center">
                
                <button 
                onClick={onClose} 
                className="absolute top-8 right-8 text-primary hover:opacity-70 transition-opacity cursor-pointer"
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
                    Do you want to Cancel a Booking of {" "}
                    <span className="text-primary">{booking.user.name || "Unknown User"}</span>
                    {" with"} <br className="hidden md:block"/>
                    <span className="text-primary">{booking.company.name || "Unknown Company"}</span>
                    {" on "}
                    <span className="text-primary">{booking.bookingDate.split("-")[2].split("T")[0]} May, 2022</span>
                    ?
                </p>

                <button 
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-16 py-4 rounded-full font-bold text-xl tracking-widest shadow-[0_8px_15px_rgba(239,68,68,0.25)] hover:shadow-[0_15px_20px_rgba(239,68,68,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                    Cancel  
                </button>

                <button 
                onClick={onClose} 
                className="mt-6 text-sm font-bold text-foreground/50 hover:text-foreground transition-colors tracking-widest cursor-pointer"
                >
                    I changed my mind
                </button>

            </div>
        </div>
    );
}