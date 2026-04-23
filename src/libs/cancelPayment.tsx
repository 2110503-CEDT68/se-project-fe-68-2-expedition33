export default async function cancelPayment(paymentId: string, token: string, reason?: string) {
    const body: Record<string, any> = {};
    if (reason) {
        body.reason = reason;
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${paymentId}/cancel`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to cancel payment");
    }

    return await response.json();
}
