"use client"
import deleteBooking from "@/libs/deleteBooking";
import createBooking from "@/libs/createBooking";
import { BookingItem, BookingResponse, CompanyItem } from "../../../interfaces";
import { useState } from "react";
import getBookings from "@/libs/getBookings";
import LinearProgress from "@mui/material/LinearProgress";

export default function BookingList({
  company,
  bookingsResponse, 
  adminToken,
  userToken
}: {
  company: CompanyItem,
  bookingsResponse: BookingResponse, 
  adminToken: string,
  userToken: string
}) {
  const [bookings, setBookings] = useState<BookingItem[]>(bookingsResponse?.data || []);
  const [bookingCount, setBookingCount] = useState<number>(bookingsResponse?.count || 0);
  const [pendingBooking, setPendingBooking] = useState<{ companyName: string, date: string; userRole: string } | null>(null);

  const handleAddAdminBooking = async () => {
    setPendingBooking({ companyName: company.name ,date: "2022-05-10", userRole: "Admin" });

    try {
      await createBooking(company.id, adminToken, "2022-05-10");
      const bookingsRes = await getBookings(adminToken);
      
      setBookings(bookingsRes.data);
      setBookingCount(bookingsRes.count);
    } catch (error) {
      console.error("Failed to add admin booking:", error);
    } finally {
      setPendingBooking(null);
    }
  };

  const handleAddUserBooking = async () => {
    setPendingBooking({ companyName: company.name, date: "2022-05-10", userRole: "User" });

    try {
      await createBooking(company.id, userToken, "2022-05-10");
      const bookingsRes = await getBookings(adminToken);
      
      setBookings(bookingsRes.data);
      setBookingCount(bookingsRes.count);
    } catch (error) {
      console.error("Failed to add user booking:", error);
    } finally {
      setPendingBooking(null);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteBooking(id, adminToken);
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
    setBookingCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Total Bookings: <span className="text-primary">{bookingCount}</span>
      </h3>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={handleAddAdminBooking}
          disabled={pendingBooking !== null}
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-6 py-2 rounded-md font-bold transition-colors shadow-sm cursor-pointer"
        >
          + Add Admin Booking
        </button>
        <button 
          onClick={handleAddUserBooking}
          disabled={pendingBooking !== null}
          className="bg-surface hover:bg-surface-border disabled:opacity-50 text-primary border border-primary px-6 py-2 rounded-md font-bold transition-colors shadow-sm cursor-pointer"
        >
          + Add User Booking
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {
          pendingBooking && (
            <div className="flex flex-col overflow-hidden bg-background border border-primary/50 rounded-xl shadow-md">
              <LinearProgress color="warning" /> 
              
              <div className="flex flex-col md:flex-row justify-between items-center p-4 opacity-70">
                <div className="flex flex-col text-left mb-4 md:mb-0">
                  <span className="text-lg font-bold text-primary animate-pulse">
                    { pendingBooking.companyName }
                  </span>
                  <span className="text-sm text-foreground/70">
                    Date: {pendingBooking.date} | User Role: {pendingBooking.userRole}
                  </span>
                  <span className="text-xs font-mono text-foreground/40 mt-1 animate-pulse">
                    ID: Generating...
                  </span>
                </div>
              </div>
            </div>
          )
        }

        {
          bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="flex flex-col md:flex-row justify-between items-center bg-background border border-surface-border rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col text-left mb-4 md:mb-0">
                <span className="text-lg font-bold text-foreground">
                  {booking.company?.name || "Unknown Company"}
                </span>
                <span className="text-sm text-foreground/70">
                  Date: {booking.bookingDate} | User: {booking.user?.name || "Unknown"}
                </span>
                <span className="text-xs font-mono text-foreground/40 mt-1">
                  ID: {booking.id}
                </span>
              </div>

              <button 
                onClick={(e) => handleDelete(e, booking.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-md font-bold transition-colors border border-red-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))
        }

        {
          bookings.length === 0 && !pendingBooking && (
            <div className="text-foreground/50 py-8 text-center italic">
              No bookings found. Try adding one!
            </div>
          )
        }
      </div>

    </div>
  );
}