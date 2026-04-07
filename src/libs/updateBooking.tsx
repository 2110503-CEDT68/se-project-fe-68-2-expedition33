import { BookingItem } from "../../interfaces";

export default async function updateBooking(id: string, token: string, bookingDate: string): Promise<BookingItem>{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                bookingDate: bookingDate,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update booking");
    }

    return await response.json();
}