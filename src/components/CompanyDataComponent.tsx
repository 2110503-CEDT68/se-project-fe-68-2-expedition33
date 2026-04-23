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

export default function CompanyDataComponent({ data }: Readonly<CompanyDataProps>) {
  return (
    <div className="bg-surface border border-surface-border rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Payment Details</h2>
      
      <div className="flex items-start justify-between">
        {/* Company Icon and Info */}
        <div className="flex gap-4 flex-1">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-2xl font-bold">🏢</span>
          </div>
          
          <div className="flex-1">
            <p className="text-foreground/60 text-sm mb-1">Company</p>
            <h3 className="text-xl font-bold text-foreground mb-1">{data.companyName}</h3>
            <p className="text-foreground/60 text-xs">Company ID: {data.companyId}</p>
          </div>
        </div>

        {/* Price, Status, and Payment ID */}
        <div className="flex gap-12">
          <div>
            <p className="text-foreground/60 text-sm mb-1">Total Price</p>
            <p className="text-2xl font-bold text-primary">{data.totalPrice}</p>
            <p className="text-foreground/60 text-xs">THB</p>
          </div>
          
          <div>
            <p className="text-foreground/60 text-sm mb-1">Status</p>
            <p className="text-lg font-bold text-button-green">{data.status}</p>
            <p className="text-foreground/60 text-xs">Payment completed successfully</p>
          </div>
          
          <div>
            <p className="text-foreground/60 text-sm mb-1">Payment ID</p>
            <p className="text-lg font-bold text-foreground">{data.paymentId}</p>
            <p className="text-foreground/60 text-xs">Created: {data.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
