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
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-10">
      
      {/* ── Header ── */}
      <h1 className="lg:col-span-5 text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm text-center lg:text-left">
        Company Profile
      </h1>
      
      {/* ── Left: Company Profile ── */}
      <div className="lg:col-span-2 w-full">
        <ProfileCard user={user} />
      </div>

      {/* ── Right: Company INFO ── */}
      <div className="lg:col-span-3">
      
        {
          company ?
          <AdminCompanyDetail company={company} adminToken={token}/> 
          : ""
        }

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