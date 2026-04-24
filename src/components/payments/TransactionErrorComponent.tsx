interface TransactionErrorProps {
  errorType: 'CANCELLED' | 'FAILED';
  message?: string;
}

export default function TransactionErrorComponent({
  errorType,
  message,
}: Readonly<TransactionErrorProps>) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-button-red">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-button-red/20 rounded-full flex items-center justify-center shrink-0">
          <span className="text-button-red text-2xl font-bold">!</span>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black mb-4">
            The transaction was unsuccessful.
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <span className="text-gray-400 text-xl">●</span>
              <p className="text-black font-semibold">PAYMENT_CANCELLED</p>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
              <span className="text-gray-400 text-xl">●</span>
              <p className="text-black font-semibold">PAYMENT_FAILED</p>
            </div>
          </div>

          {message && (
            <p className="text-gray-600 text-sm mt-4">{message}</p>
          )}
        </div>

        {/* Illustration placeholder */}
        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-4xl">👤</span>
        </div>
      </div>
    </div>
  );
}
