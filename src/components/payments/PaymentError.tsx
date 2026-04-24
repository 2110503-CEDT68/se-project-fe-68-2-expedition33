interface TransactionErrorProps {
  errorType: 'CANCELLED' | 'FAILED';
  message?: string;
  visible?: boolean;
}

export default function PaymentError({ errorType, message, visible = true }: Readonly<TransactionErrorProps>) {
  return (
    <div className="bg-background rounded-2xl border border-surface-border px-6 py-5 flex flex-col justify-start">
      {/* Title row — top-left */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full border-2 border-button-red flex items-center justify-center shrink-0">
          <span className="text-button-red font-bold text-base leading-none">!</span>
        </div>
        <p className="text-base font-bold text-foreground">Your payment could not be completed.</p>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/40 text-center leading-relaxed">
        {message || (
          <>
            An error message will appear here if the payment fails.
            <br />
            Cancellation details will be shown here.
          </>
        )}
      </p>
    </div>
  );
}
