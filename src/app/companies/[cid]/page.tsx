import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCompany from "@/libs/getCompany";
import AdminCompanyDetail from "@/components/AdminCompanyDetail";
import UserCompanyDetail from "@/components/UserCompanyDetail";

export default async function CompanyDetailPage({ params }: Readonly<{ params: Promise<{ cid: string }> }>) {
  
    const { cid } = await params;
    const session = await getServerSession(authOptions);
    const company = await getCompany(cid);

    const role = session?.user?.role;
    const token = session?.user?.token;
    const userId = session?.user?.id;

    let detailComponent;
    if (role === "admin" || (role === "company" && company.managerAccount === userId)) {
        detailComponent = <AdminCompanyDetail company={company} adminToken={token} showBookButton={role !== "company"} />;
    } else {
        detailComponent = <UserCompanyDetail company={company} token={token} isAdmin={false} showBookButton={role !== "company"} />;
    }

    return (
        <main className="relative min-h-screen flex flex-col items-center pt-30 pb-30">
            {detailComponent}
        </main>
    );
}