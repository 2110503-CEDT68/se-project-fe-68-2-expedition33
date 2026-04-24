import { CreatePaymentResponse } from "@/../interfaces";

export default async function createPayment(
    companyId: string,
    token: string,
    dateList: string[]
): Promise<CreatePaymentResponse> {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${companyId}/payments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dateList }),
    });

    if (!response.ok) {
        throw new Error("Failed to create payment");
    }

    return await response.json();
}