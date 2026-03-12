// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VISA CARD PAYMENT COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useState } from 'react';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';

export default function VisaCardPayment({ amount, onSubmit, processing }) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardData({ ...cardData, expiryDate: formatted });
  };

  const validateForm = () => {
    const newErrors = {};

    // Card number validation
    const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }

    // Card name validation
    if (!cardData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    // Expiry date validation
    if (!cardData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = cardData.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!month || !year) {
        newErrors.expiryDate = 'Invalid expiry date';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (parseInt(year) < currentYear || 
                 (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation
    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In production, this would integrate with Stripe, Braintree, or other payment gateway
    onSubmit({
      method: 'CREDIT_CARD',
      cardLast4: cardData.cardNumber.slice(-4),
      cardBrand: detectCardBrand(cardData.cardNumber),
      // Never send full card details to backend - use payment gateway tokens
      transactionId: `txn_${Date.now()}`
    });
  };

  const detectCardBrand = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.match(/^4/)) return 'Visa';
    if (cleaned.match(/^5[1-5]/)) return 'Mastercard';
    if (cleaned.match(/^3[47]/)) return 'Amex';
    return 'Unknown';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Secure Payment</p>
          <p>Your payment information is encrypted and secure. We never store your card details.</p>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.cardNumber}
          </p>
        )}
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardData.cardName}
          onChange={(e) => setCardData({ ...cardData, cardName: e.target.value.toUpperCase() })}
          placeholder="JOHN DOE"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.cardName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.cardName && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.cardName}
          </p>
        )}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            value={cardData.expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            maxLength={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.expiryDate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <input
            type="text"
            value={cardData.cvv}
            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
            placeholder="123"
            maxLength={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      {/* Amount Summary */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={processing}
        className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </button>

      {/* Accepted Cards */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t">
        <p className="text-sm text-gray-500">We accept:</p>
        <div className="flex gap-2">
          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
            VISA
          </div>
          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
            MC
          </div>
          <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
            AMEX
          </div>
        </div>
      </div>
    </form>
  );
}
