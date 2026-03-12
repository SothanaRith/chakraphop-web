// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KHQR PAYMENT COMPONENT (Khmer QR Code Payment)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle2, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export default function KHQRPayment({ amount, orderDetails, onSubmit, processing }) {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, checking, confirmed, expired
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    generateQRCode();
  }, [amount]);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0 && paymentStatus === 'pending') {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setPaymentStatus('expired');
    }
  }, [countdown, paymentStatus]);

  useEffect(() => {
    // Start polling for payment confirmation
    if (qrCodeUrl && paymentStatus === 'pending') {
      const pollInterval = setInterval(() => {
        checkPaymentStatus();
      }, 3000); // Check every 3 seconds

      return () => clearInterval(pollInterval);
    }
  }, [qrCodeUrl, paymentStatus]);

  const generateQRCode = async () => {
    try {
      // In production, this would call your backend to generate KHQR code
      // Backend would use KHQR API to create payment QR code
      const response = await fetch('/api/payment/khqr/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'USD',
          orderDetails: orderDetails
        })
      });

      const data = await response.json();
      
      // Mock QR code for demo
      const mockQR = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        `khqr://payment?amount=${amount}&merchant=SportStore&ref=${Date.now()}`
      )}`;
      
      setQrCodeUrl(data.qrCodeUrl || mockQR);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate payment QR code');
    }
  };

  const checkPaymentStatus = async () => {
    if (isPolling) return;
    
    setIsPolling(true);
    try {
      // In production, this would check with KHQR API if payment is received
      const response = await fetch('/api/payment/khqr/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (data.status === 'confirmed') {
        setPaymentStatus('confirmed');
        // Submit order with payment confirmation
        onSubmit({
          method: 'KHQR',
          transactionId: data.transactionId,
          paymentProof: data.proof
        });
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setIsPolling(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRefresh = () => {
    setCountdown(600);
    setPaymentStatus('pending');
    generateQRCode();
  };

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {paymentStatus === 'confirmed' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <div className="flex-1">
            <p className="font-semibold text-green-900">Payment Confirmed!</p>
            <p className="text-sm text-green-700">Processing your order...</p>
          </div>
        </div>
      )}

      {paymentStatus === 'expired' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div className="flex-1">
            <p className="font-semibold text-red-900">QR Code Expired</p>
            <p className="text-sm text-red-700">Please generate a new QR code to continue</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="font-semibold text-blue-900 mb-2">How to pay with KHQR:</p>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Open your banking app (ABA, Wing, ACLEDA, etc.)</li>
          <li>Select "Scan QR" or "KHQR Payment"</li>
          <li>Scan the QR code below</li>
          <li>Confirm the amount and complete payment</li>
          <li>Wait for automatic confirmation</li>
        </ol>
      </div>

      {/* QR Code Display */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-lg font-semibold text-gray-900">
            Time remaining: {formatTime(countdown)}
          </span>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          {qrCodeUrl ? (
            <div className="relative">
              <img
                src={qrCodeUrl}
                alt="KHQR Payment Code"
                className="w-80 h-80 border-4 border-gray-200 rounded-lg"
              />
              {paymentStatus === 'expired' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xl font-bold">EXPIRED</span>
                </div>
              )}
              {paymentStatus === 'confirmed' && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center rounded-lg">
                  <CheckCircle2 className="w-24 h-24 text-white" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-80 h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>

        {/* Amount Display */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-1">Amount to Pay</p>
          <p className="text-4xl font-bold text-gray-900">${amount.toFixed(2)}</p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2">
          {paymentStatus === 'pending' && (
            <>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Waiting for payment...</span>
            </>
          )}
          {paymentStatus === 'checking' && (
            <>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Verifying payment...</span>
            </>
          )}
          {paymentStatus === 'confirmed' && (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-medium">Payment confirmed!</span>
            </>
          )}
        </div>

        {/* Refresh Button for Expired */}
        {paymentStatus === 'expired' && (
          <div className="mt-6 text-center">
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Generate New QR Code
            </button>
          </div>
        )}
      </div>

      {/* Supported Banks */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 text-center mb-3">Supported Banking Apps:</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['ABA Mobile', 'Wing', 'ACLEDA', 'Canadia', 'Sathapana', 'AMK'].map((bank) => (
            <div
              key={bank}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
            >
              {bank}
            </div>
          ))}
        </div>
      </div>

      {/* Manual Verification Button */}
      {paymentStatus === 'pending' && (
        <button
          onClick={checkPaymentStatus}
          disabled={isPolling}
          className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium disabled:opacity-50"
        >
          {isPolling ? 'Checking...' : 'I have completed the payment'}
        </button>
      )}
    </div>
  );
}
