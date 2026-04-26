'use client';

import type { PaymentItem } from '@/../interfaces';
import PaymentHistoryCard from '@/components/payments/PaymentHistoryCard';

export default function PaymentHistoryList({ payments }: Readonly<{ payments: PaymentItem[] }>) {

  const renderContent = () => {
    if (payments.length === 0) {
      return (
        <div className="text-center text-foreground/50 py-10">
          No Payments
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {payments.map((payment) => (
          <PaymentHistoryCard key={payment.id} payment={payment} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mb-15">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
          <path d="M12 7v5l4 2"/>
        </svg>
        <h2 className="text-2xl font-bold text-foreground">Payment History</h2>
      </div>

      {renderContent()}
    </div>
  );
}
