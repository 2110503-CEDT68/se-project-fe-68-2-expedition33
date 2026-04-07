import { CompanyItem, CompanyPayload } from "../../interfaces";

export default async function createCompany(
  token: string,
  payload: CompanyPayload
): Promise<{ success: boolean; data: CompanyItem }> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to create company");
  }

  return res.json();
}