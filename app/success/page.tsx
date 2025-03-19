"use client";

import React from 'react';
import { CheckCircle, ShoppingBag, ArrowRight, Home, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function SuccessPage() {
  // In a real app, you'd get these from your order/session data
  const orderNumber = "#ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const router = useRouter();
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Banner */}
      <div className="bg-green-500 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-center space-x-2">
          <CheckCircle className="h-6 w-6" />
          <p className="text-lg font-medium">Payment Successful!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Purchase!</h1>
            <p className="text-gray-600">Your order has been successfully processed</p>
          </div>

          {/* Order Details */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium">{orderDate}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">A confirmation email has been sent to your email address</p>
              <p className="text-sm text-gray-600">You can track your order status in your account dashboard</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => router.push('/')} className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Home className="h-5 w-5 mr-2" />
              Return to Home
            </Button>
            <Button className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Printer className="h-5 w-5 mr-2" />
              Print Receipt
            </Button>
          </div>

          {/* Next Steps */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Track Your Order</p>
                  <p className="text-sm text-gray-600">Use your order number to track the status of your delivery</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Need Help?</p>
                  <p className="text-sm text-gray-600">Our customer service team is here to help with any questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;