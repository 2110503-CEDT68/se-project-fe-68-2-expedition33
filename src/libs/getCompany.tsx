import { CompanyDetailResponse } from "@/../interfaces";

export default async function getCompany(id: string, token?: string): Promise<CompanyDetailResponse>{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
        cache: "no-store",
        headers: token ? {
            "Authorization": `Bearer ${token}`,
        } : {},
    });

    if (!response.ok) {
        throw new Error("Failed to fetch company");
    }

    const payload = (await response.json()) as CompanyDetailResponse;

    return payload;
}