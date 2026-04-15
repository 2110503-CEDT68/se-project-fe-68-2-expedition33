import { BookingItem } from "../../interfaces";
import { createBookingInStore } from "@/mocks/mockStore";
import getUserProfile from "./getUserProfile";

type CreateBookingResponse = {
    success: boolean;
    data: BookingItem;
};

export default async function createBooking(companyId: string, token: string, bookingDate: string): Promise<CreateBookingResponse> {
    if (process.env.USE_MOCK_API === "true") {
        return createBookingInStore(companyId, token, bookingDate);
    }

    const userId = (await getUserProfile(token)).data.id;
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${companyId}/bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                bookingDate: bookingDate,
                user: userId
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return await response.json();
}