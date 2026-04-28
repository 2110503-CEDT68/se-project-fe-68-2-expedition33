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

    // Check if company has any available interview dates
    const dates = ["10", "11", "12", "13"];
    const hasAvailableDates = dates.some(day =>
        company.payments?.some(p =>
            p.status === "captured" && p.dateList.some(d => d.substring(8, 10) === day)
        )
    );

    return (
        <>
            {/* Book Trigger Button */}
            <button
                onClick={() => hasAvailableDates && setIsBooking(true)}
                disabled={!hasAvailableDates}
                className={`px-22 py-3 rounded-full font-semibold transition-all duration-300 ${hasAvailableDates
                        ? "bg-primary hover:bg-primary-hover text-white active:scale-95 hover:-translate-y-1 cursor-pointer hover:shadow-lg"
                        : "bg-surface-border text-foreground/40 cursor-not-allowed"
                    }`}
            >
                {hasAvailableDates ? "Book" : "No Dates Available"}
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