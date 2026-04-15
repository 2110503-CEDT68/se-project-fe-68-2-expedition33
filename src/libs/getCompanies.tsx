import { CompanyResponse } from "../../interfaces";
import { getCompaniesResponse } from "@/mocks/mockStore";

export default async function getCompanies(): Promise<CompanyResponse> {
    if (process.env.USE_MOCK_API === "true") {
        return getCompaniesResponse();
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`);

    if (!response.ok) {
        throw new Error("Failed to fetch companies");
    }

    return await response.json();
}