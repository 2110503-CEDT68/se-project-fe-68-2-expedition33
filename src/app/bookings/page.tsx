import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import AdminBookings from "@/components/AdminBookings";
import UserBookings from "@/components/UserBookings";
import getBookings from "@/libs/getBookings";
import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";

async function BookingsDataWrapper({ token, role }: { token: string, role: string }) {
  
  const bookingsResponse = await getBookings(token);

  if (role === "admin") {
    return <AdminBookings bookingsResponse={bookingsResponse} adminToken={token} />;
  }

  return <UserBookings bookingsResponse={bookingsResponse} userToken={token} />;
}

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <Suspense 
        fallback={
            <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-primary font-bold text-xl tracking-widest gap-4">
                Loading Sessions...
                <div className="w-full max-w-md">
                    <LinearProgress color="warning"/>
                </div>
            </div>
        }
    >  
      <BookingsDataWrapper token={session.user.token} role={session.user.role} />
    </Suspense>
  );
}