export default async function deleteCompany(id: string, token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Delete failed: ${text}`);
  }

  return await response.json();
}