import { BookingResponse } from "../../interfaces";
import { getBookingsResponse } from "@/mocks/mockStore";

export default async function getBookings(token: string): Promise<BookingResponse> {
    if (process.env.USE_MOCK_API === "true") {
        return getBookingsResponse();
    }

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