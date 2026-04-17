"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { CompanyItem, UserItem } from "../../interfaces";
import UpdateCompanyPanel from "./modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "./modals/DeleteCompanyPanel";
import ProfileCard from "./ProfileCard";
import AdminCompanyDetail from "./AdminCompanyDetail";

export default function CompanyProfile({ user, token }: Readonly<{ user: UserItem, token: string }>) {
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const[updating, setUpdating] = useState<CompanyItem | null>(null);
  const[deleting, setDeleting] = useState<CompanyItem | null>(null);

  useEffect(() => {
    if (!user.companyData) return;
    setCompany(user.companyData);
  }, [user]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-10 mb-10 relative">
      
      {/* ── Header ── */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm text-center">
        Company Profile
      </h1>
      
      {/* ── Top: Company Profile ── */}
      <div className="w-full max-w-2xl z-10">
        <ProfileCard user={user} />
      </div>

      {/* ── Bottom: Company INFO ── */}
      <div className="w-full flex flex-col items-center gap-4 z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm text-center mt-15">
          Company Details
        </h1>
        
        <div className="w-full flex justify-center">
          {company ? (
            <AdminCompanyDetail company={company} adminToken={token}/> 
          ) : ""}
        </div>
      </div>

      {/* --- Modals --- */}
      {updating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setUpdating(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <UpdateCompanyPanel
              company={updating}
              token={token}
              onClose={() => setUpdating(null)}
              onUpdated={() => globalThis.location.reload()}
            />
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setDeleting(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <DeleteCompanyPanel
              company={deleting}
              token={token}
              onClose={() => setDeleting(null)}
              onDeleted={() => signOut({ callbackUrl: "/api/auth/login" })}
            />
          </div>
        </div>
      )}
    </div>
  );
}