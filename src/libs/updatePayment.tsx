import { PaymentItem, ApiResponse } from "../../interfaces";

export default async function updatePayment(
    id: string,
    token: string,
    dateList: string[]
): Promise<PaymentItem> {

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dateList }),
    });

    if (!res.ok) {
        throw new Error("Failed to update payment");
    }

    const data: ApiResponse<PaymentItem> = await res.json();
    return data.data;
}