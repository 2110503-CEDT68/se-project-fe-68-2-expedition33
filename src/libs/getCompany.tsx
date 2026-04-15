import { CompanyDetailApiResponse, CompanyItem } from "../../interfaces";

export default async function getCompany(id: string): Promise<CompanyItem>{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch company");
    }

    const payload = (await response.json()) as CompanyDetailApiResponse;

    if ("data" in payload) {
        return payload.data;
    }

    return payload;
}