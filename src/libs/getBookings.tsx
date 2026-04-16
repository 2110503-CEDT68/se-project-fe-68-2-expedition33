import { BookingResponse } from "../../interfaces";

export default async function getBookings(token: string): Promise<BookingResponse> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return await response.json();
}