import { PaymentItem } from "@/../interfaces";

export default async function getPayments(): Promise<PaymentItem[]> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/payments`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch payments");
    }

    const data = await res.json();
    return data.data;
}