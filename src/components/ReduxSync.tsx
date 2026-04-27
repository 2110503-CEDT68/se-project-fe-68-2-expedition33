"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchUserBookings, clearBookings } from "@/redux/features/bookingSlice";

export default function ReduxSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const token = session?.user?.token;

  useEffect(() => {
    if (status === "authenticated" && token) {
        // Fetch bookings immediately upon login/refresh
        dispatch(fetchUserBookings(token));
    } else if (status === "unauthenticated") {
        // Clear Redux if user logs out
        dispatch(clearBookings());
    }
  }, [status, token, dispatch]);

  return null;
}