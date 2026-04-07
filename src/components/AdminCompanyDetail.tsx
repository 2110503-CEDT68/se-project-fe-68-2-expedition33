"use client"
import { useState } from "react";
import Link from "next/link";
import { CompanyItem } from "../../interfaces";
import UserCompanyDetail from "./UserCompanyDetail";
import UpdateCompanyPanel from "./modals/UpdateCompanyPanel";
import DeleteCompanyPanel from "./modals/DeleteCompanyPanel";

export default function AdminCompanyDetail({
  company,
  adminToken
}: {
  company: CompanyItem;
  adminToken?: string;
}) {
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
          onUpdated={() => window.location.reload()}
        />
      )}

      {deleting && adminToken && (
        <DeleteCompanyPanel
          company={deleting}
          token={adminToken}
          onClose={() => setDeleting(null)}
          onDeleted={() => {
            window.location.href = "/companies";
          }}
        />
      )}

      {!adminToken && (
        <p className="mt-4 text-sm text-red-500 font-semibold">Admin token is missing.</p>
      )}
    </>
  );
}