'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enableDemoMode } from '@/lib/auth';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Zap, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Clock, 
  Globe, 
  Lock, 
  ShoppingBag,
  Store,
  Palette,
  Play,
  ArrowUpRight,
  Menu,
  X,
  Shirt,
  User,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDemoClick = () => {
    enableDemoMode();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-subtle bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-[15px] font-bold text-foreground">Virtual Try-On</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <Link href="#for-users" className="btn-ghost">For Shoppers</Link>
            <Link href="#for-business" className="btn-ghost">For Business</Link>
            <Link href="#pricing" className="btn-ghost">Pricing</Link>
            <Link href="/login" className="btn-ghost">Sign in</Link>
            <button onClick={toggleTheme} className="btn-ghost p-2" title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/register" className="btn-primary ml-1">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-foreground-secondary hover:bg-overlay-4 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-subtle bg-surface px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Link href="#for-users" className="btn-ghost justify-start">For Shoppers</Link>
              <Link href="#for-business" className="btn-ghost justify-start">For Business</Link>
              <Link href="#pricing" className="btn-ghost justify-start">Pricing</Link>
              <Link href="/login" className="btn-ghost justify-start">Sign in</Link>
              <Link href="/register" className="btn-primary mt-2 justify-center">
                Get started free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Fashion Technology
            </div>

            {/* Heading */}
            <h1 className={`mt-8 heading-xl ${mounted ? 'animate-fade-in-delay-1' : 'opacity-0'}`}>
              Try on clothes{' '}
              <span className="gradient-text">before you buy</span>
            </h1>

            {/* Subheading */}
            <p className={`mt-6 text-lg leading-relaxed text-foreground-secondary max-w-2xl mx-auto ${mounted ? 'animate-fade-in-delay-2' : 'opacity-0'}`}>
              Whether you're shopping online or running a fashion business, see how clothes look in real-time. 
              Perfect for shoppers, fashion brands, e-commerce stores, and content creators.
            </p>

            {/* CTA Buttons */}
            <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 ${mounted ? 'animate-fade-in-delay-3' : 'opacity-0'}`}>
              <Link href="/register" className="btn-primary px-8 py-3.5 text-base">
                Start free trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button onClick={handleDemoClick} className="btn-secondary px-8 py-3.5 text-base">
                <Play className="h-4 w-4" />
                Try live demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className={`mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-foreground-tertiary ${mounted ? 'animate-fade-in-delay-3' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                5 free credits included
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className={`mt-20 ${mounted ? 'animate-fade-in-delay-3' : 'opacity-0'}`}>
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/20 via-orange-500/5 to-orange-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-muted bg-surface-alt">
                {/* Window header */}
                <div className="flex items-center gap-2 border-b border-subtle px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-overlay-10" />
                    <div className="h-3 w-3 rounded-full bg-overlay-10" />
                    <div className="h-3 w-3 rounded-full bg-overlay-10" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-foreground-tertiary">Virtual Try-On Studio</span>
              </div>
                </div>
                
                {/* Preview content */}
                <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-foreground-secondary">Before Outfit</p>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                      <img 
                        src="https://outfitters.com.pk/cdn/shop/files/F0307101901.jpg?v=1763374335&width=1946" 
                        alt="Before outfit" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-foreground-secondary">After Try-On</p>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-amber-500/20">
                      <img 
                        src="https://outfitters.com.pk/cdn/shop/files/F0547107901.jpg?v=1764849680&width=1946" 
                        alt="After try-on" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 border-y border-subtle">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-orange-400">WHO IT'S FOR</span>
            <h2 className="mt-4 heading-lg">Built for shoppers and fashion businesses</h2>
            <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
              From personal shopping to enterprise fashion brands, Virtual Try-On works for everyone
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* For Shoppers */}
            <div id="for-users" className="card-interactive">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                  <ShoppingBag className="h-7 w-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">For Shoppers</h3>
                  <p className="text-sm text-foreground-tertiary">Personal use</p>
                </div>
              </div>
              
              <p className="text-foreground-secondary mb-6">
                Shop with confidence. See exactly how clothes will look on you before making a purchase. 
                Reduce returns, find your perfect fit, and discover new styles that work for your body type.
              </p>

              <ul className="space-y-3">
                {[
                  'Try on clothes from any online store',
                  'See how different sizes and styles fit',
                  'Share looks with friends before buying',
                  'Build your personal style profile',
                  'Save time and reduce returns'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className="btn-secondary w-full justify-center mt-6">
                Start shopping smarter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* For Business */}
            <div id="for-business" className="card-interactive">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10">
                  <Store className="h-7 w-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">For Fashion Business</h3>
                  <p className="text-sm text-foreground-tertiary">E-commerce & brands</p>
                </div>
              </div>
              
              <p className="text-foreground-secondary mb-6">
                Transform your fashion business with AI-powered virtual try-on. Increase conversions, 
                reduce returns, and create stunning product visuals without expensive photo shoots.
              </p>

              <ul className="space-y-3">
                {[
                  'Increase conversion rates by 40%+',
                  'Reduce return rates by 60%',
                  'Create unlimited product visuals',
                  'Create visuals for your store',
                  'White-label solutions available'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className="btn-primary w-full justify-center mt-6">
                Grow your business
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-orange-400">INDUSTRY SOLUTIONS</span>
            <h2 className="mt-4 heading-lg">Perfect for every fashion business</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Store,
                title: 'E-commerce Stores',
                description: 'Integrate try-on directly into your online store. Show customers how products look before they buy.',
                color: 'orange'
              },
              {
                icon: Palette,
                title: 'Fashion Brands',
                description: 'Create stunning product visuals and marketing materials. Showcase your collections with AI-powered imagery.',
                color: 'blue'
              },
              {
                icon: Users,
                title: 'Content Creators',
                description: 'Generate engaging fashion content for social media, blogs, and YouTube. Create unlimited outfit combinations.',
                color: 'purple'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              const colorClasses = {
                orange: 'bg-orange-500/10 text-orange-400',
                blue: 'bg-blue-500/10 text-blue-400',
                purple: 'bg-purple-500/10 text-purple-400',
              };
              
              return (
                <div key={idx} className="card text-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[item.color as keyof typeof colorClasses]} mx-auto mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-subtle">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold text-orange-400">HOW IT WORKS</span>
            <h2 className="mt-4 heading-lg">Three simple steps to perfect fit</h2>
            <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
              Our AI-powered platform makes virtual try-on effortless. No technical skills required.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                icon: Upload,
                title: 'Upload your photo',
                description: 'Upload a clear, front-facing photo of yourself or your model. Our AI handles any background.'
              },
              {
                step: '02',
                icon: ImageIcon,
                title: 'Select a garment',
                description: 'Choose from your catalog or upload any garment image. We support all clothing types.'
              },
              {
                step: '03',
                icon: Sparkles,
                title: 'Get instant results',
                description: 'Our AI generates a realistic preview in seconds. Download and share anywhere.'
              }
            ].map((item, idx) => (
              <div key={idx} className="card-interactive group">
                <div className="flex items-start justify-between">
                  <div className="icon-container h-12 w-12">
                    <item.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <span className="text-4xl font-bold text-zinc-200 dark:text-zinc-800">{item.step}</span>
                </div>
                <h3 className="mt-6 heading-md">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold text-orange-400">FEATURES</span>
              <h2 className="mt-4 heading-lg">Everything you need to shop smarter and grow your business</h2>
              <p className="mt-4 text-foreground-secondary">
                Built for both individual shoppers and fashion businesses that care about customer experience and reducing returns.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: Zap,
                    title: 'Lightning fast processing',
                    description: 'Get results in under 10 seconds. No waiting around for your try-on previews.'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Boost conversion rates',
                    description: 'Businesses see 40% higher conversion when customers can visualize products. Shoppers buy with confidence.'
                  },
                  {
                    icon: Shield,
                    title: 'Enterprise-grade security',
                    description: 'Your photos are encrypted and never shared. SOC 2 compliant for business use.'
                  },
                  {
                    icon: Globe,
                    title: 'Works everywhere',
                    description: 'Use our platform to create try-on images for any website, social media, or marketing campaign.'
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="icon-container-neutral h-10 w-10 shrink-0 group-hover:bg-orange-500/10 transition-colors">
                      <feature.icon className="h-5 w-5 text-foreground-secondary group-hover:text-orange-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm text-foreground-secondary">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { value: '40%', label: 'Increase in conversion' },
                { value: '60%', label: 'Reduction in returns' },
                { value: '3x', label: 'Faster content creation' },
                { value: '10K+', label: 'Happy users & businesses' }
              ].map((stat, idx) => (
                <div key={idx} className="card text-center py-8">
                  <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                  <p className="mt-2 text-sm text-foreground-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-subtle">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold text-orange-400">PRICING</span>
            <h2 className="mt-4 heading-lg">Simple, transparent pricing</h2>
            <p className="mt-4 text-foreground-secondary">Start free, upgrade when you need more.</p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                period: '',
                description: 'Perfect for trying out the platform',
                features: ['5 try-on credits', 'Basic quality', 'Email support'],
                cta: 'Get started',
                href: '/register',
                highlight: false
              },
              {
                name: 'Pro',
                price: '$19',
                period: '/month',
                description: 'For growing businesses',
                features: ['100 credits/month', 'HD quality output', 'Priority support', 'Team collaboration', 'Advanced features'],
                cta: 'Start free trial',
                href: '/register',
                highlight: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                description: 'For large organizations',
                features: ['Unlimited credits', '4K quality output', 'Dedicated support', 'Custom solutions', 'SSO & security'],
                cta: 'Contact sales',
                href: '#',
                highlight: false
              }
            ].map((plan, idx) => (
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
                
                <h3 className="text-lg font-semibold">{plan.name}</h3>
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

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="card-highlight relative overflow-hidden rounded-3xl p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative">
              <h2 className="heading-lg">Ready to transform your fashion experience?</h2>
              <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
                Whether you're shopping online or running a fashion business, Virtual Try-On helps you make better decisions.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="btn-primary px-8 py-3.5 text-base">
                  Start free trial
                  <ArrowRight className="h-5 w-5" />
            </Link>
                <button onClick={handleDemoClick} className="btn-secondary px-8 py-3.5 text-base">
                  <Play className="h-4 w-4" />
                  Try live demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-subtle py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-[15px] font-bold text-foreground">Virtual Try-On</span>
              </Link>
              <p className="mt-4 text-sm text-foreground-tertiary leading-relaxed">
                AI-powered virtual fitting room for shoppers and fashion businesses.
              </p>
            </div>

            {[
              {
                title: 'For Shoppers',
                links: [
                  { label: 'How it works', href: '#features' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'Try demo', href: '#' },
                  { label: 'FAQ', href: '#' }
                ]
              },
              {
                title: 'For Business',
                links: [
                  { label: 'Integrations', href: '#' },
                  { label: 'Enterprise', href: '#' },
                  { label: 'Contact Sales', href: '#' },
                  { label: 'Support', href: '#' }
                ]
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Contact', href: '#' }
                ]
              }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-foreground">{section.title}</h4>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link href={link.href} className="text-sm text-foreground-tertiary hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
          </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-subtle">
            <p className="text-sm text-foreground-tertiary">© 2024 Virtual Try-On. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-foreground-tertiary hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </Link>
              <Link href="#" className="text-foreground-tertiary hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
