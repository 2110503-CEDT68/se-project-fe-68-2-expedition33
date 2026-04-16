"use client"
import { useState } from "react";
import { CompanyItem } from "../../interfaces";
import UserCompanyDetail from "./UserCompanyDetail";
import UpdateCompanyPanel from "./modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "./modals/DeleteCompanyPanel";

export default function AdminCompanyDetail({
  company,
  adminToken
}: Readonly<{
  company: CompanyItem;
  adminToken?: string;
}>) {
  const [updating, setUpdating] = useState<CompanyItem | null>(null);
  const [deleting, setDeleting] = useState<CompanyItem | null>(null);

  return (
    <>
      <UserCompanyDetail
        company={company}
        token={adminToken}
        isAdmin={true}
        showBooking={true}
        footerActions={
          <>
            <button
              onClick={() => setUpdating(company)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Update
            </button>

            <button
              onClick={() => setDeleting(company)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Delete
            </button>
          </>
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