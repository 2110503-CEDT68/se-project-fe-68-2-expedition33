"use client"
import { useState } from "react";
import { CompanyItem } from "@/../interfaces";
import CompanyDetail from "./CompanyDetail";
import UpdateCompanyPanel from "../modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "../modals/DeleteCompanyPanel";
import { signOut } from "next-auth/react";

export default function AdminCompanyDetail({
  company,
  adminToken,
  isCompany = false,
  showBookButton = false
}: Readonly<{
  company: CompanyItem,
  adminToken?: string,
  isCompany?: boolean,
  showBookButton?: boolean
}>) {
  const [updating, setUpdating] = useState<CompanyItem | null>(null);
  const [deleting, setDeleting] = useState<CompanyItem | null>(null);

  return (
    <>
      <CompanyDetail
        company={company}
        token={adminToken}
        isAdmin={true}
        showBookButton={showBookButton} 
        footerActions={
          <div className="flex flex-wrap items-center gap-4">

            {/* --- UPDATE BUTTON --- */}
            <button
              onClick={() => setUpdating(company)}
              className="bg-button-blue hover:bg-button-blue-hover text-white px-6 py-2 rounded-full font-semibold transition-all active:scale-95 duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              Update
            </button>

            {/* --- DELETE BUTTON --- */}
            <button
              onClick={() => setDeleting(company)}
              className="bg-button-red hover:bg-button-red-hover text-white px-6 py-2 rounded-full font-semibold transition-all active:scale-95 duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              Delete
            </button>
          </div>
        }
      />

      {updating && adminToken && (
        <UpdateCompanyPanel
          company={updating}
          token={adminToken}
          onClose={() => setUpdating(null)}
        />
      )}

      {deleting && adminToken && (
        <DeleteCompanyPanel
          company={deleting}
          token={adminToken}
          onClose={() => setDeleting(null)}
          onDeleted={() => {
            if (isCompany)
              signOut({ callbackUrl: "/api/auth/login" });
            else
              globalThis.location.href = "/companies";
          }}
        />
      )}

      {!adminToken && (
        <p className="mt-4 text-sm text-button-red font-semibold">Admin token is missing.</p>
      )}
    </>
  );
}