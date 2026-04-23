'use client';

import React from 'react';
import { useClickOutside } from '@/components/useClickOutside';

interface DateOption {
  date: number;
  month: string;
}

interface AddDateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  availableDates: DateOption[];
  onPurchase?: (selectedDates: number[]) => void;
}

const AddDateListModal: React.FC<AddDateListModalProps> = ({
  isOpen,
  onClose,
  companyName,
  availableDates,
  onPurchase,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [selectedDates, setSelectedDates] = React.useState<number[]>([0, 3]);

  useClickOutside(modalRef, onClose);

  const handleToggleDate = (index: number) => {
    setSelectedDates((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePurchase = () => {
    onPurchase?.(selectedDates);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-3xl p-12 max-w-2xl w-full shadow-2xl">
        {/* Close Button */}
        <div className="text-right mb-6">
          <button
            onClick={onClose}
            className="text-orange-500 hover:text-orange-600 text-3xl font-bold"
          >
            ↗
          </button>
        </div>

        {/* Title */}
        <h2 className="text-center text-4xl font-bold text-orange-500 mb-3">
          Add Date List
        </h2>
        <p className="text-center text-orange-500 font-semibold text-lg mb-8">
          {companyName}
        </p>

        {/* Date Options Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {availableDates.map((item, index) => (
            <button
              key={index}
              onClick={() => handleToggleDate(index)}
              className={`py-8 px-4 rounded-2xl font-semibold text-center transition-all text-white ${
                selectedDates.includes(index)
                  ? 'bg-orange-500'
                  : 'bg-orange-300 hover:bg-orange-400'
              }`}
            >
              <div className="text-2xl font-bold">{item.date}</div>
              <div className="text-sm">{item.month}</div>
            </button>
          ))}
        </div>

        {/* Info Text */}
        <p className="text-center text-black text-sm mb-2">
          Purchase for additional organizing job fair interviews dates
        </p>
        <p className="text-center text-orange-500 font-semibold text-sm mb-8">
          Additional Dates 300 Bath per day
        </p>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-orange-500">300 B</div>
        </div>

        {/* Purchase Button */}
        <div className="text-center mb-8">
          <button
            onClick={handlePurchase}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-full transition-colors text-lg"
          >
            Purchase
          </button>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-b from-orange-100 to-orange-50 rounded-full flex items-center justify-center">
            <svg
              className="w-20 h-20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simple person illustration */}
              <circle cx="50" cy="25" r="12" fill="#FF6B35" />
              <path
                d="M50 40 L35 60 L45 55 L45 75 L55 75 L55 55 L65 60 Z"
                fill="#2C2C2C"
              />
              <rect x="38" y="42" width="24" height="8" fill="#FF6B35" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDateListModal;