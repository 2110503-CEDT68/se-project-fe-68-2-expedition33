'use client';

import { useState } from "react";
import PaidDateCard from "@/components/payments/PaidDateCard";
import CompanyReserve from "@/components/payments/PaymentHistoryList";
import AddDateListModal from "@/components/modals/AddPaymentPanel";
import type { PaymentItem } from "@/../interfaces";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import createPayment from "@/libs/createPayment";

// All available event dates (ISO strings)
const ALL_DATE_KEYS = [
  "2022-05-10",
  "2022-05-11",
  "2022-05-12",
  "2022-05-13",
];

export type DateStatus = "paid" | "pending" | "free";

function buildDateStatusMap(payments: PaymentItem[]): Record<string, DateStatus> {
  const map: Record<string, DateStatus> = {};
  for (const key of ALL_DATE_KEYS) {
    map[key] = "free";
  }

  for (const payment of payments) {
    const isActive = payment.status !== "cancelled" && payment.status !== "failed";
    const isPaid = payment.status === "captured";

    for (const isoDate of payment.dateList) {
      const key = isoDate.slice(0, 10);
      if (!map[key]) continue;

      if (isPaid) {
        map[key] = "paid";
      } else if (isActive && map[key] === "free") {
        map[key] = "pending";
      }
    }
  }

  return map;
}

export default function PaymentDashboard({ payments, token }: Readonly<{ payments: PaymentItem[], token: string }>) {
  const router = useRouter();
  const companyId = useAppSelector((state) => state.user.userProfile?.companyData?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateStatusMap = buildDateStatusMap(payments);

  return (
    <main className="flex flex-row pt-24 px-8 gap-8">
      <div className="flex flex-row">
        <div className="flex flex-col items-start justify-start w-fit p-10 m-5 rounded-lg shadow-md bg-surface border border-surface-border">
          <div className="text-foreground font-semibold mb-4 text-center">Date List</div>
          <PaidDateCard
            dateStatusMap={dateStatusMap}
            onPurchaseClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <CompanyReserve payments={payments} />

      <AddDateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dateStatusMap={dateStatusMap}
        onPurchase={async (selectedDates) => {
          if (!token || !companyId || selectedDates.length === 0) return;

          const ALL_DATES = [
            "2022-05-10T00:00:00.000Z",
            "2022-05-11T00:00:00.000Z",
            "2022-05-12T00:00:00.000Z",
            "2022-05-13T00:00:00.000Z",
          ];
          const dateList = selectedDates.map((i) => ALL_DATES[i]);

          try {
            const res = await createPayment(companyId, token, dateList);
            setIsModalOpen(false);
            router.push(`/payments/${res.data.id}`);
          } catch (error) {
            console.error("Failed to create payment:", error);
            alert("Failed to create payment. Please try again.");
          }
        }}
      />
    </main>
  );
}
