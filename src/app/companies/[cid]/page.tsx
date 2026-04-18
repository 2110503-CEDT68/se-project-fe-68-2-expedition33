import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCompany from "@/libs/getCompany";
import AdminCompanyDetail from "@/components/AdminCompanyDetail";
import CompanyDetail from "@/components/CompanyDetail";
import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";

async function CompanyDetailContent({ params }: Readonly<{ params: Promise<{ cid: string }> }>) {
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
        detailComponent = <CompanyDetail company={company} token={token} isAdmin={false} showBookButton={role !== "company"} />;
    }

    return (
        <main className="relative min-h-screen flex flex-col items-center pt-30 pb-30">
            {detailComponent}
        </main>
    );
}

export default function CompanyDetailPage({ params }: Readonly<{ params: Promise<{ cid: string }> }>) {
    return (
        <Suspense
            fallback={
                <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-primary font-bold text-xl tracking-widest gap-4">
                    Loading Company...
                    <div className="w-full max-w-md">
                        <LinearProgress color="warning" />
                    </div>
                </div>
            }
        >
            <CompanyDetailContent params={params} />
        </Suspense>
    );
}