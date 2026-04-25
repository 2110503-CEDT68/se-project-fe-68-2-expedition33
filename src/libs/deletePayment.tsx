import { SimpleResponse } from "@/../interfaces";

export default async function deletePayment(id: string, token: string): Promise<SimpleResponse<[]>> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to cancel payment");
  }

  return await response.json();
}