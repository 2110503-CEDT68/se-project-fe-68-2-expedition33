"use client"
import { useState } from "react";
import { CompanyItem } from "../../interfaces";
import UserCompanyDetail from "./UserCompanyDetail";
import UpdateCompanyPanel from "./modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "./modals/DeleteCompanyPanel";

export default function AdminCompanyDetail({
  company,
  adminToken,
  showBookButton = false
}: Readonly<{
  company: CompanyItem,
  adminToken?: string,
  showBookButton?: boolean
}>) {
  const [updating, setUpdating] = useState<CompanyItem | null>(null);
  const [deleting, setDeleting] = useState<CompanyItem | null>(null);

  return (
    <>
      <UserCompanyDetail
        company={company}
        token={adminToken}
        isAdmin={true}
        showBookButton={showBookButton} 
        footerActions={
          <div className="flex flex-wrap items-center gap-4">

            {/* --- UPDATE BUTTON --- */}
            <button
              onClick={() => setUpdating(company)}
              className="bg-button-blue hover:bg-button-blue-hover text-white px-6 py-2 rounded-full font-semibold transition-all active:scale-95"
            >
              Update
            </button>

            {/* --- DELETE BUTTON --- */}
            <button
              onClick={() => setDeleting(company)}
              className="bg-button-red hover:bg-button-red-hover text-white px-6 py-2 rounded-full font-semibold transition-all active:scale-95"
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
          onUpdated={() => globalThis.location.reload()}
        />
      )}

      {deleting && adminToken && (
        <DeleteCompanyPanel
          company={deleting}
          token={adminToken}
          onClose={() => setDeleting(null)}
          onDeleted={() => {
            globalThis.location.href = "/companies";
          }}
        />
      )}

      {!adminToken && (
        <p className="mt-4 text-sm text-red-500 font-semibold">Admin token is missing.</p>
      )}
    </>
  );
}