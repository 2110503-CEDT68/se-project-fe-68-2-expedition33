import { PaymentResponse } from "@/../interfaces";

export default async function getPayments(token: string) : Promise<PaymentResponse> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments`, {
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