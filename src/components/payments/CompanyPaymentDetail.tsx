import { PaymentItem } from "@/../interfaces";
import Image from "next/image";

export default function CompanyPaymentDetail({ payment }: Readonly<{ payment: PaymentItem }>) {
  const statusStyles: Record<string, string> = {
    captured:   "bg-green-100 text-green-600",
    authorized: "bg-blue-100 text-blue-600",
    pending:    "bg-yellow-100 text-yellow-700",
    initiated:  "bg-gray-100 text-gray-500",
    cancelled:  "bg-red-100 text-button-red",
    failed:     "bg-red-100 text-button-red",
  };

  const statusMessages: Record<string, string> = {
    captured: 'Payment confirmed',
    authorized: 'Payment authorized',
    pending: 'Waiting for payment',
    initiated: 'Payment initiated',
    cancelled: 'Payment cancelled',
    failed: 'Payment failed'
  };

  const borderStyles: Record<string, string> = {
    captured:   "border-green-600",
    authorized: "border-blue-600",
    pending:    "border-yellow-700",
    initiated:  "border-gray-500",
    cancelled:  "border-button-red",
    failed:     "border-button-red",
  };

  const statusClass = statusStyles[payment.status.toLowerCase()] ?? "bg-surface text-foreground";
  const borderClass = borderStyles[payment.status.toLowerCase()] ?? "border-surface-border";

  const statusMsg =
    statusMessages[payment.status.toLowerCase()] ?? 'Status updated';

  const formattedDate = payment.updatedAt 
    ? new Date(payment.updatedAt).toLocaleString("en-GB", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) 
    : '';

  return (
    <div className={`bg-background rounded-2xl border-2 ${borderClass} px-6 py-5 mb-4`}>
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0">

        {/* Company Logo + Info */}
        <div className="flex items-center gap-5 md:pr-8 md:flex-[2.2]">
          <div className="w-19 h-19 bg-primary-light rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
            {payment.company.logo?.url ? (
              <Image 
                src={payment.company.logo.url} 
                alt={`${payment.company.name} logo`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80px"
              />
            ) : (
              <svg width="40" height="40" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="19" rx="2" />
                <path d="M9 3v18M15 3v18M2 9h20M2 15h20" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-foreground/50 text-sm mb-1">Company</p>
            <h3 className="text-lg font-bold text-foreground mb-1">{payment.company.name || 'Unknown Company'}</h3>
          </div>
        </div>

        {/* Divider (Desktop Only) */}
        <div className="hidden md:block w-px bg-surface-border self-stretch" />
        {/* Divider (Mobile Only) */}
        <div className="md:hidden h-px bg-surface-border w-full opacity-50" />

        {/* Total Price */}
        <div className="flex flex-col justify-center md:px-8 md:flex-1">
          <p className="text-foreground/50 text-sm mb-1.5">Total Price</p>
          <p className="text-2xl font-bold text-primary leading-tight mb-1">
            {payment.totalPrice.toLocaleString("en-GB") || '0'}
          </p>
          <p className="text-foreground/40 text-sm">THB</p>
        </div>

        {/* Divider (Desktop Only) */}
        <div className="hidden md:block w-px bg-surface-border self-stretch" />
        {/* Divider (Mobile Only) */}
        <div className="md:hidden h-px bg-surface-border w-full opacity-50" />

        {/* Status */}
        <div className="flex flex-col justify-center md:px-8 md:flex-[1.8]">
          <p className="text-foreground/50 text-sm mb-1.5">Status</p>
          <div className="mb-1.5">
            <span
              className={`inline-flex items-center text-sm font-semibold px-3 py-0.5 rounded-md capitalize ${statusClass}`}
            >
              {payment.status}
            </span>
          </div>
          <p className="text-foreground/40 text-sm">{statusMsg}</p>
        </div>

        {/* Divider (Desktop Only) */}
        <div className="hidden md:block w-px bg-surface-border self-stretch" />
        {/* Divider (Mobile Only) */}
        <div className="md:hidden h-px bg-surface-border w-full opacity-50" />

        {/* Payment ID */}
        <div className="flex flex-col justify-center md:pl-8 md:flex-[1.8]">
          <p className="text-foreground/50 text-sm mb-1.5">Payment ID</p>
          <p className="text-base font-bold text-foreground mb-1 break-all">{payment.id}</p>
          <p className="text-foreground/40 text-sm">Created: {formattedDate}</p>
        </div>

      </div>
    </div>
  );
}
