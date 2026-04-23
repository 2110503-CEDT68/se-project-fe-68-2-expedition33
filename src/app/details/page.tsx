'use client';

import { useState } from 'react';
import Link from 'next/link';
import CompanyDataComponent from '@/components/CompanyDataComponent';
import DateListComponent from '@/components/DateListComponent';
import PaymentEventComponent from '@/components/PaymentEventComponent';
import ReceiptComponent from '@/components/ReceiptComponent';
import TransactionErrorComponent from '@/components/TransactionErrorComponent';
import PaymentActionComponent from '@/components/PaymentActionComponent';

interface CompanyDetails {
  id: number;
  companyName: string;
  totalAmount: string;
  latestUpdate: string;
  dotColor: string;
  availableDates: { date: number; month: string }[];
}

export default function DetailsPage() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  // Mock data for company details
  const mockCompany: CompanyDetails = {
    id: 1,
    companyName: 'ABC Company Limited',
    totalAmount: '300 Bath',
    latestUpdate: '15/04/2022 15:00',
    dotColor: 'bg-blue-500',
    availableDates: [
      { date: 10, month: 'May' },
      { date: 11, month: 'May' },
      { date: 12, month: 'May' },
      { date: 13, month: 'May' },
    ],
  };

  const paymentEvents = [
    {
      title: 'PAYMENT_INITIATED',
      description: 'Payment initiated by user.',
      timestamp: '5 May 2022, 10:14 AM',
      status: 'success' as const,
    },
    {
      title: 'PAYMENT_AUTHORIZED',
      description: 'Payment authorized by payment gateway.',
      timestamp: '5 May 2022, 10:21 AM',
      status: 'success' as const,
    },
    {
      title: 'PAYMENT_SUCCESS',
      description: 'Payment captured successfully',
      timestamp: '5 May 2022, 10:27 AM',
      status: 'success' as const,
    },
  ];

  const handleDownloadReceipt = () => {
    console.log('Download receipt');
  };

  const handleViewInvoice = () => {
    console.log('View invoice');
  };

  const handleViewCompanyInfo = () => {
    console.log('View company info');
  };

  const handleConfirmPayment = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCancelPayment = () => {
    setIsCancelConfirmOpen(true);
  };

  const handleConfirmModalConfirm = () => {
    console.log('Payment confirmed');
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalCancel = () => {
    console.log('Payment confirmation cancelled');
    setIsConfirmModalOpen(false);
  };

  const handleCancelConfirmConfirm = () => {
    console.log('Payment cancelled');
    setIsCancelConfirmOpen(false);
  };

  const handleCancelConfirmCancel = () => {
    console.log('Cancel cancelled');
    setIsCancelConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/payments"
            className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2"
          >
            ← Back to Payment History
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Company Data Component */}
        <CompanyDataComponent
          data={{
            companyName: mockCompany.companyName,
            companyId: '1234567890abcdef',
            totalPrice: mockCompany.totalAmount,
            status: 'captured',
            paymentId: 'PAY-2022-123456',
            createdAt: '5 May 2022, 10:30 AM',
          }}
        />

        {/* Date List Component */}
        <DateListComponent dates={mockCompany.availableDates} />

        {/* Two Column Layout for Events and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Payment Events */}
          <PaymentEventComponent events={paymentEvents} />

          {/* Right - Transaction Error */}
          <TransactionErrorComponent errorType="CANCELLED" />
        </div>

        {/* Receipt Component */}
        <ReceiptComponent
          onDownloadReceipt={handleDownloadReceipt}
          onViewInvoice={handleViewInvoice}
          onViewCompanyInfo={handleViewCompanyInfo}
        />

        {/* Payment Action Component */}
        <PaymentActionComponent
          onConfirm={handleConfirmPayment}
          onCancel={handleCancelPayment}
        />
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[75%] max-w-2xl p-12">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={handleConfirmModalCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8"
              >
                ✕
              </button>
            </div>

            {/* Modal Header Icon */}
            <div className="flex items-center justify-end mb-8">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                {/* <span className="text-white text-xl">🅾</span> */}
              </div>
            </div>

            {/* Modal Title */}
            <h2 className="text-4xl font-bold text-center text-black mb-4">
              Confirm Payment
            </h2>

            {/* Modal Description */}
            <p className="text-center text-black text-lg mb-2">
              Are you sure you want to proceed with confirming this payment?
            </p>
            <p className="text-center text-black text-lg mb-10">
              This action cannot be undone.
            </p>

            {/* Modal Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleConfirmModalConfirm}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-16 rounded-full text-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[75%] max-w-2xl p-12">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={handleCancelConfirmCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8"
              >
                ✕
              </button>
            </div>

            {/* Modal Header Icon */}
            <div className="flex items-center justify-end mb-8">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                {/* <span className="text-white text-xl">🅾</span> */}
              </div>
            </div>

            {/* Modal Title */}
            <h2 className="text-4xl font-bold text-center text-red-500 mb-4">
              Cancel Payment
            </h2>

            {/* Modal Description */}
            <p className="text-center text-black text-lg mb-2">
              Are you sure you want to cancel this payment?
            </p>
            <p className="text-center text-black text-lg mb-10">
              This action cannot be undone.
            </p>

            {/* Modal Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleCancelConfirmConfirm}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-16 rounded-full transition-colors text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
