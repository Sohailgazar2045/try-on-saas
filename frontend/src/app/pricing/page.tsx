import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-700">
            Virtual Try-On
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-4xl font-bold text-primary-600 mb-4">$0</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>5 free credits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Basic try-on features</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full text-center py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md border-2 border-primary-600">
            <div className="bg-primary-600 text-white text-center py-1 rounded-t-lg -mt-8 -mx-8 mb-4">
              Popular
            </div>
            <h3 className="text-2xl font-semibold mb-2">Basic</h3>
            <p className="text-4xl font-bold text-primary-600 mb-4">
              $9.99<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>50 credits/month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Email support</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full text-center py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Subscribe
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">Premium</h3>
            <p className="text-4xl font-bold text-primary-600 mb-4">
              $29.99<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>200 credits/month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Highest quality results</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Advanced features</span>
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full text-center py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

