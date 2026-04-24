interface CompanyData {
  companyName: string;
  companyId: string;
  totalPrice: string;
  status: string;
  paymentId: string;
  createdAt: string;
}

interface CompanyDataProps {
  data: CompanyData;
}

export default function CompanyDataComponent({ data }: CompanyDataProps) {
  const statusStyles: Record<string, { bg: string; text: string }> = {
    captured:   { bg: '#dcfce7', text: '#16a34a' },
    authorized: { bg: '#dbeafe', text: '#2563eb' },
    pending:    { bg: '#fef9c3', text: '#a16207' },
    initiated:  { bg: '#f3f4f6', text: '#6b7280' },
    cancelled:  { bg: '#fee2e2', text: 'var(--button-red)' },
    failed:     { bg: '#fee2e2', text: 'var(--button-red)' },
  };

  const statusStyle = statusStyles[data.status?.toLowerCase()] ?? { bg: 'var(--surface)', text: 'var(--foreground)' };

  const statusMessage: Record<string, string> = {
    captured:   'Payment completed successfully',
    authorized: 'Payment is authorized',
    pending:    'Payment is pending',
    initiated:  'Status updated',
    cancelled:  'Payment was cancelled',
    failed:     'Payment has failed',
  };

  const statusMsg =
    statusMessage[data.status?.toLowerCase()] ?? 'Status updated';

  return (
    <div className="bg-background rounded-2xl border border-surface-border px-6 py-5 mb-4">
      <div className="flex items-stretch">

        {/* Company Logo + Info */}
        <div className="flex items-center gap-5 pr-8 flex-[2.2]">
          <div className="w-[76px] h-[76px] bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="40" height="40" fill="none" stroke="var(--primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="19" rx="2" />
              <path d="M9 3v18M15 3v18M2 9h20M2 15h20" />
            </svg>
          </div>
          <div>
            <p className="text-foreground/50 text-sm mb-1">Company</p>
            <h3 className="text-lg font-bold text-foreground mb-1">{data.companyName}</h3>
            <p className="text-foreground/40 text-sm">Company ID: {data.companyId}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-surface-border self-stretch" />

        {/* Total Price */}
        <div className="flex flex-col justify-center px-8 flex-1">
          <p className="text-foreground/50 text-sm mb-1.5">Total Price</p>
          <p className="text-2xl font-bold text-primary leading-tight mb-1">{data.totalPrice}</p>
          <p className="text-foreground/40 text-sm">THB</p>
        </div>

        {/* Divider */}
        <div className="w-px bg-surface-border self-stretch" />

        {/* Status */}
        <div className="flex flex-col justify-center px-8 flex-[1.8]">
          <p className="text-foreground/50 text-sm mb-1.5">Status</p>
          <div className="mb-1.5">
            <span
              className="inline-flex items-center text-sm font-semibold px-3 py-0.5 rounded-md"
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
            >
              {data.status}
            </span>
          </div>
          <p className="text-foreground/40 text-sm">{statusMsg}</p>
        </div>

        {/* Divider */}
        <div className="w-px bg-surface-border self-stretch" />

        {/* Payment ID */}
        <div className="flex flex-col justify-center pl-8 flex-[1.8]">
          <p className="text-foreground/50 text-sm mb-1.5">Payment ID</p>
          <p className="text-base font-bold text-foreground mb-1">{data.paymentId}</p>
          <p className="text-foreground/40 text-sm">Created: {data.createdAt}</p>
        </div>

      </div>
    </div>
  );
}
