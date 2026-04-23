'use client';

import React from 'react';
import Link from 'next/link';

interface DateOption {
  date: number;
  month: string;
}

interface CompanyPaymentRecord {
  id: number;
  companyName: string;
  totalAmount: string;
  latestUpdate: string;
  ratingDots: number;
  dotColor: string;
  availableDates: DateOption[];
}

interface CompanyReveProps {
  onSelectCompany?: (company: CompanyPaymentRecord) => void;
}

const CompanyReseve: React.FC<CompanyReveProps> = () => {

  const companies: CompanyPaymentRecord[] = [
    {
      id: 1,
      companyName: 'Name Company A',
      totalAmount: '600B',
      latestUpdate: '15/04/2022 15:00',
      ratingDots: 4,
      dotColor: 'bg-orange-500',
      availableDates: [
        { date: 10, month: 'May' },
        { date: 11, month: 'May' },
        { date: 12, month: 'May' },
        { date: 13, month: 'May' },
      ],
    },
    {
      id: 2,
      companyName: 'Name Company B',
      totalAmount: '300B',
      latestUpdate: '10/03/2022 09:10',
      ratingDots: 3,
      dotColor: 'bg-orange-500',
      availableDates: [
        { date: 15, month: 'May' },
        { date: 16, month: 'May' },
        { date: 17, month: 'May' },
        { date: 18, month: 'May' },
      ],
    },
    {
      id: 3,
      companyName: 'Name Company C',
      totalAmount: '300B',
      latestUpdate: '01/01/2022 10:30',
      ratingDots: 2,
      dotColor: 'bg-orange-500',
      availableDates: [
        { date: 20, month: 'May' },
        { date: 21, month: 'May' },
        { date: 22, month: 'May' },
        { date: 23, month: 'May' },
      ],
    },
    {
      id: 4,
      companyName: 'Name Company D',
      totalAmount: '600B',
      latestUpdate: '22/12/2022 11:11',
      ratingDots: 3,
      dotColor: 'bg-orange-500',
      availableDates: [
        { date: 25, month: 'May' },
        { date: 26, month: 'May' },
        { date: 27, month: 'May' },
        { date: 28, month: 'May' },
      ],
    },
    {
      id: 5,
      companyName: 'Name Company E',
      totalAmount: '300B',
      latestUpdate: '13/03/2022 21:00',
      ratingDots: 3,
      dotColor: 'bg-orange-500',
      availableDates: [
        { date: 30, month: 'May' },
        { date: 31, month: 'May' },
        { date: 1, month: 'Jun' },
        { date: 2, month: 'Jun' },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="text-orange-500 text-2xl">⏱</div>
        <h2 className="text-2xl font-bold text-black">Payment History</h2>
      </div>

      {/* Company Cards List */}
      <div className="space-y-4">
        {companies.map((company) => (
          <Link key={company.id} href={`/details`}>
            <div className="w-full flex items-center gap-4 p-4 rounded-lg transition-all border-2 bg-white border-gray-200 shadow-sm hover:border-orange-500 cursor-pointer hover:shadow-lg">
              {/* Company Logo */}
              <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-black text-xs font-semibold text-center px-1">
                  Logo
                  <br />
                  {company.companyName.split(' ')[2]}
                </span>
              </div>

              {/* Company Details */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-black text-lg">
                    {company.companyName}
                  </h3>
                </div>
                <p className="text-black text-sm mb-1">
                  Total Amount: <span className="font-semibold">{company.totalAmount}</span>
                </p>
                <p className="text-gray-600 text-xs mb-3">
                  Latest update: {company.latestUpdate}
                </p>

                {/* Color Indicators for Reserved Dates */}
                <div className="flex gap-2 items-center">
                  <span className="text-black text-xs font-semibold">Reserved:</span>
                  {company.availableDates.map((date) => (
                    <div
                      key={`${date.date}-${date.month}`}
                      className={`w-4 h-4 rounded-full ${company.dotColor}`}
                      title={`${date.date} ${date.month}`}
                    />
                  ))}
                </div>
              </div>

              {/* Color Indicator Bar */}
              <div
                className={`w-1 h-24 rounded-r-lg shrink-0 ${company.dotColor}`}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyReseve;
