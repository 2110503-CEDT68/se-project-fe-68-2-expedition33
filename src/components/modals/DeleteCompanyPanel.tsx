"use client";
import deleteCompany from "@/libs/deleteCompany";
import { CompanyItem } from "../../../interfaces";
import { useState } from "react";

export default function DeleteCompanyPanel({
  company,
  token,
  onClose,
  onDeleted
}: Readonly<{
  company: CompanyItem;
  token: string;
  onClose: () => void;
  onDeleted: () => void;
}>) {
  const [loading, setLoading] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCompany(company.id, token);
      onDeleted();
      onClose();
    } catch (err) {
      console.error('Failed to delete company: ', err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-md px-10 py-8 relative shadow-2xl text-center">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-50 rounded-2xl">
            <span className="text-primary font-bold text-lg animate-pulse">Deleting...</span>
          </div>
        )}

        <button
          onClick={onClose}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          className={`absolute top-4 right-5 text-2xl text-primary transition-transform duration-150 ${
            closeHovered ? "scale-125 -rotate-12" : "scale-100"
          }`}
        >
          ↩
        </button>

        <h2 className="text-3xl font-bold tracking-[0.2em] mb-5 text-primary">
          Delete Company
        </h2>

        <p className="text-sm tracking-[0.15em] mb-6 text-foreground/70">
          Do you want to Delete company?
        </p>

        <button
          onClick={handleDelete}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          disabled={loading}
          className={`px-10 py-2 rounded-lg font-bold tracking-[0.2em] text-white transition-all duration-150 
            ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
            ${deleteHovered ? "bg-primary-hover -translate-y-0.5 shadow-lg shadow-primary/30" : "bg-primary"}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}