"use client";
import { useState } from "react";
import AddBookingPanel from "@/components/modals/AddBookingPanel";
import { CompanyItem } from "../../interfaces";

export default function BookButton({
    company,
    token,
    isAdmin,
}: {
    company: CompanyItem, 
    token: string, 
    isAdmin: boolean
}) {
    const [isBooking, setIsBooking] = useState(false);
        
    return (
        <>
            {/* Book Trigger Button */}
            <button
                onClick={() => setIsBooking(true)}
                className="bg-primary hover:bg-primary-hover text-white font-bold px-16 py-3 rounded-xl transition-colors"
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