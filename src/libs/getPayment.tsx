import { PaymentDetailResponse } from "@/../interfaces";

export default async function getPayment(id:string, token:string): Promise<PaymentDetailResponse> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch payments");
    }

    return await response.json();
}