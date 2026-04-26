"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PaymentEvent, PaymentItem } from "@/../interfaces";

import CompanyPaymentDetail from "@/components/payments/CompanyPaymentDetail";
import PaymentDateList from "@/components/payments/PaymentDateList";
import PaymentEventLog from "@/components/payments/PaymentEventLog";
import ReceiptAction from "@/components/payments/ReceiptAction";
import PaymentErrorNotice from "@/components/payments/PaymentErrorNotice";
import PaymentAction from "@/components/payments/PaymentAction";
import LinearProgress from "@mui/material/LinearProgress";

import getPayment from "@/libs/getPayment";
import putPayment from "@/libs/updatePayment";
import deletePayment from "@/libs/deletePayment";
import CancelPaymentPanel from "@/components/modals/CancelPaymentPanel";
import ConfirmPaymentPanel from "@/components/modals/ConfirmPaymentPanel";

export default function DetailsPage({
  params,
}: Readonly<{ params: Promise<{ pid: string }> }>) {
  const { pid } = use(params);
  const { data: session, status } = useSession();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const token = session?.user?.token;

  const fetchData = useCallback(async () => {
    try {
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
  }, [pid, token]);

  useEffect(() => {
    if (status === "authenticated") fetchData();
  }, [status, fetchData]);

  const handleConfirmPayment = async () => {
    if (!session?.user?.token || !payment) return;
    try {
      setIsProcessing(true);
      await putPayment(payment.id, session.user.token, "captured");
      setIsConfirmModalOpen(false);
      await fetchData();
    } catch {
      alert("Failed to confirm payment. Please try again.");
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
      alert("Failed to cancel payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-primary font-bold text-xl tracking-widest gap-4">
        Loading Details...
        <div className="w-full max-w-md mt-4">
          <LinearProgress color="warning" />
        </div>
      </div>
    );
  }
  if (errorMsg) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-button-red text-2xl font-bold mb-4">Error</h1>
        <p className="mb-6 text-foreground/60">{errorMsg}</p>
        <Link
          href="/payments"
          className="bg-primary text-white px-6 py-2 rounded-full"
        >
          Back to Payments
        </Link>
      </div>
    );
  }
  if (!payment) {
    return (
      <div className="p-20 text-center text-button-red">Payment Not Found</div>
    );
  }

  const isFailedPayment = (payment: PaymentItem) => {
    return payment.status === "cancelled" || payment.status === "failed";
  };

  const isFailEvent = (event: PaymentEvent) => {
    return (
      event.eventType === "PAYMENT_FAILED" ||
      event.eventType === "PAYMENT_CANCELLED"
    );
  };

  let errorMessage = null;
  if (isFailedPayment(payment)) {
    const fetchedError = payment.events.findLast((event) => isFailEvent(event))
      ?.payload.errorMessage;
    errorMessage =
      fetchedError ||
      "Your payment failed for unknown reasons. Please contact support.";
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-12 pt-20 pb-100">
        {/* 1. Heading */}
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Payment Details
        </h1>

        {/* 2. Company info card */}
        <CompanyPaymentDetail payment={payment} />

        {/* 3. Date list */}
        <PaymentDateList dates={payment.dateList} />

        <div
          className={`grid grid-cols-1 ${errorMessage ? "lg:grid-cols-2" : ""} gap-4 mb-4 items-stretch`}
        >
          <PaymentEventLog events={payment.events} />
          {errorMessage && <PaymentErrorNotice message={errorMessage} />}
        </div>

        {/* 5. Payment Actions — only show if authorized */}
        {payment.status.toLowerCase() === "authorized" && (
          <div className="mb-4">
            <PaymentAction
              onConfirm={() => setIsConfirmModalOpen(true)}
              onCancel={() => setIsCancelConfirmOpen(true)}
            />
          </div>
        )}

        {/* 6. Receipt & Information — full width */}
        {payment.status === "captured" && <ReceiptAction payment={payment} />}
      </div>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <ConfirmPaymentPanel
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmPayment}
          isProcessing={isProcessing}
        />
      )}

      {/* Cancel Modal */}
      {isCancelConfirmOpen && (
        <CancelPaymentPanel
          onClose={() => setIsCancelConfirmOpen(false)}
          onConfirm={handleCancelPayment}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
