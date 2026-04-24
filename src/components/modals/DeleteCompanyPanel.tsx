"use client";
import deleteCompany from "@/libs/deleteCompany";
import { CompanyItem } from "@/../interfaces";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

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
      <div ref={modalRef} className="bg-surface border border-surface-border rounded-2xl w-full max-w-lg px-10 py-8 relative shadow-2xl text-center">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-50 rounded-2xl">
            <span className="text-primary font-bold text-lg animate-pulse">Deleting...</span>
          </div>
        )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-foreground/50 hover:text-primary transition-colors text-xl"
      >
        ✕
      </button>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-primary tracking-widest uppercase drop-shadow-sm">
          Delete Company
        </h2>

        <p className="text-sm mb-6 text-foreground/70">
          Do you want to delete this company? <br/>
          This action cannot be undone.
        </p>

        <button
          onClick={handleDelete}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          disabled={loading}
          className={`px-10 py-2 rounded-full font-bold text-white transition-all duration-150 
            ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
            ${deleteHovered ? "bg-red-700 -translate-y-0.5 shadow-lg" : "bg-button-red"}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}