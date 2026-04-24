'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CompanyDataComponent from '@/components/payments/CompanyDataComponent';
import DateListComponent from '@/components/payments/DateListComponent';
import PaymentEventComponent from '@/components/payments/PaymentEventComponent';
import ReceiptComponent from '@/components/payments/ReceiptComponent';
import TransactionErrorComponent from '@/components/payments/TransactionErrorComponent';
import PaymentActionComponent from '@/components/payments/PaymentActionComponent';

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
  const pid = (params.pid || params.cid) as string;
  const { data: session, status } = useSession();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const token = session?.user?.token;
      if (!token || !pid) return;
      setLoading(true);
      setErrorMsg(null);

      const response = await getPayment(pid, token);
      const item = response.data || response;
      if (!item || item.error) throw new Error('Payment data is invalid');

      const extractedCompanyId = typeof item.company === 'string'
        ? item.company
        : (item.company?.id || item.company?._id || '');

      let companyName = 'Unknown Company';
      if (typeof item.company === 'object' && item.company?.name) {
        companyName = item.company.name;
      } else if (extractedCompanyId) {
        try {
          const companyInfo = await getCompany(extractedCompanyId);
          companyName = companyInfo.name || companyName;
        } catch {
          companyName = `Company ID: ${extractedCompanyId}`;
        }
      }

      setCompany({
        id: item.id || item._id,
        companyId: extractedCompanyId,
        companyName,
        totalAmount: `${item.totalPrice?.toLocaleString() || 0} Baht`,
        latestUpdate: new Date(item.updatedAt).toLocaleString('en-GB'),
        status: item.status,
        availableDates: (item.dateList || []).map((d: string) => {
          const dateObj = new Date(d);
          return { date: dateObj.getDate(), month: dateObj.toLocaleString('en-US', { month: 'short' }) };
        }),
        realEvents: (item.events || []).map((ev: any) => ({
          title: ev.eventType,
          description: ev.payload?.errorMessage || `Status changed to ${ev.payload?.newStatus}`,
          timestamp: new Date(ev.createdAt).toLocaleString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
          }),
          status: ev.eventType.includes('FAILED') || ev.eventType.includes('CANCELLED') ? 'failed' : 'success',
        })),
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load payment details');
    } finally {
      setLoading(false);
    }
  }, [pid, session]);

  useEffect(() => {
    if (status === 'authenticated') fetchData();
  }, [status, fetchData]);

  const handleConfirmPayment = async () => {
    if (!session?.user?.token || !company) return;
    try {
      setIsProcessing(true);
      await putPayment(company.id, session.user.token, 'captured');
      setIsConfirmModalOpen(false);
      await fetchData();
    } catch {
      alert('Failed to confirm payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelPayment = async () => {
    if (!session?.user?.token || !company) return;
    try {
      setIsProcessing(true);
      await deletePayment(company.id, session.user.token);
      setIsCancelConfirmOpen(false);
      await fetchData();
    } catch {
      alert('Failed to cancel payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="p-20 text-center font-bold text-primary">Loading details...</div>;
  }
  if (errorMsg) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-button-red text-2xl font-bold mb-4">Error</h1>
        <p className="mb-6 text-foreground/60">{errorMsg}</p>
        <Link href="/payments" className="bg-primary text-white px-6 py-2 rounded-full">Back to Payments</Link>
      </div>
    );
  }
  if (!company) {
    return <div className="p-20 text-center text-button-red">Payment Not Found</div>;
  }

  const paymentFailed = company.status === 'cancelled' || company.status === 'failed';

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-screen-xl mx-auto px-12 pt-20 pb-100">

        {/* 1. Heading */}
        <h1 className="text-2xl font-bold text-foreground mb-6">Payment Details</h1>

        {/* 2. Company info card */}
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

        {/* 3. Date list */}
        <DateListComponent dates={company.availableDates} />

        {/* 4. Two-column: Payment Events | Error box — always both visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-stretch">
          <PaymentEventComponent events={company.realEvents} />
          <TransactionErrorComponent
            errorType={paymentFailed ? (company.status.toUpperCase() as 'CANCELLED' | 'FAILED') : 'FAILED'}
            visible={true}
          />
        </div>

        {/* 5. Receipt & Information — full width, mb-4 baked into component */}
        <ReceiptComponent />

        {/* 6. Payment Actions — 693px centred */}
        <PaymentActionComponent
          onConfirm={() => setIsConfirmModalOpen(true)}
          onCancel={() => setIsCancelConfirmOpen(true)}
          isDisabled={company.status.toLowerCase() !== 'authorized'}
        />

      </div>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl w-full max-w-lg p-12 shadow-2xl relative">
            <button onClick={() => setIsConfirmModalOpen(false)} className="absolute top-5 right-6 text-foreground/30 hover:text-foreground/60 text-xl">✕</button>
            <div className="w-11 h-11 bg-primary rounded-full ml-auto mb-8" />
            <h2 className="text-4xl font-extrabold text-center text-foreground mb-4">Confirm Payment</h2>
            <p className="text-center text-foreground/60 mb-1">Are you sure you want to proceed with confirming this payment?</p>
            <p className="text-center text-foreground/60 mb-10">This action cannot be undone.</p>
            <div className="flex justify-center">
              <button onClick={handleConfirmPayment} disabled={isProcessing} className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-3.5 px-16 rounded-full text-base transition-colors">
                {isProcessing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {isCancelConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl w-full max-w-lg p-12 shadow-2xl relative">
            <button onClick={() => setIsCancelConfirmOpen(false)} disabled={isProcessing} className="absolute top-5 right-6 text-foreground/30 hover:text-foreground/60 text-xl disabled:opacity-50">✕</button>
            <div className="w-11 h-11 bg-primary rounded-full ml-auto mb-8" />
            <h2 className="text-4xl font-extrabold text-center text-button-red mb-4">Cancel Payment</h2>
            <p className="text-center text-foreground/60 mb-1">Are you sure you want to cancel this payment?</p>
            <p className="text-center text-foreground/60 mb-10">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setIsCancelConfirmOpen(false)} disabled={isProcessing} className="bg-surface hover:bg-surface-border disabled:opacity-50 text-foreground font-bold py-3.5 px-8 rounded-full text-base transition-colors">Keep It</button>
              <button onClick={handleCancelPayment} disabled={isProcessing} className="bg-button-red hover:bg-button-red-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-8 rounded-full text-base transition-colors">
                {isProcessing ? 'Cancelling...' : 'Cancel Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
