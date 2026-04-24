import { PaymentItem, ApiResponse } from "@/../interfaces";

export default async function updatePayment(id: string, token: string, status: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }), // ส่งค่า status ไปอัปเดต (เช่น 'captured')
  });

  if (!response.ok) {
    throw new Error("Failed to update payment");
  }

  return await response.json();
}