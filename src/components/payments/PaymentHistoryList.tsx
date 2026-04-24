'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PaymentItem } from '@/../interfaces';

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
          <Link key={payment.id} href={`/payments/${payment.id}`}>
            <div className="w-full flex items-center gap-4 p-4 rounded-lg transition-all border-2 bg-background border-surface-border shadow-sm hover:border-primary cursor-pointer hover:shadow-lg">

              {/* Company Logo */}
              <div className="w-20 h-20 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {payment.company.logo?.url ? (
                  <Image
                    src={payment.company.logo.url}
                    alt={`${payment.company.name} Logo`}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-foreground/40">No Logo</span>
                )}
              </div>

              {/* Company Details */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-foreground text-lg">
                    {payment.company.name}
                  </h3>
                </div>
                <p className="text-foreground text-sm mb-1">
                  Total Amount: <span className="font-semibold">{payment.totalPrice}</span>
                </p>
                <p className="text-foreground/50 text-xs mb-3">
                  Latest update: {new Date(payment.updatedAt).toLocaleString('en-GB')}
                </p>

                <div className="flex gap-2 items-center">
                  <span className="text-foreground text-xs font-semibold">Reserved:</span>
                  {payment.dateList.map((date) => (
                    <div
                      key={`${date}`}
                      className="w-4 h-4 rounded-full bg-primary"
                      title={`${date}`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-1 h-24 rounded-r-lg flex-shrink-0 bg-primary" />
            </div>
          </Link>
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
};
