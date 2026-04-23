'use client';

import React from 'react';

interface SelectDateBoxProps {
  onPurchaseClick?: () => void;
}

interface DateOption {
  date: number;
  month: string;
}

const SelectDateBox: React.FC<SelectDateBoxProps> = ({ onPurchaseClick }) => {
  const dates: DateOption[] = [
    { date: 10, month: 'May' },
    { date: 11, month: 'May' },
    { date: 12, month: 'May' },
    { date: 13, month: 'May' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Date Grid */}
      <div className="grid grid-cols-4 gap-10 mb-6 ">
        {dates.map((item, index) => (
          <button
            key={index}
            className={`py-10 px-12 rounded-2xl font-semibold text-center transition-all ${
              index === 1 || index === 2
                ? 'bg-primary text-white'
                : 'bg-primary/60 text-white'
            }`}
          >
            <div className="text-2xl font-bold">{item.date}</div>
            <div className="text-sm">{item.month}</div>
          </button>
        ))}
      </div>

      {/* Description Text */}
      <p className="text-center text-white text-sm mb-6">
        Purchase for additional organizing job fair interviews dates
      </p>

      {/* Purchase Button */}
      <div className="text-center">
        <button
          onClick={onPurchaseClick}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-8 rounded-full transition-colors"
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default SelectDateBox;
