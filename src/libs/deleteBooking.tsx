export default async function deleteBooking(id: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`,
        {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to remove booking");
    }

    return await response.json();
}