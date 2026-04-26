import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getUserProfile from "@/libs/getUserProfile";
import LinearProgress from "@mui/material/LinearProgress";
import UserProfile from "@/components/profile/UserProfile";
import AdminProfile from "@/components/profile/AdminProfile";
import CompanyProfile from "@/components/profile/CompanyProfile";

async function ProfileData() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/login");
  }

  const profileResponse = await getUserProfile(session.user.token);
  const user = profileResponse.data;

  if (user.role === "admin") {
    return <AdminProfile user={user} token={session.user.token} />;
  } else if (user.role === "company") {
    return <CompanyProfile user={user} token={session.user.token} />;
  } else {
    return <UserProfile user={user} />;
  }

}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center pt-32 md:pt-40 px-6 pb-16">
      <Suspense
        fallback={
          <div className="w-full flex-1 flex flex-col items-center justify-center text-primary font-bold text-xl tracking-widest gap-4">
            Loading Profile...
            <div className="w-full max-w-md mt-4">
              <LinearProgress color="warning" />
            </div>
          </div>
        }
      >
        <ProfileData />
      </Suspense>
    </main>
  );
}