"use client";

import { useState } from "react";
import { CompanyItem } from "../../interfaces";
import CompanyCard from "./CompanyCard";


export default function CompanyList({ companies }: { companies: CompanyItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.province?.toLowerCase().includes(query.toLowerCase()) ||
      c.district?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search companies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-primary rounded-full text-sm font-semibold tracking-widest text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

     {/* Section label */}
        <div className="flex items-center gap-2 mb-4 text-primary font-bold tracking-widest uppercase text-base border-b border-surface-border pb-3">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
            </svg>
            Companies
        </div>

      {/* 3-column grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-sm font-semibold tracking-widest uppercase text-foreground/45 py-16">No companies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))}
        </div>
      )}
    </>
  );
}