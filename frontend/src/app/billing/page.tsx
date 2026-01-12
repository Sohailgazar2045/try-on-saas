'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { billingAPI, authAPI } from '@/lib/api';
import { CreditCounter } from '@/components/CreditCounter';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}

function BillingContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pricing, setPricing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, pricingRes] = await Promise.all([
        authAPI.getProfile(),
        billingAPI.getPricing(),
      ]);
      setUser(userRes.data.user);
      setPricing(pricingRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (plan: string, type: 'credits' | 'subscription') => {
    try {
      const response = await billingAPI.createCheckout({ plan, type });
      // Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/dashboard" className="text-2xl font-bold text-primary-700">
            Virtual Try-On
          </a>
          <div className="flex gap-4 items-center">
            <CreditCounter credits={user?.credits || 0} />
            <a href="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Billing & Pricing</h1>

        {/* Credit Packages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Credit Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing?.creditPackages && Object.entries(pricing.creditPackages).map(([key, pkg]: [string, any]) => (
              <div key={key} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 capitalize">{key} Package</h3>
                <p className="text-3xl font-bold text-primary-600 mb-4">
                  ${pkg.price}
                </p>
                <p className="text-gray-600 mb-4">{pkg.credits} credits</p>
                <button
                  onClick={() => handleCheckout(key, 'credits')}
                  className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Subscription Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing?.subscriptions && Object.entries(pricing.subscriptions).map(([key, plan]: [string, any]) => (
              <div
                key={key}
                className={`bg-white p-6 rounded-lg shadow-md ${
                  key === 'PREMIUM' ? 'border-2 border-primary-600' : ''
                }`}
              >
                {key === 'PREMIUM' && (
                  <div className="bg-primary-600 text-white text-center py-1 rounded-t-lg -mt-6 -mx-6 mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-primary-600 mb-4">
                  ${plan.price}
                  {plan.price > 0 && <span className="text-lg text-gray-600">/month</span>}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{plan.credits} credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Unlimited generations</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleCheckout(key.toLowerCase(), 'subscription')}
                  className={`w-full py-2 rounded-lg transition ${
                    key === 'PREMIUM'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {plan.price === 0 ? 'Current Plan' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

