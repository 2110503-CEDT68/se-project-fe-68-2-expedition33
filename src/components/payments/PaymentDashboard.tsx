'use client';

import { useState } from "react";
import Image from "next/image";
import PaidDateCard from "@/components/payments/PaidDateCard";
import PaymentHistoryList from "@/components/payments/PaymentHistoryList";
import AddDateListModal from "@/components/modals/AddPaymentPanel";
import type { PaymentItem } from "@/../interfaces";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const companyId = session?.user?.companyData?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateStatusMap = buildDateStatusMap(payments);

  return (
    <div className="flex flex-col md:flex-row pt-24 px-8 gap-12 justify-center max-w-7xl mx-auto w-full">
      {/* Left Column */}
      <div className="flex flex-col items-center flex-1 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6 self-center">Date List</h2>

        <div className="flex flex-col items-center justify-start w-full p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] bg-background border border-surface-border mb-6">
          <PaidDateCard
            dateStatusMap={dateStatusMap}
            onPurchaseClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="w-full max-w-md mt-4 flex items-center justify-center">
          <Image 
            src="/illustration-calendar.svg"
            alt="Calendar organizing illustration"
            width={350}
            height={300}
            className="object-contain"
          />
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-surface-border hidden md:block mx-4"></div>

      {/* Right Column */}
      <div className="flex-1 w-full max-w-lg">
        <PaymentHistoryList payments={payments} />
      </div>

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
    </div>
  );
}