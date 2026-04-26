import Link from 'next/link';
import Image from 'next/image';
import type { PaymentItem } from '@/../interfaces';

const STATUS_COLORS: Record<string, string> = {
  initiated: "bg-status-initiated",
  authorized: "bg-status-authorized",
  captured: "bg-status-success",
  cancelled: "bg-status-failed",
  failed: "bg-status-failed",
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
    <Link href={`/payments/${payment.id}`} className="block relative">
      <div className="w-full flex items-center gap-4 p-4 pr-6 rounded-xl border border-surface-border bg-background shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition-all overflow-hidden relative cursor-pointer group">

        {/* Company Logo */}
        <div className="w-24 h-24 bg-surface rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
          {payment.company.logo?.url ? (
            <Image
              src={payment.company.logo.url}
              alt={`${payment.company.name} Logo`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-foreground/70">Logo</span>
              <span className="text-[10px] font-bold text-foreground/70">{payment.company.name}</span>
            </div>
          )}
        </div>

        {/* Company Details */}
        <div className="flex-1 text-left min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
              {payment.company.name}
            </h3>
            
            {/* Dots moved here beside the title */}
            <div className="flex gap-1.5 items-center ml-2">
              {ALL_DATE_KEYS.map((dateKey) => {
                const isIncluded = dateSet.has(dateKey);
                
                const baseColor = STATUS_COLORS[payment.status] || "bg-primary";
                const circleColor = isIncluded ? baseColor : `${baseColor} opacity-30`;

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
          
          <p className="text-foreground/80 text-sm mb-1.5">
            Total Amount: <span className="font-bold">{payment.totalPrice}B</span>
          </p>
          <p className="text-foreground/50 text-xs">
            Latest update: {new Date(payment.updatedAt).toLocaleString('en-GB')}
          </p>
        </div>

        {/* Status color indicator */}
        <div className={`w-3 h-full absolute right-0 top-0 bottom-0 ${statusColor}`} />
      </div>
    </Link>
  );
}
