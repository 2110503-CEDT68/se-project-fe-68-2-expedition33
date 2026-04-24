import { CreatePaymentResponse } from "@/../interfaces";

export default async function updatePayment(id: string, token: string, status: string) : Promise<CreatePaymentResponse> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update payment");
  }

  return await response.json();
}