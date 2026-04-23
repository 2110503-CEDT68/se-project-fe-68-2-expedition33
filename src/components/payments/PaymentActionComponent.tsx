interface PaymentActionProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  isDisabled?: boolean;
}

export default function PaymentActionComponent({
  onConfirm,
  onCancel,
  isDisabled,
}: Readonly<PaymentActionProps>) {
  return (
    <div className="bg-surface border border-surface-border rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>💳</span> Payment Actions
      </h2>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            disabled={isDisabled}
            className="flex-1 border-2 border-button-green text-button-green hover:bg-button-green/10 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>✓</span> Confirm Payment
          </button>

          <button
            onClick={onCancel}
            disabled={isDisabled}
            className="flex-1 border-2 border-button-red text-button-red hover:bg-button-red/10 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>✕</span> Cancel Payment
          </button>
        </div>

        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
          <p className="text-primary-hover text-sm flex items-center gap-2">
            <span>ℹ</span> Cancel can only do in AUTHORIZED stage
          </p>
        </div>
      </div>
    </div>
  );
}
