'use client';

import { useState } from "react";
import SelectDateBox from "@/components/payments/SelectDateBox";
import CompanyReseve from "@/components/payments/CompanyReserve";
import AddDateListModal from "@/components/payments/AddDateListModal";

export default function Paymentpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for the modal
  const mockCompanyData = {
    companyName: 'Company A',
    availableDates: [
      { date: 10, month: 'May' },
      { date: 11, month: 'May' },
      { date: 12, month: 'May' },
      { date: 13, month: 'May' },
    ],
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  return(
      <main className="flex flex-row pt-24 px-8 gap-8 ">

        <div className="flex flex-row">
            <div className="flex flex-col items-start justify-start w-fit p-10 m-5 rounded-lg shadow-md bg-gray-900">
            <div className="text-white font-semibold mb-4 text-center"> Date List </div>
            
            <SelectDateBox onPurchaseClick={handlePurchaseClick} />
            
        </div>


    </div>
      <CompanyReseve />

      {/* Add Date List Modal - Using Mock Data */}
      <AddDateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyName={mockCompanyData.companyName}
        availableDates={mockCompanyData.availableDates}
        onPurchase={(selectedDates) => {
          console.log('Purchased dates:', selectedDates);
          setIsModalOpen(false);
        }}
      />
      
    </main>
  );
}