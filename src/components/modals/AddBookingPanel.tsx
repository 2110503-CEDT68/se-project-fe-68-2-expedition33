"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createBooking from "@/libs/createBooking";
import { CompanyItem } from "../../../interfaces";
import { useAppSelector } from "@/redux/store";

export default function AddBookingPanel({ company, token, onClose, isAdmin }: {
    company: CompanyItem,
    token: string,
    onClose: () => void, 
    isAdmin: boolean
}) {

  const router = useRouter();

  const currentBookingCount = useAppSelector(state => state.bookings.bookingItems.length);

  const [selectedDate, setSelectedDate] = useState<string>("10");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  

  const dates: string[] = ["10", "11", "12", "13"];
  const isLimitReached = currentBookingCount >= 3 && !isAdmin;

  const handleBookingSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isLimitReached) return;

    setIsSubmitting(true);
    
    try {
        await createBooking(company.id, token, "2022-05-" + selectedDate);
        onClose();
        router.push("/bookings");
    } catch (error) {
        console.error("Failed to submit booking", error);
        setIsSubmitting(false);
    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-surface border border-surface-border rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full relative flex flex-col items-center shadow-2xl">
        
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-primary hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 015.5 5.5v.5" />
          </svg>
        </button>

        <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-widest mb-2 mt-4">
          Booking
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-primary tracking-widest mb-10">
          {company.name}
        </h3>

        <div className="flex gap-4 md:gap-6 mb-8">
          {dates.map((day: string) => (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col items-center justify-center w-20 h-24 md:w-24 md:h-28 rounded-2xl transition-all duration-300 cursor-pointer
                ${selectedDate === day 
                  ? 'bg-primary text-white scale-105 ring-4 ring-primary/30 shadow-lg' 
                  : 'bg-primary/5 text-foreground/50 border border-primary/10 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md'
                }`}
            >
              <span className="text-3xl md:text-4xl font-bold">{day}</span>
              <span className="text-sm md:text-base font-bold tracking-widest uppercase mt-1">May</span>
            </button>
          ))}
        </div>

        <p className="text-foreground font-bold text-xs md:text-sm tracking-widest uppercase mb-8 text-center">
          Select your preferred interview date (May 10–13, 2022)
        </p>

        {/* Dynamic Submit Button */}
        <button 
          onClick={handleBookingSubmit}
          disabled={isLimitReached || isSubmitting}
          className={`px-16 py-3 rounded-full font-bold text-xl tracking-widest transition-all duration-300 mb-2
            ${isLimitReached 
                ? 'bg-surface-border text-foreground/40 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-hover text-white shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer'
            }
          `}
        >
          {isSubmitting ? 'Booking...' : 'Book'}
        </button>

        {/* Dynamic Feedback Text */}
        <div className="h-8 mb-4 flex items-center justify-center text-center">
            {isLimitReached ? (
                <p className="text-red-500 font-bold text-sm tracking-widest">
                    You have reached the maximum limit of 3 bookings.
                </p>
            ) : (
                <p className="text-foreground/80 text-xs font-bold tracking-widest">
                    Your booking can be edited or deleted at a later time.
                </p>
            )}
        </div>

        <div className="relative w-24 h-32 md:w-32 md:h-40 -mb-8 md:-mb-12 pointer-events-none">
          <Image 
            src="/images/resume.svg" 
            alt="Woman with clipboard" 
            fill 
            className="object-contain" 
          />
        </div>

      </div>
    </div>
  );
}