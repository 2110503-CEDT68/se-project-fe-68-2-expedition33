import { CompanyItem } from "../../interfaces";

type CompanyDetailApiResponse =
    | CompanyItem
    | {
          success: boolean;
          data: CompanyItem;
      };

export default async function getCompany(id: string): Promise<CompanyItem>{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch company");
    }

    return (await response.json()).data;
}