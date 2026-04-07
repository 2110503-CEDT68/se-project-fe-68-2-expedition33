import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCompany from "@/libs/getCompany";
import AdminCompanyDetail from "@/components/AdminCompanyDetail";
import UserCompanyDetail from "@/components/UserCompanyDetail";

export default async function CompanyDetailPage({ params }: { params: Promise<{ cid: string }> }) {
  
    const { cid } = await params;
    const session = await getServerSession(authOptions);
    const company = await getCompany(cid);

    const role = session?.user?.role;
    const token = session?.user?.token;

    return (
        <main className="relative min-h-screen flex flex-col items-center pt-24">
        {
            role === "admin"
            ? <AdminCompanyDetail company={company} adminToken={token} />
            : <UserCompanyDetail company={company} token={token} isAdmin={false} />
        }
        </main>
    );
}