import Link from 'next/link';
import Image from 'next/image';
import type { PaymentItem } from '@/../interfaces';

const STATUS_COLORS: Record<string, string> = {
  captured: "bg-button-green",
  cancelled: "bg-button-red",
  failed: "bg-button-red",
  authorized: "bg-blue-500",
};

const ALL_DATE_KEYS = [
  "2022-05-10",
  "2022-05-11",
  "2022-05-12",
  "2022-05-13",
];

export default function PaymentHistoryCard({ payment }: Readonly<{ payment: PaymentItem }>) {
  const statusColor = STATUS_COLORS[payment.status] || "bg-foreground/30";
  const dateSet = new Set(payment.dateList.map((d) => d.substring(0, 10)));

  return (
    <Link href={`/payments/${payment.id}`}>
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
            {ALL_DATE_KEYS.map((dateKey) => {
              const isIncluded = dateSet.has(dateKey);
              
              let circleColor = "bg-primary opacity-20"; // Not referred (faint orange)
              if (isIncluded) {
                if (payment.status === "captured") circleColor = "bg-button-green"; // Success
                else if (payment.status === "cancelled" || payment.status === "failed") circleColor = "bg-button-red"; // Failed
                else circleColor = "bg-primary"; // Pending / Initiated / Authorized (Orange)
              }

              return (
                <div
                  key={dateKey}
                  className={`w-4 h-4 rounded-full ${circleColor}`}
                  title={`${dateKey}${isIncluded ? " (Included)" : ""}`}
                />
              );
            })}
          </div>
        </div>

        {/* Status color indicator */}
        <div className={`w-1.5 h-24 rounded-r-lg flex-shrink-0 ${statusColor}`} />
      </div>
    </Link>
  );
}
