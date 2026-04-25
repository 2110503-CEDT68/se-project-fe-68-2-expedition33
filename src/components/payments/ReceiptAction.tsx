import Link from "next/link";

export default function ReceiptAction({
  companyId,
  onDownloadReceipt,
  onViewInvoice,
  onViewCompanyInfo,
}: Readonly<{  
  companyId?: string,
  onDownloadReceipt?: () => void,
  onViewInvoice?: () => void,
  onViewCompanyInfo?: () => void
}>) {
  return (
    <div className="bg-background rounded-2xl border border-surface-border px-6 py-5 mb-4 flex flex-col items-center">
      {/* Icon */}
      <div className="w-12 h-10 bg-primary-light rounded-full flex items-center justify-center mb-1">
        <svg width="22" height="22" fill="none" stroke="var(--primary)" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      </div>

      <h2 className="text-base font-bold text-foreground mb-5">Receipt & Information</h2>

      <div className="flex gap-4 flex-wrap justify-center w-full">

        {/* Download Receipt — solid primary */}
        <button
          onClick={onDownloadReceipt}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-7 rounded-xl text-sm transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download Receipt
        </button>

        {/* View Invoice — outline */}
        <button
          onClick={onViewInvoice}
          className="border-2 border-primary text-primary hover:bg-primary-light font-bold py-2.5 px-7 rounded-xl text-sm transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="1.6" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14,2 14,8 20,8" />
          </svg>
          View invoice
        </button>

        {/* Company Info — outline */}
        {companyId ? (
          <Link
            href={`/companies/${companyId}`}
            className="border-2 border-primary text-primary hover:bg-primary-light font-bold py-2.5 px-7 rounded-xl text-sm transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="1.6" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="19" rx="2" />
              <path d="M9 3v18M15 3v18M2 9h20M2 15h20" />
            </svg>
            Company info
          </Link>
        ) : (
          <button
            onClick={onViewCompanyInfo}
            className="border-2 border-primary text-primary hover:bg-primary-light font-bold py-2.5 px-7 rounded-xl text-sm transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="1.6" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="19" rx="2" />
              <path d="M9 3v18M15 3v18M2 9h20M2 15h20" />
            </svg>
            Company info
          </button>
        )}

      </div>
    </div>
  );
}
