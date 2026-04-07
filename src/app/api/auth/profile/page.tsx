import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";
import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import UserProfile from "@/components/UserProfile";
import AdminProfile from "@/components/AdminProfile";

async function ProfileContent({ token }: { token: string }) {
  const response = await getUserProfile(token);
  const user = response.data;

  if (user.role === "admin") {
    return <AdminProfile user={user} />;
  }

  return <UserProfile user={user} />;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

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
        <ProfileContent token={session.user.token} />
      </Suspense>
    </main>
  );
}