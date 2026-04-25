export default function PaymentAction({
  onConfirm,
  onCancel,
  isDisabled,
}: Readonly<{
  onConfirm?: () => void,
  onCancel?: () => void,
  isDisabled?: boolean
}>) {
  return (
    <div className="bg-background rounded-2xl border border-surface-border px-8 py-4 flex flex-col items-center mx-auto" >
      <h2 className="text-base font-bold text-foreground mb-4 self-start">Payment Actions</h2>

      <div className="flex gap-3 justify-center">
        {/* Confirm — green outline pill */}
        <button
          onClick={onConfirm}
          disabled={isDisabled}
          className="border-2 border-button-green text-button-green hover:bg-button-green/10 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-2.5 px-6 rounded-full text-sm transition-colors flex items-center gap-2"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="var(--button-green)"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Confirm Payment
        </button>

        {/* Cancel — red outline pill */}
        <button
          onClick={onCancel}
          disabled={isDisabled}
          className="border-2 border-button-red text-button-red hover:bg-button-red/10 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-2.5 px-6 rounded-full text-sm transition-colors flex items-center gap-2"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="var(--button-red)"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
          </svg>
          Cancel Payment
        </button>
      </div>
    </div>
  );
}
