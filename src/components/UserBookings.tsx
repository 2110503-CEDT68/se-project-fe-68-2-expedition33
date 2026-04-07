"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookingItem, BookingResponse } from "../../interfaces";
import UpdateBookingPanel from "@/components/modals/UpdateBookingPanel";
import DeleteBookingPanel from "@/components/modals/DeleteBookingPanel";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setBookings, removeBooking } from "@/redux/features/bookingSlice";

export default function UserBookings({ bookingsResponse, userToken }: { bookingsResponse: BookingResponse, userToken: string }) {
    
    const bookings = useAppSelector(state => state.bookings.bookingItems);
    const dispatch = useDispatch<AppDispatch>();
    
    const [updatingBooking, setUpdatingBooking] = useState<BookingItem | null>(null);
    const [deletingBooking, setDeletingBooking] = useState<BookingItem | null>(null);

    useEffect(() => {
        if (bookingsResponse?.data) {
            dispatch(setBookings(bookingsResponse.data));
        }
    }, [bookingsResponse, dispatch]);


    const handleDelete = (e: React.MouseEvent, target: BookingItem, token: string) => {
        e.preventDefault();
        e.stopPropagation();
        deleteBooking(target.id, token);
        
        dispatch(removeBooking(target));
    };

    const handleUpdate = async (e: React.MouseEvent, target: BookingItem, token: string, date: string) => {
        e.preventDefault();
        e.stopPropagation();
        updateBooking(target.id, token, date);

        const updatedBooking = bookings.map((booking) => booking.id === target.id ? { ...booking, bookingDate: date } : booking);
        dispatch(setBookings(updatedBooking));
    };

    return (
        <main className="min-h-screen bg-background flex flex-col pt-32 pb-12 px-6">      
        
            <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col z-10">
                
                {/* Header Section */}
                <div className="flex items-end gap-6 text-primary font-bold mb-4 px-2">
                    <div className="flex items-center gap-3 text-2xl tracking-wide">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        My Sessions
                    </div>
                    <span className="text-3xl tracking-widest">{bookings.length}/3</span>
                </div>
                
                {/* Horizontal Divider */}
                <hr className="border-t-2 border-surface-border mb-10 w-full" />

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-items-center">

                    {bookings.map((booking: BookingItem) => (
                        <Link 
                            href={`/companies/${booking.company?.id || ''}`}
                            key={booking.id} 
                            className="bg-surface border-2 border-primary rounded-4xl flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-85 h-105 overflow-hidden group cursor-pointer"
                        >
                            
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex justify-between items-center text-xs md:text-sm font-bold text-foreground pb-3 border-b-2 border-surface-border">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        {booking.company?.name || "Unknown"}
                                    </span>
                                    <span className="tracking-widest uppercase">
                                        May {booking.bookingDate.split("-")[2].split("T")[0]} 2022
                                    </span>
                                </div>
                                
                                <div className="flex-1 flex flex-col items-center justify-center mt-5">
                                    <div className="w-28 h-28 bg-background border-2 border-surface-border rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
                                            {booking.company?.id ? (
                                                <Image
                                                    src={`/images/${booking.company.id}.png`}
                                                    alt={booking.company.name + " logo"}
                                                    className="object-cover w-full h-full"
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                        e.currentTarget.style.display = 'none';
                                                        const fallback: HTMLSpanElement = document.createElement('span');
                                                        fallback.className = 'text-foreground/50 font-bold text-center text-xs';
                                                        fallback.innerHTML = `LOGO<br />${booking.company?.name || 'Unknown'}`;
                                                        e.currentTarget.parentNode?.appendChild(fallback);
                                                    }}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    priority
                                                />
                                            ) : (
                                                <span className="text-foreground/50 font-bold text-center text-xs">LOGO<br />Unknown</span>
                                            )}
                                        </div>
                                </div>
                            </div>
                            
                            <div className="bg-primary text-white p-6 pt-5 flex flex-col gap-2 text-xs md:text-sm font-bold">
                                <span className="flex items-center gap-3">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    {booking.company.address + ", " + booking.company.district + ", " + booking.company.province + ", " + booking.company.postalcode}
                                </span>
                                <span className="flex items-center gap-3">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                                    {booking.company.website}
                                </span>
                                <span className="flex items-center gap-3">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                    {booking.company.tel}
                                </span>

                                <div className="flex justify-center gap-6 mt-4">
                                    
                                    {/* Edit Button */}
                                    <button 
                                        onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setUpdatingBooking(booking); }} 
                                        className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white hover:text-primary hover:scale-110 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative z-20"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    </button>
                                    
                                    {/* Delete Button */}
                                    <button 
                                        onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setDeletingBooking(booking); }} 
                                        className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white hover:text-red-500 hover:scale-110 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative z-20"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                    </button>
                                </div>

                            </div>
                        </Link>
                    ))}

                    {bookings.length < 3 && Array.from({ length: 3 - bookings.length }).map((_, index) => (
                        <Link key={index} href="/companies" className="group bg-surface border-2 border-surface-border hover:border-primary rounded-4xl flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-85 h-105 cursor-pointer overflow-hidden">
                            
                            <div className="flex-1 flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-300">
                                <span className="text-[100px] text-surface-border font-light group-hover:scale-110 group-hover:text-primary transition-all drop-shadow-sm leading-none">+</span>
                            </div>

                            <div className="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white p-6 flex items-center justify-center h-20 transition-all duration-300">
                                <h3 className="font-bold text-xl tracking-wider uppercase">Book a Session</h3>
                            </div>
                            
                        </Link>
                    ))}

                </div>
            </div>

            <div className="mt-auto pt-16 relative w-full flex justify-center z-0 pointer-events-none mb-4">
                <div className="relative w-75 md:w-112.5 aspect-4/3 opacity-80">
                    <Image 
                        src="/images/file-bundle.svg" 
                        alt="Woman with Files Illustration"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </div>

            {updatingBooking !== null && (
                <UpdateBookingPanel 
                    companyName={updatingBooking.company?.name || "Unknown Company"} 
                    oldDate={updatingBooking.bookingDate}  
                    onClose={() => setUpdatingBooking(null)} 
                    onUpdate={(e: React.MouseEvent, date: string) => { handleUpdate(e, updatingBooking, userToken, date); setUpdatingBooking(null); }}
                />
            )}

            {deletingBooking !== null && (
                <DeleteBookingPanel 
                    booking={deletingBooking} 
                    onClose={() => setDeletingBooking(null)} 
                    onDelete={(e: React.MouseEvent) => { handleDelete(e, deletingBooking, userToken); setDeletingBooking(null); }}
                />
            )}

        </main>
    );
}