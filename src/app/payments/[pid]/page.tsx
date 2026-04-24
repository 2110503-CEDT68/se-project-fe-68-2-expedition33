'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Components
import CompanyDataComponent from '@/components/companies/CompanyDataComponent';
import DateListComponent from '@/components/payments/DateListComponent';
import PaymentEventComponent from '@/components/payments/PaymentEventComponent';
import ReceiptComponent from '@/components/payments/ReceiptComponent';
import TransactionErrorComponent from '@/components/payments/TransactionErrorComponent';
import PaymentActionComponent from '@/components/payments/PaymentActionComponent';

// Libs
import getPayment from '@/libs/getPayment';
import getCompany from '@/libs/getCompany';
import putPayment from '@/libs/updatePayment';       
import deletePayment from '@/libs/deletePayment'; 

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
  const router = useRouter();
  const pid = (params.pid || params.cid) as string;
  const { data: session, status } = useSession();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // สถานะสำหรับปุ่มตอนกำลังโหลด API (ป้องกันการกดเบิ้ล)
  const [isProcessing, setIsProcessing] = useState(false);

  // ดึง FetchData ออกมาเป็นฟังก์ชันแยก เพื่อให้เรียกซ้ำได้หลังจากอัปเดตข้อมูล
  const fetchData = useCallback(async () => {
    try {
      const token = session?.user?.token;
      if (!token || !pid) return;

      setLoading(true);
      setErrorMsg(null);

      const response = await getPayment(pid, token);
      const item = response.data || response;

      if (!item || item.error) {
         throw new Error("Payment data is invalid");
      }

      const extractedCompanyId = typeof item.company === 'string' 
        ? item.company 
        : (item.company?.id || item.company?._id || "");

      let companyName = "Unknown Company";
      
      if (typeof item.company === 'object' && item.company?.name) {
        companyName = item.company.name;
      } else if (extractedCompanyId) {
        try {
          const companyInfo = await getCompany(extractedCompanyId);
          companyName = companyInfo.name || companyName;
        } catch (cErr) {
          console.error("Could not fetch company info:", cErr);
          companyName = `Company ID: ${extractedCompanyId}`;
        }
      }

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
          status: ev.eventType.includes('FAILED') || ev.eventType.includes('CANCELLED') ? 'failed' : 'success',
        })),
      };

      setCompany(mapped);

    } catch (err: any) {
      console.error("FETCH ERROR:", err);
      setErrorMsg(err.message || "Failed to load payment details");
    } finally {
      setLoading(false);
    }
  }, [pid, session]);

  useEffect(() => {
    if (status === "authenticated") fetchData();
  }, [status, fetchData]);


  // ==========================================
  // API Action Handlers
  // ==========================================

  // ฟังก์ชันสำหรับ Confirm Payment (PUT -> 'captured')
  const handleConfirmPayment = async () => {
    if (!session?.user?.token || !company) return;
    try {
      setIsProcessing(true);
      await putPayment(company.id, session.user.token, "captured");
      setIsConfirmModalOpen(false); // ปิด Modal
      await fetchData(); // โหลดข้อมูลใหม่เพื่อแสดงสถานะที่อัปเดต
    } catch (err) {
      console.error("Confirm Payment Error:", err);
      alert("Failed to confirm payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ฟังก์ชันสำหรับ Cancel Payment (DELETE)
  const handleCancelPayment = async () => {
    if (!session?.user?.token || !company) return;
    try {
      setIsProcessing(true);
      await deletePayment(company.id, session.user.token);
      setIsCancelConfirmOpen(false); // ปิด Modal
      await fetchData(); // โหลดข้อมูลใหม่ (หรือใช้ router.push('/payments') เพื่อเด้งกลับหน้าเดิม)
    } catch (err) {
      console.error("Cancel Payment Error:", err);
      alert("Failed to cancel payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ==========================================
  // Render
  // ==========================================

  if (status === "loading" || loading) {
    return <div className="p-20 text-center font-bold text-orange-500">Loading details...</div>;
  }

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

        <ReceiptComponent />

        {/* ส่งตัวแปร isDisabled ไปเช็คว่าถ้าไม่ใช่ authorized ให้กดไม่ได้ */}
        <PaymentActionComponent
          onConfirm={() => setIsConfirmModalOpen(true)}
          onCancel={() => setIsCancelConfirmOpen(true)}
          isDisabled={company.status.toLowerCase() !== 'authorized'} 
        />
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6">Confirm Payment</h2>
            <p className="text-center text-gray-600 mb-10">Are you sure you want to proceed with this payment? This action is permanent.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsConfirmModalOpen(false)} 
                disabled={isProcessing}
                className="flex-1 py-3 rounded-full border border-gray-300 font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmPayment} 
                disabled={isProcessing}
                className="flex-1 py-3 rounded-full bg-button-green text-white font-bold flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Confirm"}
              </button>
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
              <button 
                onClick={() => setIsCancelConfirmOpen(false)} 
                disabled={isProcessing}
                className="flex-1 py-3 rounded-full border border-gray-300 font-semibold disabled:opacity-50"
              >
                Back
              </button>
              <button 
                onClick={handleCancelPayment} 
                disabled={isProcessing}
                className="flex-1 py-3 rounded-full bg-red-500 text-white font-bold flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? "Canceling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}