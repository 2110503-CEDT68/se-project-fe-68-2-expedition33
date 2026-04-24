"use client";
import { useState } from "react";
import AddBookingPanel from "@/components/modals/AddBookingPanel";
import { CompanyItem } from "@/../interfaces";

export default function BookButton({
    company,
    token,
    isAdmin,
}: Readonly<{
    company: CompanyItem, 
    token: string, 
    isAdmin: boolean
}>) {
    const [isBooking, setIsBooking] = useState(false);
        
    return (
        <>
            {/* Book Trigger Button */}
            <button
                onClick={() => setIsBooking(true)}
                className="bg-primary hover:bg-primary-hover text-white px-22 py-3 rounded-full font-semibold transition-all active:scale-95 duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-lg"
            >
                Book
            </button>

            {/* Modal Overlay */}
            {isBooking && (
                <AddBookingPanel
                    company={company}
                    token={token}
                    onClose={() => setIsBooking(false)}
                    isAdmin={isAdmin}
                />
            )}
        </>
    );
}