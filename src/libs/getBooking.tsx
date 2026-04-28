import { BookingItem } from "@/../interfaces";

export default async function getBooking(id: string, token: string): Promise<BookingItem>{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch booking");
    }

    return (await response.json()).data;
}