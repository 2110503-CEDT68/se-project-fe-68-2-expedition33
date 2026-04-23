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
import getUserProfile from '@/libs/getUserProfile';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user?.token;
        if (!token || !pid) return;

        setLoading(true);

        const response = await getPayment(pid, token);
        
        // ตรวจสอบข้อมูลจาก JSON (response.data)
        const item = response.data || response;

        // ดึงข้อมูลบริษัทเพิ่มเติมจาก companyId ใน item (เพื่อไม่ populate company data ใน backend)

        //const companyresponse = await getCompany(item.companyId);

        console.log("FETCHED PAYMENT DATA:", item.company.id); // ตรวจสอบข้อมูลที่ได้รับจาก API

        if (item) {

          const mapped: CompanyDetails = {
            id: item.id || item._id,
            companyId: typeof item.company === 'string' ? item.company : (item.company?.id || item.company?._id || ""),
            companyName: item.company?.name || "Company ID: " + (typeof item.company === 'string' ? item.company : ""),
            totalAmount: `${item.totalPrice} Baht`,
            latestUpdate: new Date(item.updatedAt).toLocaleString('en-GB'),
            status: item.status,
            availableDates: (item.dateList || []).map((d: string) => {
              const dateObj = new Date(d);
              return {
                date: dateObj.getDate(),
                month: dateObj.toLocaleString('en-US', { month: 'short' }),
              };
            }),
            // แมพ Events จริงจาก JSON
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
          
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchData();
  }, [status, pid, session?.user?.token]);

  if (status === "loading" || loading) {
    return <div className="p-20 text-center font-bold text-orange-500">Loading...</div>;
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
          
          {/* แสดง Error เฉพาะเมื่อสถานะเป็น cancelled หรือ failed */}
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