interface ReceiptProps {
  onDownloadReceipt?: () => void;
  onViewInvoice?: () => void;
  onViewCompanyInfo?: () => void;
}

export default function ReceiptComponent({
  onDownloadReceipt,
  onViewInvoice,
  onViewCompanyInfo,
}: ReceiptProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <span>📋</span> Receipt & Information
      </h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={onDownloadReceipt}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>⬇</span> Download Receipt
        </button>
        
        <button
          onClick={onViewInvoice}
          className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>📄</span> View Invoice
        </button>
        
        <button
          onClick={onViewCompanyInfo}
          className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>🏢</span> Company Info
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-blue-800 text-sm flex items-center gap-2">
          <span>ℹ</span> Cancel can only do in AUTHORIZED stage
        </p>
      </div>
    </div>
  );
}
