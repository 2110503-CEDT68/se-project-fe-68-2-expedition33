"use client";
import { useRef, type MouseEvent } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function CancelPaymentPanel({
  onClose,
  onConfirm,
  isProcessing,
}: Readonly<{
  onClose: () => void;
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
  isProcessing: boolean;
}>) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => !isProcessing && onClose());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div ref={modalRef} className="relative w-full max-w-md rounded-2xl border border-surface-border bg-surface p-5 text-center shadow-2xl sm:max-w-lg sm:p-8 md:px-10 md:py-8">
        <button
          onClick={onClose}
          disabled={isProcessing}
          title="Close panel"
          aria-label="Close panel"
          className="absolute right-3 top-3 cursor-pointer text-primary transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50 sm:right-4 sm:top-4 md:right-5 md:top-5"
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 015.5 5.5v.5" />
          </svg>
        </button>

        <h2
          id="cancel-payment-title"
          className="mb-3 mt-2 text-2xl font-bold tracking-wider text-button-red sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl md:tracking-widest"
        >
          Cancel Payment
        </h2>

        <div className="mb-6 text-foreground sm:mb-8 md:mb-10">
          <p className="text-sm text-foreground/70 sm:text-base md:text-lg">
            Do you want to cancel this payment?
          </p>
        </div>

        <div className="flex flex-col-reverse justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className={`w-full rounded-full bg-gray-200 px-6 py-2.5 text-base font-bold text-gray-700 transition-all duration-150 sm:w-auto sm:px-8 sm:text-lg md:px-10 md:py-3 md:text-xl
              ${isProcessing ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:-translate-y-0.5 hover:bg-gray-300 hover:shadow-lg"}`}
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`w-full rounded-full bg-button-red px-6 py-2.5 text-base font-bold text-white transition-all duration-150 sm:w-auto sm:px-8 sm:text-lg md:px-10 md:py-3 md:text-xl
              ${isProcessing ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:-translate-y-0.5 hover:bg-button-red-hover hover:shadow-lg"}`}
          >
            {isProcessing ? "Cancelling..." : "Cancel payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
