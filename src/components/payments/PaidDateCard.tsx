'use client';

import type { DateStatus } from '@/components/payments/PaymentDashboard';

const ALL_DATES = [
  { key: '2022-05-10', date: 10, month: 'May' },
  { key: '2022-05-11', date: 11, month: 'May' },
  { key: '2022-05-12', date: 12, month: 'May' },
  { key: '2022-05-13', date: 13, month: 'May' },
];

function getDateStyle(status: DateStatus): string {
  if (status === "paid") return "bg-button-green text-white";
  if (status === "pending") return "bg-primary text-white";
  return "bg-foreground/20 text-foreground/60";
}

function getDateLabel(status: DateStatus): string | null {
  if (status === "paid") return "✓ Paid";
  if (status === "pending") return "⏳ Pending";
  return null;
}

export default function PaidDateCard({
  dateStatusMap,
  onPurchaseClick,
}: Readonly<{
  dateStatusMap: Record<string, DateStatus>;
  onPurchaseClick?: () => void;
}>) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Date Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {ALL_DATES.map((item) => {
          const status = dateStatusMap[item.key] || "free";
          const label = getDateLabel(status);

          return (
            <div
              key={item.key}
              className={`py-8 px-6 rounded-2xl font-semibold text-center transition-all ${getDateStyle(status)}`}
            >
              <div className="text-2xl font-bold">{item.date}</div>
              <div className="text-sm">{item.month}</div>
              {label && (
                <div className="text-xs mt-2 opacity-80">{label}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Description Text */}
      <p className="text-center text-foreground/60 text-sm mb-6">
        Purchase for additional organizing job fair interviews dates
      </p>

      {/* Purchase Button */}
      <div className="text-center">
        <button
          onClick={onPurchaseClick}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-8 rounded-full transition-colors"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
