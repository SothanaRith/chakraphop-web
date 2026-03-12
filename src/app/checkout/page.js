// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECKOUT PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, MapPin, CreditCard, QrCode, CheckCircle2, 
  AlertCircle, ArrowLeft, Loader
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DeliverySelection from '@/components/checkout/DeliverySelection';
import VisaCardPayment from '@/components/checkout/VisaCardPayment';
import KHQRPayment from '@/components/checkout/KHQRPayment';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Delivery, 3: Payment
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('visa'); // visa or khqr
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      // Fetch cart and addresses
      const [cartRes, addressRes] = await Promise.all([
        fetch('/api/cart', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/addresses', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      const cartData = await cartRes.json();
      const addressData = await addressRes.json();

      setCartItems(cartData.data || mockCartItems);
      setAddresses(addressData.data || mockAddresses);
      
      // Auto-select default address
      const defaultAddr = (addressData.data || mockAddresses).find(a => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
    } catch (error) {
      console.error('Error fetching checkout data:', error);
      setCartItems(mockCartItems);
      setAddresses(mockAddresses);
      setSelectedAddress(mockAddresses[0]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = selectedDeliveryMethod?.price || 0;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  };

  const handlePlaceOrder = async (paymentData) => {
    setProcessing(true);
    try {
      // Create order
      const response = await fetch('/api/checkout/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          addressId: selectedAddress.id,
          deliveryMethodId: selectedDeliveryMethod.id,
          paymentMethod: paymentMethod === 'visa' ? 'CREDIT_CARD' : 'KHQR',
          paymentData
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setOrderId(data.data.orderNumber);
        setOrderSuccess(true);
        // Clear cart
        setCartItems([]);
      } else {
        throw new Error(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return <OrderSuccessScreen orderNumber={orderId} />;
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <Step number={1} label="Shipping" active={currentStep >= 1} completed={currentStep > 1} />
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <Step number={2} label="Delivery" active={currentStep >= 2} completed={currentStep > 2} />
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <Step number={3} label="Payment" active={currentStep >= 3} completed={false} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Address */}
            {currentStep >= 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </h2>
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedAddress?.id === address.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="mt-1 w-4 h-4 text-blue-600"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{address.fullName}</p>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{address.addressLine1}</p>
                        {address.addressLine2 && (
                          <p className="text-gray-600 text-sm">{address.addressLine2}</p>
                        )}
                        <p className="text-gray-600 text-sm">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {selectedAddress && currentStep === 1 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Continue to Delivery
                  </button>
                )}
              </div>
            )}

            {/* Step 2: Delivery Method */}
            {currentStep >= 2 && selectedAddress && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Method</h2>
                <DeliverySelection
                  addressId={selectedAddress.id}
                  orderSubtotal={totals.subtotal}
                  onDeliverySelected={(method) => {
                    setSelectedDeliveryMethod(method);
                  }}
                  disabled={processing}
                />
                {selectedDeliveryMethod && currentStep === 2 && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Continue to Payment
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep >= 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('visa')}
                    className={`p-6 border-2 rounded-lg transition ${
                      paymentMethod === 'visa'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold text-gray-900">Visa/Mastercard</p>
                    <p className="text-xs text-gray-500 mt-1">Pay with credit card</p>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('khqr')}
                    className={`p-6 border-2 rounded-lg transition ${
                      paymentMethod === 'khqr'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <QrCode className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold text-gray-900">KHQR</p>
                    <p className="text-xs text-gray-500 mt-1">Scan to pay</p>
                  </button>
                </div>

                {/* Payment Form */}
                {paymentMethod === 'visa' ? (
                  <VisaCardPayment 
                    amount={totals.total}
                    onSubmit={handlePlaceOrder}
                    processing={processing}
                  />
                ) : (
                  <KHQRPayment 
                    amount={totals.total}
                    orderDetails={{
                      items: cartItems,
                      address: selectedAddress
                    }}
                    onSubmit={handlePlaceOrder}
                    processing={processing}
                  />
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={item.product.image || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.variant.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {selectedDeliveryMethod 
                      ? `$${totals.shipping.toFixed(2)}`
                      : 'Calculated at next step'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ number, label, active, completed }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
        completed
          ? 'bg-green-500 text-white'
          : active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-500'
      }`}>
        {completed ? <CheckCircle2 className="w-6 h-6" /> : number}
      </div>
      <span className={`font-medium ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}

function OrderSuccessScreen({ orderNumber }) {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-sm p-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-lg font-semibold text-gray-900 mb-8">
            Order Number: <span className="text-blue-600">{orderNumber}</span>
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href={`/orders/${orderNumber}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Order
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockCartItems = [
  {
    id: '1',
    product: {
      id: 'prod-1',
      name: 'Nike Air Zoom Pegasus 40',
      image: '/products/nike-pegasus.jpg'
    },
    variant: {
      id: 'var-1',
      price: 139.99
    },
    quantity: 1
  }
];

const mockAddresses = [
  {
    id: 'addr-1',
    fullName: 'John Doe',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'Phnom Penh',
    state: 'Phnom Penh',
    postalCode: '12000',
    country: 'Cambodia',
    phone: '+855 12 345 678',
    isDefault: true
  }
];
