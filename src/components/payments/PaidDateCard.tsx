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
  if (status === "pending") return "bg-[#00A3FF] text-white";
  return "bg-[#C4C4C4] text-white";
}

function getDateLabel(status: DateStatus) {
  if (status === "paid") return (
    <span className="flex items-center justify-center gap-1 text-[14px] ">
      Paid
    </span>
  );
  if (status === "pending") return (
    <span className="flex items-center justify-center gap-1 text-[14px]">
      Pending
    </span>
  );
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
              <div className="text-3xl font-bold mb-1 tracking-widest">{item.date}</div>
              <div className="text-sm font-bold text-foreground text-[16px] tracking-widest">{item.month}</div>
              {label && (
                <div className="text-sm mt-2 opacity-80 tracking-widest">{label}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Description Text */}
      <p className="text-center text-foreground font-bold text-[12px] mb-4 tracking-wide">
        Purchase for additional organizing job fair interviews dates
      </p>

      {/* Purchase Button */}
      <div className="text-center">
        <button
          onClick={onPurchaseClick}
          className="bg-primary hover:bg-primary-hover shadow-md text-white font-bold py-1.5 px-6 rounded-full transition-all hover:scale-105"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
