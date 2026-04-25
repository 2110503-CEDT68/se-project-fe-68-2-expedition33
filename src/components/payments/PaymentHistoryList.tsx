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
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="text-primary text-2xl">⏱</div>
        <h2 className="text-2xl font-bold text-foreground">Payment History</h2>
      </div>

      {renderContent()}
    </div>
  );
}
