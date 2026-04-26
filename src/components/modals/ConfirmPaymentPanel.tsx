"use client";
import type { MouseEvent } from "react";

export default function ConfirmPaymentPanel({
  onClose,
  onConfirm,
  isProcessing,
}: Readonly<{
  onClose: () => void;
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
  isProcessing: boolean;
}>) {

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-payment-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-surface-border bg-surface p-5 text-center shadow-2xl sm:max-w-lg sm:p-8 md:px-10 md:py-8"
      >
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
          id="confirm-payment-title"
          className="mb-3 mt-2 text-2xl font-bold tracking-wider text-button-green sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl md:tracking-widest"
        >
          Confirm Payment
        </h2>

        <div className="mb-6 text-foreground sm:mb-8 md:mb-10">
          <p className="text-sm text-foreground/70 sm:text-base md:text-lg">
            Would you like to proceed with this payment?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`w-full rounded-full bg-button-green px-6 py-2.5 text-base font-bold text-white transition-all duration-150 sm:w-auto sm:px-8 sm:text-lg md:px-10 md:py-3 md:text-xl
              ${isProcessing ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:-translate-y-0.5 hover:bg-button-green-hover hover:shadow-lg"}`}
          >
            {isProcessing ? "Confirming..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
