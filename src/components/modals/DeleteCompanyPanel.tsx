"use client";
import deleteCompany from "@/libs/deleteCompany";
import { CompanyItem } from "../../../interfaces";
import { useState } from "react";

export default function DeleteCompanyPanel({
  company,
  token,
  onClose,
  onDeleted
}: {
  company: CompanyItem;
  token: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
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
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div
        className="rounded-2xl w-[90%] max-w-md px-10 py-8 relative shadow-lg text-center"
        style={{
          background: 'var(--surface)',
          color: 'var(--foreground)',
          border: '1px solid var(--surface-border)'
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-50 rounded-2xl">
            <span className="text-primary font-bold text-lg animate-pulse">Deleting...</span>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          className="absolute top-4 right-5 text-2xl"
          style={{
            color: 'var(--primary)',
            transform: closeHovered ? 'scale(1.2) rotate(-10deg)' : 'scale(1)',
            transition: 'transform 0.15s',
          }}
        >
          ↩
        </button>

        {/* Title */}
        <h2
          className="text-3xl font-bold tracking-[0.2em] mb-5"
          style={{ color: 'var(--primary)' }}
        >
          Delete Company
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm tracking-[0.15em] mb-6"
          style={{ color: 'var(--foreground)', opacity: 0.7 }}
        >
          Do you want to Delete company?
        </p>

        {/* Action */}
        <button
          onClick={handleDelete}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          className="px-10 py-2 rounded-lg font-bold tracking-[0.2em]"
          style={{
            background: deleteHovered
              ? 'color-mix(in srgb, var(--primary) 80%, black)'
              : 'var(--primary)',
            color: 'white',
            border: 'none',
            transform: deleteHovered ? 'translateY(-1px)' : 'translateY(0)',
            boxShadow: deleteHovered
              ? '0 4px 16px color-mix(in srgb, var(--primary) 35%, transparent)'
              : 'none',
            transition: 'background 0.18s, transform 0.15s, box-shadow 0.18s',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}