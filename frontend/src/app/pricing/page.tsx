'use client';

import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      description: 'Perfect for trying out the platform',
      features: [
        '5 try-on credits',
        'Basic quality output',
        'Email support',
        'Standard processing speed'
      ],
      cta: 'Get started',
      href: '/register',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For growing businesses',
      features: [
        '100 credits/month',
        'HD quality output',
        'Priority support',
        'Advanced features',
        'Team collaboration',
        'Advanced analytics'
      ],
      cta: 'Start free trial',
      href: '/register',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited credits',
        '4K quality output',
        'Dedicated support',
        'Custom solutions',
        'SSO & security',
        'SLA guarantee',
        'On-premise option'
      ],
      cta: 'Contact sales',
      href: '#',
      highlight: false
    }
  ];

  const creditPacks = [
    { amount: 10, price: '$4.99', perCredit: '$0.50' },
    { amount: 25, price: '$9.99', perCredit: '$0.40', popular: true },
    { amount: 50, price: '$17.99', perCredit: '$0.36' },
    { amount: 100, price: '$29.99', perCredit: '$0.30' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="border-b border-subtle bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-[15px] font-bold text-foreground">Virtual Try-On</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-ghost">Sign in</Link>
            <Link href="/register" className="btn-primary">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="text-sm font-semibold text-orange-400">PRICING</span>
          <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-foreground-secondary max-w-xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-2xl p-8 ${
                  plan.highlight 
                    ? 'bg-gradient-to-b from-orange-500/10 to-transparent border-2 border-orange-500/30' 
                    : 'card'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <span className="badge-accent">Most popular</span>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-foreground-tertiary">{plan.description}</p>
                
                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-foreground-secondary">{plan.period}</span>}
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-foreground-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.href}
                  className={`mt-8 flex w-full items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all ${
                    plan.highlight 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Packs */}
      <section className="py-20 border-t border-subtle">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Need more credits?</h2>
            <p className="mt-2 text-foreground-secondary">Purchase credit packs anytime, no subscription required</p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {creditPacks.map((pack, idx) => (
              <div 
                key={idx} 
                className={`card text-center ${pack.popular ? 'ring-2 ring-orange-500/30' : ''}`}
              >
                {pack.popular && (
                  <span className="badge-accent mb-4">Best value</span>
                )}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 mx-auto">
                  <Zap className="h-7 w-7 text-orange-400" />
                </div>
                <p className="mt-4 text-3xl font-bold text-foreground">{pack.amount}</p>
                <p className="text-sm text-foreground-tertiary">credits</p>
                <p className="mt-4 text-2xl font-bold text-foreground">{pack.price}</p>
                <p className="text-xs text-foreground-tertiary">{pack.perCredit} per credit</p>
                <Link href="/register" className="btn-secondary w-full justify-center mt-6">
                  Purchase
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-subtle">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">Frequently asked questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'What happens when I run out of credits?',
                a: 'You can purchase additional credit packs at any time, or upgrade your subscription plan for more monthly credits.'
              },
              {
                q: 'Can I cancel my subscription?',
                a: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
              },
              {
                q: 'Do unused credits roll over?',
                a: 'Credits from one-time purchases never expire. Monthly subscription credits refresh each billing cycle.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Every new account starts with 5 free credits to try the platform. No credit card required.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="card">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-subtle py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-foreground-tertiary">© 2024 Virtual Try-On. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
