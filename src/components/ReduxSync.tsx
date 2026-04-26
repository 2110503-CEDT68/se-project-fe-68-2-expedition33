"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchUserBookings, clearBookings } from "@/redux/features/bookingSlice";
import { fetchUserProfile, clearUser } from "@/redux/features/userSlice";

export default function ReduxSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const token = session?.user?.token;

  useEffect(() => {
    if (status === "authenticated" && token) {
        // Fetch bookings and user profile immediately upon login/refresh
        dispatch(fetchUserBookings(token));
        dispatch(fetchUserProfile(token));
    } else if (status === "unauthenticated") {
        // Clear Redux if user logs out
        dispatch(clearBookings());
        dispatch(clearUser());
    }
  }, [status, token, dispatch]);

  return null;
}