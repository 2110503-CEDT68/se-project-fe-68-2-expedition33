export default async function cancelBooking(id: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}/cancel`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to cancel booking");
    }

    return await response.json();
}
