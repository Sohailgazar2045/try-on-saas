'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI, billingAPI } from '@/lib/api';
import { isDemoMode, getDemoUser } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { CheckCircle2, Sparkles, CreditCard, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}

function BillingContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const demo = isDemoMode();
      setIsDemo(demo);

      if (demo) {
        setUser(getDemoUser());
        return;
      }

      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handlePurchase = async (plan: string, type: 'subscription' | 'credits') => {
    if (isDemo) {
      toast.error('Sign up to purchase credits or subscriptions');
      return;
    }

    setLoading(plan);
    try {
      const response = await billingAPI.createCheckout({ plan, type });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      description: 'For trying out the platform',
      features: ['5 credits', 'Basic quality', 'Email support'],
      current: user?.subscription === 'free',
      plan: 'free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For growing businesses',
      features: ['100 credits/month', 'HD quality', 'Priority support', 'Advanced features'],
      popular: true,
      current: user?.subscription === 'basic',
      plan: 'basic'
    },
    {
      name: 'Enterprise',
      price: '$49',
      period: '/month',
      description: 'For large organizations',
      features: ['Unlimited credits', '4K quality', 'Dedicated support', 'Custom solutions', 'SSO'],
      current: user?.subscription === 'premium',
      plan: 'premium'
    }
  ];

  const creditPacks = [
    { amount: 10, price: '$4.99', plan: 'small' },
    { amount: 25, price: '$9.99', plan: 'medium', popular: true },
    { amount: 50, price: '$17.99', plan: 'large' },
  ];

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          title="Billing"
          subtitle="Manage your subscription and credits"
        />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Current Balance */}
            <div className="card-highlight">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-secondary">Current Balance</p>
                  <p className="mt-2 text-4xl font-bold text-foreground">{user?.credits || 0} <span className="text-lg font-normal text-foreground-secondary">credits</span></p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10">
                  <Sparkles className="h-8 w-8 text-orange-400" />
                </div>
              </div>
            </div>

            {/* Credit Packs */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">Buy Credits</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {creditPacks.map((pack) => (
                  <div 
                    key={pack.plan}
                    className={`card relative ${pack.popular ? 'ring-2 ring-orange-500/30' : ''}`}
                  >
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="badge-accent">Best value</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                        <Zap className="h-6 w-6 text-orange-400" />
                      </div>
                      <span className="text-2xl font-bold text-foreground">{pack.price}</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{pack.amount} Credits</p>
                    <p className="text-sm text-foreground-tertiary mt-1">${(parseFloat(pack.price.slice(1)) / pack.amount).toFixed(2)} per credit</p>
                    <button
                      onClick={() => handlePurchase(pack.plan, 'credits')}
                      disabled={loading === pack.plan}
                      className="btn-secondary w-full justify-center mt-4"
                    >
                      {loading === pack.plan ? 'Processing...' : 'Purchase'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Plans */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">Subscription Plans</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {plans.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`relative rounded-2xl p-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-b from-orange-500/10 to-transparent border-2 border-orange-500/30' 
                        : 'card'
                    } ${plan.current ? 'ring-2 ring-emerald-500/30' : ''}`}
                  >
                    {plan.popular && !plan.current && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2">
                        <span className="badge-accent">Most popular</span>
                      </div>
                    )}
                    {plan.current && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2">
                        <span className="badge-success">Current plan</span>
                      </div>
                    )}
                    
                    <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-foreground-tertiary mt-1">{plan.description}</p>
                    
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      {plan.period && <span className="text-foreground-secondary">{plan.period}</span>}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="text-foreground-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => !plan.current && plan.plan !== 'free' && handlePurchase(plan.plan, 'subscription')}
                      disabled={plan.current || plan.plan === 'free' || loading === plan.plan}
                      className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all ${
                        plan.current 
                          ? 'bg-emerald-500/10 text-emerald-400 cursor-default'
                          : plan.plan === 'free'
                          ? 'bg-overlay-4 text-foreground-tertiary cursor-default'
                          : plan.popular 
                          ? 'btn-primary justify-center' 
                          : 'btn-secondary justify-center'
                      }`}
                    >
                      {plan.current ? 'Current Plan' : plan.plan === 'free' ? 'Free Forever' : loading === plan.plan ? 'Processing...' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
