import {PaymentResponse} from "../../interfaces";

export default async function getPayments(token: string) : Promise<PaymentResponse> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/payments`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch payments");
    }

    const data = await res.json();
    return data.data;
}