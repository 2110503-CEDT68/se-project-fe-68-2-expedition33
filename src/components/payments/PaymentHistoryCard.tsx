import Link from 'next/link';
import Image from 'next/image';
import type { PaymentItem } from '@/../interfaces';

// สีเข้ม (-500) สำหรับแถบข้าง และจุดวันที่ที่เลือก
const STATUS_COLORS: Record<string, string> = {
  initiated: "bg-[#FDAE00]", // yellow-500
  authorized: "bg-[#0EA5E9]", // sky-500
  captured: "bg-[#5ED200]", // success green-500
  cancelled: "bg-[#FF0028]", // cancelled red-500
  failed: "bg-[#FF0028]", // failed red-500
};

// สีอ่อน (-100) สำหรับจุดวันที่ที่ไม่ได้ถูกเลือก
const STATUS_COLORS_LIGHT: Record<string, string> = {
  initiated: "bg-[#FFF074]", // yellow-100
  authorized: "bg-[#ADE8FF]", // sky-100
  captured: "bg-[#A6FACC]", // success green-100
  cancelled: "bg-[#FFC7C9]", // cancelled red-100
  failed: "bg-[#FFC7C9]", // failed red-100
};

const ALL_DATE_KEYS = [
  "2022-05-10",
  "2022-05-11",
  "2022-05-12",
  "2022-05-13",
];

export default function PaymentHistoryCard({ payment }: Readonly<{ payment: PaymentItem }>) {
  const statusColor = STATUS_COLORS[payment.status] || "bg-[#C4C4C4]";
  const lightStatusColor = STATUS_COLORS_LIGHT[payment.status] || "bg-[#E5E7EB]";
  const dateSet = new Set(payment.dateList.map((d) => d.substring(0, 10)));

  return (
    <Link href={`/payments/${payment.id}`} className="block relative mb-4">
      <div className="w-full flex items-center gap-4 p-4 pr-6 rounded-xl border border-surface-border bg-background shadow-sm hover:shadow-md transition-all overflow-hidden relative cursor-pointer group">

        {/* Company Logo */}
        <div className="w-24 h-24 bg-[#E5E7EB] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
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
            
            {/* Status Dots */}
            <div className="flex gap-1.5 items-center ml-1">
              {ALL_DATE_KEYS.map((dateKey) => {
                const isIncluded = dateSet.has(dateKey);
                const circleColor = isIncluded ? statusColor : lightStatusColor;

                return (
                  <div
                    key={dateKey}
                    className={`w-3.5 h-3.5 rounded-full ${circleColor}`}
                    title={`${dateKey}${isIncluded ? " (Included)" : ""}`}
                  />
                );
              })}
            </div>
          </div>
          
          <p className="text-foreground/80 text-sm mb-1.5">
            Total Amount: <span className="font-bold">{payment.totalPrice}฿</span>
          </p>
          <p className="text-foreground/50 text-xs">
            Latest update: {new Date(payment.updatedAt).toLocaleString('en-GB', { 
              day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }).replace(',', '')}
          </p>
        </div>

        {/* Right Edge Status color indicator */}
        <div className={`w-4 h-full absolute right-0 top-0 bottom-0 ${statusColor}`} />
      </div>
    </Link>
  );
}