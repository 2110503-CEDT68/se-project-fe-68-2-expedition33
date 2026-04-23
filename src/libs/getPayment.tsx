import { PaymentItem, ApiResponse } from "../../interfaces";

export default async function getPaymentById(id: string): Promise<PaymentItem> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch payment");
    }

    const data: ApiResponse<PaymentItem> = await res.json();
    return data.data;
}