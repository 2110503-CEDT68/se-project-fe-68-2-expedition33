export default function PaymentErrorNotice({ 
  message, 
}: Readonly<{
  message?: string,
}>) {
  return (
    <div className="bg-background rounded-2xl border border-surface-border px-6 py-5 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-button-red/10 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-button-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-foreground leading-tight">
          Your payment could not be completed.
        </h2>
      </div>

      {/* Error Message Body */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-md font-medium text-foreground/60 text-center leading-relaxed max-w-sm mx-auto">
          {message ? (
            <p>{message}</p>
          ) : (
            <p>
              An error message will appear here if the payment fails.<br/>
              Cancellation details will be shown here.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
