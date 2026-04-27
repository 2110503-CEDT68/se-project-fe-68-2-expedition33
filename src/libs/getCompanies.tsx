import { CompanyResponse } from "@/../interfaces";

export default async function getCompanies(token?: string): Promise<CompanyResponse> {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`, {
        cache: "no-store",
        headers: token ? {
            "Authorization": `Bearer ${token}`,
        } : {},
    });

    if (!response.ok) {
        throw new Error("Failed to fetch companies");
    }

    return await response.json();
}