'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CompanyDataComponent from '@/components/companies/CompanyDataComponent';
import DateListComponent from '@/components/payments/DateListComponent';
import PaymentEventComponent from '@/components/payments/PaymentEventComponent';
import ReceiptComponent from '@/components/payments/ReceiptComponent';
import TransactionErrorComponent from '@/components/payments/TransactionErrorComponent';
import PaymentActionComponent from '@/components/payments/PaymentActionComponent';
import cancelPayment from '@/libs/cancelPayment';

interface CompanyDetails {
  id: number;
  companyName: string;
  totalAmount: string;
  latestUpdate: string;
  dotColor: string;
  availableDates: { date: number; month: string }[];
}

export default function DetailsPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken as string;
  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancellationError, setCancellationError] = useState<string | null>(null);

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

  const handleCancelConfirmConfirm = async () => {
    if (!token) {
      setCancellationError('No authentication token available');
      return;
    }

    setIsCancelling(true);
    setCancellationError(null);

    try {
      // Using a mock payment ID - in real scenario, this would come from page params or context
      const paymentId = 'PAY-2022-123456';
      await cancelPayment(paymentId, token, 'User requested cancellation');
      
      console.log('Payment cancelled successfully');
      setIsCancelConfirmOpen(false);
      // Optionally redirect to payments page after successful cancellation
      // router.push('/payments');
    } catch (error) {
      console.error('Failed to cancel payment:', error);
      setCancellationError(
        error instanceof Error ? error.message : 'Failed to cancel payment. Please try again.'
      );
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCancelConfirmCancel = () => {
    console.log('Cancel cancelled');
    setIsCancelConfirmOpen(false);
    setCancellationError(null);
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
                disabled={isCancelling}
                className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 disabled:opacity-50"
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

            {/* Error Message */}
            {cancellationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm font-medium">{cancellationError}</p>
              </div>
            )}

            {/* Loading State */}
            {isCancelling && (
              <div className="flex items-center justify-center mb-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                <span className="ml-2 text-gray-600">Cancelling payment...</span>
              </div>
            )}

            {/* Modal Action Button */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelConfirmCancel}
                disabled={isCancelling}
                className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-black font-bold py-4 px-8 rounded-full transition-colors text-lg"
              >
                Keep It
              </button>
              <button
                onClick={handleCancelConfirmConfirm}
                disabled={isCancelling}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg disabled:cursor-not-allowed"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
