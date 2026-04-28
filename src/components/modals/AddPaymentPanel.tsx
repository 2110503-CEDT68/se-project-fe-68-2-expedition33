'use client';

import React from 'react';
import Image from 'next/image';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useSession } from 'next-auth/react';
import type { DateStatus } from '@/components/payments/PaymentDashboard';

const ALL_DATES = [
  { key: '2022-05-10', date: 10 },
  { key: '2022-05-11', date: 11 },
  { key: '2022-05-12', date: 12 },
  { key: '2022-05-13', date: 13 },
];

function getButtonStyle(status: DateStatus, isSelected: boolean): string {
  if (status === "paid") {
    return "bg-status-success/15 text-status-success border-2 border-status-success/30 cursor-not-allowed opacity-80";
  }
  if (status === "pending") {
    return "bg-status-authorized/15 text-status-authorized border-2 border-status-authorized/30 cursor-not-allowed opacity-80";
  }
  if (isSelected) {
    return "bg-primary text-white scale-105 ring-4 ring-primary/30 shadow-lg border border-transparent";
  }
  return "bg-primary/5 text-foreground/50 border border-primary/10 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md cursor-pointer";
}

function getStatusBadge(status: DateStatus): React.ReactNode {
  if (status === "paid") {
    return <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 text-status-success">Paid</span>;
  }
  if (status === "pending") {
    return <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 text-status-authorized">Pending</span>;
  }
  return <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1">May</span>;
}

export default function AddDateListModal({
  isOpen,
  onClose,
  onPurchase,
  dateStatusMap
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: (selectedDates: number[]) => Promise<void> | void;
  dateStatusMap: Record<string, DateStatus>;
}>) {

  const { data: session } = useSession();
  const company = session?.user?.companyData;

  const modalRef = React.useRef<HTMLDivElement>(null);
  const [selectedDates, setSelectedDates] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(false);

  useClickOutside(modalRef, () => !loading && onClose());

  const handleToggleDate = (index: number) => {
    setSelectedDates((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePurchase = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      await onPurchase?.(selectedDates);
    } catch (error) {
      console.error("Failed to process purchase:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div ref={modalRef} className="bg-surface border border-surface-border rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full relative flex flex-col items-center shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          title="Close payment panel"
          className="absolute top-8 right-8 text-primary hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 015.5 5.5v.5" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest mb-2 mt-4 text-center uppercase">
          Add Date List
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-primary tracking-widest mb-10 text-center">
          {company?.name || "Company"}
        </h3>

        {/* Date Options Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          {ALL_DATES.map((item, index) => {
            const status = dateStatusMap[item.key] || "free";
            const isBlocked = status !== "free";
            const isSelected = selectedDates.includes(index);
            const buttonClass = getButtonStyle(status, isSelected);
            const badge = getStatusBadge(status);

            return (
              <button
                key={item.key}
                onClick={() => !isBlocked && handleToggleDate(index)}
                disabled={isBlocked}
                className={`flex flex-col items-center justify-center w-20 h-24 md:w-24 md:h-28 rounded-2xl transition-all duration-300 ${buttonClass}`}
              >
                <span className="text-3xl md:text-4xl font-bold">{item.date}</span>
                {badge}
              </button>
            );
          })}
        </div>

        {/* Info Text */}
        <p className="text-foreground font-bold text-xs md:text-sm tracking-widest mb-2 text-center">
          Purchase additional organizing job fair interview dates.
        </p>
        <p className="text-primary font-bold text-xs md:text-sm tracking-widest mb-6 text-center">
          Additional Dates 300 Baht per day
        </p>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-5xl md:text-6xl font-extrabold text-primary tracking-widest">
            {selectedDates.length * 300} ฿
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={selectedDates.length === 0 || loading}
          className={`px-16 py-3 rounded-full font-bold text-xl tracking-widest transition-all duration-300 mb-2
            ${(selectedDates.length === 0 || loading)
                ? 'bg-surface-border text-foreground/40 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-hover text-white shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer'
            }
          `}
        >
          {loading ? "Pending..." : "Purchase"}
        </button>

        {/* Illustration */}
        <div className="relative w-24 h-32 md:w-32 md:h-40 -mb-8 md:-mb-12 mt-4 pointer-events-none">
          <Image 
            src="/images/resume.svg" 
            alt="Payment Illustration" 
            fill 
            className="object-contain opacity-80" 
          />
        </div>
      </div>
    </div>
  );
}