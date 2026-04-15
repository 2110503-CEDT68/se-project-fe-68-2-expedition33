import getCompanies from "./getCompanies";
import { CompanyItem } from "../../interfaces";

export default async function getCompanyMe(
  token: string,
  userId: string
): Promise<CompanyItem | null> {

  const res = await getCompanies(); 
  const companies = res.data;       

  const myCompany = companies.find((c: any) => {
    const managerId =
      typeof c.managerAccount === "object"
        ? c.managerAccount._id || c.managerAccount.toString()
        : c.managerAccount;

    return String(managerId) === String(userId);
  });

  return myCompany || null;
}