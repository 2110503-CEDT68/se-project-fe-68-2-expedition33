'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { PaymentItem } from '@/../interfaces';

import CompanyDataComponent from '@/components/payments/CompanyDataComponent';
import DateListComponent from '@/components/payments/DateListComponent';
import PaymentEventComponent from '@/components/payments/PaymentEventComponent';
import ReceiptComponent from '@/components/payments/ReceiptComponent';
import PaymentError from '@/components/payments/PaymentError';
import PaymentActionComponent from '@/components/payments/PaymentActionComponent';

import getPayment from '@/libs/getPayment';
import putPayment from '@/libs/updatePayment';
import deletePayment from '@/libs/deletePayment';

export default function DetailsPage({ params }: Readonly<{ params: Promise<{ pid: string }> }>) {
  const { pid } = use(params);
  const { data: session, status } = useSession();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentItem | null>(null);
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
      const payment = response.data;

      setPayment(payment);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load payment details");
    } finally {
      setLoading(false);
    }
  }, [pid, session]);

  useEffect(() => {
    if (status === 'authenticated') fetchData();
  }, [status, fetchData]);

  const handleConfirmPayment = async () => {
    if (!session?.user?.token || !payment) return;
    try {
      setIsProcessing(true);
      await putPayment(payment.id, session.user.token, "captured");
      setIsConfirmModalOpen(false);
      await fetchData();
    } catch {
      alert('Failed to confirm payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelPayment = async () => {
    if (!session?.user?.token || !payment) return;
    try {
      setIsProcessing(true);
      await deletePayment(payment.id, session.user.token);
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
  if (!payment) {
    return <div className="p-20 text-center text-button-red">Payment Not Found</div>;
  }

  const paymentFailed = payment.status === "cancelled" || payment.status === "failed";

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-12 pt-20 pb-100">

        {/* 1. Heading */}
        <h1 className="text-2xl font-bold text-foreground mb-6">Payment Details</h1>

        {/* 2. Company info card */}
        <CompanyDataComponent payment={payment} />

        {/* 3. Date list */}
        <DateListComponent dates={payment.dateList} />

        {/* 4. Two-column: Payment Events | Error box — always both visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-stretch">
          <PaymentEventComponent events={payment.events} />
          <PaymentError
            errorType={paymentFailed ? (payment.status.toUpperCase() as 'CANCELLED' | 'FAILED') : 'FAILED'}
            visible={true}
          />
        </div>

        {/* 5. Receipt & Information — full width, mb-4 baked into component */}
        <ReceiptComponent />

        {/* 6. Payment Actions — 693px centred */}
        <PaymentActionComponent
          onConfirm={() => setIsConfirmModalOpen(true)}
          onCancel={() => setIsCancelConfirmOpen(true)}
          isDisabled={payment.status.toLowerCase() !== 'authorized'}
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
