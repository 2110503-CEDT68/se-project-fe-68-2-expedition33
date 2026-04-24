'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getPayments from "@/libs/getPayments";
import { useSession } from "next-auth/react";

function hasCompanyData(user: any): user is { companyData: { id: string, name: string } } {
  return user && user.companyData && user.companyData.id;
}

interface DateOption {
  date: number;
  month: string;
}

interface CompanyPaymentRecord {
  id: string;
  companyName: string;
  logo?: {
    url?: string;
  };
  totalAmount: string;
  latestUpdate: string;
  availableDates: DateOption[];
}

interface CompanyReveProps {
  onSelectCompany?: (company: CompanyPaymentRecord) => void;
}

const CompanyReseve: React.FC<CompanyReveProps> = () => {

  const [companies, setCompanies] = useState<CompanyPaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user?.token;

        if (!token) {
          console.log("NO TOKEN");
          setLoading(false);
          return;
        }

        const payments = await getPayments(token);

        const mapped = payments.map((item) => ({
          id: item.id,
          companyName: item.company?.name || "Unknown Company",
          logo: item.company?.logo?.url
            ? { url: item.company.logo.url }
            : undefined,
          totalAmount: `${item.totalPrice}B`,
          latestUpdate: new Date(item.updatedAt).toLocaleString(),
          availableDates: (item.dateList || []).map((d: string) => {
            const dateObj = new Date(d);
            return {
              date: dateObj.getDate(),
              month: dateObj.toLocaleString('en-US', { month: 'short' }),
            };
          }),
        }));

        setCompanies(mapped);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchData();
  }, [session]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="text-primary text-2xl">⏱</div>
        <h2 className="text-2xl font-bold text-foreground">Payment History</h2>
      </div>

      {loading ? (
        <div className="text-center text-foreground/50 py-10">
          Loading...
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center text-foreground/50 py-10">
          No Payments
        </div>
      ) : (
        <div className="space-y-4">
          {companies.map((company) => (
            <Link key={company.id} href={`/payments/${company.id}`}>
              <div className="w-full flex items-center gap-4 p-4 rounded-lg transition-all border-2 bg-background border-surface-border shadow-sm hover:border-primary cursor-pointer hover:shadow-lg">

                {/* Company Logo */}
                <div className="w-20 h-20 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {company.logo?.url ? (
                    <img
                      src={company.logo.url}
                      alt={`${company.companyName} Logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-foreground/40">No Logo</span>
                  )}
                </div>

                {/* Company Details */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-foreground text-lg">
                      {company.companyName}
                    </h3>
                  </div>
                  <p className="text-foreground text-sm mb-1">
                    Total Amount: <span className="font-semibold">{company.totalAmount}</span>
                  </p>
                  <p className="text-foreground/50 text-xs mb-3">
                    Latest update: {company.latestUpdate}
                  </p>

                  <div className="flex gap-2 items-center">
                    <span className="text-foreground text-xs font-semibold">Reserved:</span>
                    {company.availableDates.map((date, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full bg-primary"
                        title={`${date.date} ${date.month}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-1 h-24 rounded-r-lg flex-shrink-0 bg-primary" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyReseve;
