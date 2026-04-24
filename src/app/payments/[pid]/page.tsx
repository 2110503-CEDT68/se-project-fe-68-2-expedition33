'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CompanyDataComponent from '@/components/CompanyDataComponent';
import DateListComponent from '@/components/DateListComponent';
import PaymentEventComponent from '@/components/PaymentEventComponent';
import ReceiptComponent from '@/components/ReceiptComponent';
import TransactionErrorComponent from '@/components/TransactionErrorComponent';
import PaymentActionComponent from '@/components/PaymentActionComponent';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import getPayment from '@/libs/getPayment';
import getCompany from '@/libs/getCompany';

interface CompanyDetails {
  id: string;          
  companyId: string;   
  companyName: string;
  totalAmount: string;
  latestUpdate: string;
  status: string;
  availableDates: { date: number; month: string }[];
  realEvents: any[];  
}

export default function DetailsPage() {
  const params = useParams();
  const pid = (params.pid || params.cid) as string;
  const { data: session, status } = useSession();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user?.token;
        
        // ตรวจสอบเบื้องต้น
        if (!token) {
          console.warn("No token found in session");
          return;
        }

        console.log("Fetching payment details for PID:", token);
        if (!pid) return;

        setLoading(true);
        setErrorMsg(null);

        // 1. ดึงข้อมูล Payment
        const response = await getPayment(pid, token);
        
        // ดึง item ออกมา (รองรับทั้ง {data: ...} หรือ response ตรงๆ)
        const item = response.data || response;

        if (!item || item.error) {
           throw new Error("Payment data is invalid");
        }

        // 2. สกัดเอา Company ID (ดักทั้ง String และ Object)
        const extractedCompanyId = typeof item.company === 'string' 
          ? item.company 
          : (item.company?.id || item.company?._id || "");

        // 3. ดึงชื่อบริษัท (ถ้า item.company ไม่มี name มาให้)
        let companyName = "Unknown Company";
        
        if (typeof item.company === 'object' && item.company?.name) {
          companyName = item.company.name;
        } else if (extractedCompanyId) {
          try {
            // เรียก getCompany เฉพาะเมื่อจำเป็น
            const companyInfo = await getCompany(extractedCompanyId);
            const cData = companyInfo.data || companyInfo;
            companyName = cData.name || companyName;
          } catch (cErr) {
            console.error("Could not fetch company info:", cErr);
            companyName = `Company ID: ${extractedCompanyId}`;
          }
        }

        // 4. Mapping ข้อมูล
        const mapped: CompanyDetails = {
          id: item.id || item._id,
          companyId: extractedCompanyId,
          companyName: companyName,
          totalAmount: `${item.totalPrice?.toLocaleString() || 0} Baht`,
          latestUpdate: new Date(item.updatedAt).toLocaleString('en-GB'),
          status: item.status,
          availableDates: (item.dateList || []).map((d: string) => {
            const dateObj = new Date(d);
            return {
              date: dateObj.getDate(),
              month: dateObj.toLocaleString('en-US', { month: 'short' }),
            };
          }),
          realEvents: (item.events || []).map((ev: any) => ({
            title: ev.eventType,
            description: ev.payload?.errorMessage || `Status changed to ${ev.payload?.newStatus}`,
            timestamp: new Date(ev.createdAt).toLocaleString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }),
            status: 'success',
          })),
        };

        setCompany(mapped);

      } catch (err: any) {
        console.error("FETCH ERROR:", err);
        setErrorMsg(err.message || "Failed to load payment details");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, pid, session]);

  if (status === "loading" || loading) {
    return <div className="p-20 text-center font-bold text-orange-500">Loading details...</div>;
  }

  // แสดงหน้าจอ Error ถ้าติด 403 หรือปัญหาอื่นๆ
  if (errorMsg) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-red-500 text-2xl font-bold mb-4">Access Denied (403)</h1>
        <p className="mb-6 text-gray-600">{errorMsg}</p>
        <Link href="/payments" className="bg-orange-500 text-white px-6 py-2 rounded-full">
          Back to Payments
        </Link>
      </div>
    );
  }

  if (!company) {
    return <div className="p-20 text-center text-red-500">Payment Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <Link href="/payments" className="text-orange-500 font-semibold">← Back</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CompanyDataComponent
          data={{
            companyName: company.companyName,
            companyId: company.companyId, 
            totalPrice: company.totalAmount,
            status: company.status,
            paymentId: company.id,
            createdAt: company.latestUpdate,
          }}
        />

        <DateListComponent dates={company.availableDates} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PaymentEventComponent events={company.realEvents} />
          
          {(company.status === 'cancelled' || company.status === 'failed') && (
            <TransactionErrorComponent 
              errorType={company.status.toUpperCase() as "CANCELLED" | "FAILED"} 
            />
          )}
        </div>

        <ReceiptComponent
          onDownloadReceipt={() => {}}
          onViewInvoice={() => {}}
          onViewCompanyInfo={() => {}}
        />

        <PaymentActionComponent
          onConfirm={() => setIsConfirmModalOpen(true)}
          onCancel={() => setIsCancelConfirmOpen(true)}
        />
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6">Confirm Payment</h2>
            <p className="text-center text-gray-600 mb-10">Are you sure you want to proceed with this payment? This action is permanent.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsConfirmModalOpen(false)} className="flex-1 py-3 rounded-full border border-gray-300 font-semibold">Cancel</button>
              <button onClick={() => setIsConfirmModalOpen(false)} className="flex-1 py-3 rounded-full bg-orange-500 text-white font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {isCancelConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-red-500 mb-6">Cancel Payment</h2>
            <p className="text-center text-gray-600 mb-10">Are you sure you want to cancel? This cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsCancelConfirmOpen(false)} className="flex-1 py-3 rounded-full border border-gray-300 font-semibold">Back</button>
              <button onClick={() => setIsCancelConfirmOpen(false)} className="flex-1 py-3 rounded-full bg-red-500 text-white font-bold">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}