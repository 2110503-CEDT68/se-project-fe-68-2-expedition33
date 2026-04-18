import { UserItem } from "../../interfaces";
import CompanyCreateForm from "./CompanyCreateForm";
import ProfileCard from "./ProfileCard";

export default function AdminProfile({ user, token }: Readonly<{ user: UserItem, token: string }>) {


  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

      {/* ── Left: Admin Profile ── */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          Admin Profile
        </h1>
        <ProfileCard user={user} />
      </div>

      {/* ── Right: Create Company ── */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          Add New Company      
        </h1>
        <CompanyCreateForm token={token}/>
      </div>
    </div>
  );
}