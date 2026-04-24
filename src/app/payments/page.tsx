'use client';

import { useEffect, useState } from "react";
import SelectDateBox from "@/components/payments/SelectDateBox";
import CompanyReserve from "@/components/payments/PaymentHistoryList";
import AddDateListModal from "@/components/modals/AddPaymentPanel";
import getPayments from "@/libs/getPayments";
import { useSession } from "next-auth/react";
import type { PaymentItem } from "@/../interfaces";

export default function PaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const [payments, setPayments] = useState<PaymentItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user?.token;

        if (!token) return;

        const fetchedPayments = (await getPayments(token)).data || [];
        setPayments(fetchedPayments);

      } catch (err) {
        console.error(err);
      } 
    };

    if (session) fetchData();
  }, [session]);

  const calculateDateList = (payments: PaymentItem[]) => {
    let dateList = [];
    
    for (const payment of payments) {
      if (payment.status === "captured") {
        dateList.push(payment.dateList);
      }
    }

    return dateList.flat().map((date: string) => new Date(date));
  }

  return (
    <main className="flex flex-row pt-24 px-8 gap-8">

      <div className="flex flex-row">
        <div className="flex flex-col items-start justify-start w-fit p-10 m-5 rounded-lg shadow-md bg-surface border border-surface-border">
          <div className="text-foreground font-semibold mb-4 text-center">Date List</div>
          <SelectDateBox onPurchaseClick={() => {
            setIsModalOpen(true);
          }} />
        </div>
      </div>

      <CompanyReserve payments={payments} />

      <AddDateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservedDate={calculateDateList(payments)}
        onPurchase={(selectedDates) => {
          console.log('Purchased dates:', selectedDates);
          setIsModalOpen(false);
        }}
      />

    </main>
  );
}
