import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function PaymentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "company") {
    redirect("/api/auth/login");
  }

  return <>{children}</>;
}
