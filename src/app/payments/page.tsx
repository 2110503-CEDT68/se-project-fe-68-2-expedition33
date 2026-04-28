import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import getPayments from "@/libs/getPayments";
import PaymentDashboard from "@/components/payments/PaymentDashboard";

async function PaymentsDataWrapper() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/login");
  }

  const token = session.user.token;
  const fetchedPayments = (await getPayments(token)).data || [];
  return (
    <main>
      <PaymentDashboard payments={fetchedPayments} token={token} />
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-primary font-bold text-xl tracking-widest gap-4">
          Loading Payments...
          <div className="w-full max-w-md mt-4">
            <LinearProgress color="warning" />
          </div>
        </div>
      }
    >
      <PaymentsDataWrapper />
    </Suspense>
  );
}
