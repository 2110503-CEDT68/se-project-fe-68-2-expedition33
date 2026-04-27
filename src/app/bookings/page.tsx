import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import AdminBookings from "@/components/bookings/AdminBookings";
import UserBookings from "@/components/bookings/UserBookings";
import getBookings from "@/libs/getBookings";
import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";

async function BookingsDataWrapper() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/login");
  }

  const token = session.user.token;
  const role = session.user.role;
  const bookings = (await getBookings(token)).data;

  if (role === "user") {
    return (
      <main>
        <UserBookings bookingList={bookings} userToken={token} />
      </main>
    );
  }
  return (
    <main>
      <AdminBookings bookingList={bookings} adminToken={token} />
    </main>
  );
}

export default function BookingsPage() {
  return (
    <Suspense 
        fallback={
            <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-primary font-bold text-xl tracking-widest gap-4">
                Loading Sessions...
                <div className="w-full max-w-md mt-4">
                    <LinearProgress color="warning"/>
                </div>
            </div>
        }
    >  
      <BookingsDataWrapper />
    </Suspense>
  );
}