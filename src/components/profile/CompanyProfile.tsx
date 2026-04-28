"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { CompanyItem, UserItem } from "@/../interfaces";
import UpdateCompanyPanel from "../modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "../modals/DeleteCompanyPanel";
import ProfileCard from "./ProfileCard";
import AdminCompanyDetail from "../companies/AdminCompanyDetail";

export default function CompanyProfile({ user, token }: Readonly<{ user: UserItem, token: string }>) {
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [updating, setUpdating] = useState<CompanyItem | null>(null);
  const [deleting, setDeleting] = useState<CompanyItem | null>(null);

  useEffect(() => {
    if (!user.companyData) return;
    setCompany(user.companyData);
  }, [user]);

  if (!company) {
    return (
      <div className="max-h-full h-full flex flex-col items-center">
        <div className="w-full bg-surface border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm">
          <h1>
            ERROR: There is no company data for this mananger account.
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-10 mb-10 relative">
      
      {/* ── Header ── */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm text-center">
        Company Profile
      </h1>
      
      {/* ── Company Profile & Detail ── */}
      <div className="w-full">
        <ProfileCard user={user}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm text-center">
            Company Details
          </h1>
          
          {
            company ? (
            <div className="w-full flex justify-center">    
                <AdminCompanyDetail company={company} adminToken={token} isCompany={true}/> 
            </div>
            ) : null
          }

        </ProfileCard>

      </div>

      {/* --- Modals --- */}
      {updating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-surface border border-surface-border rounded-3xl shadow-2xl w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setUpdating(null)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground bg-surface-border/30 hover:bg-surface-border/60 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <UpdateCompanyPanel
              company={updating}
              token={token}
              onClose={() => setUpdating(null)}
            />
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-surface border border-surface-border rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setDeleting(null)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground bg-surface-border/30 hover:bg-surface-border/60 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
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