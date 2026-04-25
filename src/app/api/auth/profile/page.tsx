"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/store";
import LinearProgress from "@mui/material/LinearProgress";
import UserProfile from "@/components/profile/UserProfile";
import AdminProfile from "@/components/profile/AdminProfile";
import CompanyProfile from "@/components/profile/CompanyProfile";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { userProfile: user, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/login");
    }
  }, [status, router]);

  if (status === "loading" || loading || !user) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center pt-32 md:pt-40 px-6 pb-16">
        <div className="w-full flex-1 flex flex-col items-center justify-center text-primary font-bold text-xl tracking-widest gap-4">
          Loading Profile...
          <div className="w-full max-w-md mt-4">
            <LinearProgress color="warning" />
          </div>
        </div>
      </main>
    );
  }

  let profileComponent;
  if (user.role === "admin") {
    profileComponent = <AdminProfile user={user} token={session?.user?.token || ""} />;
  } else if (user.role === "company") {
    profileComponent = <CompanyProfile user={user} token={session?.user?.token || ""} />;
  } else {
    profileComponent = <UserProfile user={user} />;
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center pt-32 md:pt-40 px-6 pb-16">
      {profileComponent}
    </main>
  );
}