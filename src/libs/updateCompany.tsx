import { CompanyItem } from "../../interfaces";

export default async function updateCompany(
  id: string,
  token: string,
  data: Partial<CompanyItem>
) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Update failed: ${text}`);
  }

  return await response.json();
}
