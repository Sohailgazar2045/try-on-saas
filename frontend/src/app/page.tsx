'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap, Upload, Image as ImageIcon, CheckCircle2, Users, TrendingUp, Clock, Globe, Lock, Star, HelpCircle, Menu, X, ChevronRight, Award, Rocket } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Enhanced Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-black/20' 
          : 'border-b border-slate-800/50 bg-slate-950/60 backdrop-blur-md'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className={`group flex items-center gap-2.5 transition-all duration-500 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative">
              {/* Pulsing glow */}
              <div className="absolute inset-0 rounded-xl bg-primary-500/30 blur-xl animate-pulse-slow" />
              {/* Rotating gradient ring */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 via-sky-400 to-primary-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 animate-spin-slow" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-sky-400 shadow-lg shadow-primary-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Sparkles className="h-5 w-5 text-white transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-primary-300">
                Virtual Try-On
              </span>
              <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wider">
                AI Studio
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className={`hidden items-center gap-1 md:flex transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`} style={{ transitionDelay: '200ms' }}>
            <Link 
              href="#features" 
              className="group relative rounded-lg px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:text-slate-50 hover:bg-slate-900/50"
            >
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link 
              href="#pricing" 
              className="group relative rounded-lg px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:text-slate-50 hover:bg-slate-900/50"
            >
              <span className="relative z-10">Pricing</span>
              <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link 
              href="/login" 
              className="group relative rounded-lg px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:text-slate-50 hover:bg-slate-900/50"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link 
              href="/register" 
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Get started
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-900/50 hover:text-slate-50"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1 p-4">
              <Link 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/50 hover:text-slate-50"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/50 hover:text-slate-50"
              >
                Pricing
              </Link>
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/50 hover:text-slate-50"
              >
            Login
          </Link>
          <Link 
            href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-lg bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-400"
              >
                Get started
              </Link>
      </nav>
          </div>
        )}
      </header>

      {/* Hero Section with extreme animations */}
      <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr,1fr]">
          {/* Copy with staggered animations */}
          <div className="space-y-6">
            <div className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-100 backdrop-blur-sm transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>AI-powered virtual fitting room</span>
            </div>

            <h1 className={`text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
              See every outfit
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                {' '}before it ships.
              </span>
            </h1>

            <p className={`max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '400ms' }}>
              Upload a model or customer photo, drop in garments, and instantly preview realistic try-ons.
              Built for fashion teams that care about conversion, returns, and brand experience.
            </p>

            <div className={`flex flex-wrap items-center gap-3 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '600ms' }}>
              <Link 
                href="/register"
                className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40"
              >
                <span>Start a demo workspace</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </Link>
              <Link 
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-800 hover:scale-105"
              >
                View pricing
              </Link>
            </div>

            <div className={`flex flex-wrap items-center gap-6 text-xs text-slate-400 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '800ms' }}>
              <div className="group flex items-center gap-2 transition-all duration-300 hover:text-slate-300">
                <Shield className="h-3.5 w-3.5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                <span>No credit card, no backend required</span>
              </div>
              <div className="group flex items-center gap-2 transition-all duration-300 hover:text-slate-300">
                <Zap className="h-3.5 w-3.5 text-sky-400 transition-transform duration-300 group-hover:scale-110" />
                <span>Optimized for product, growth, and design teams</span>
              </div>
            </div>
          </div>

          {/* Visual / mock preview with animations */}
          <div className={`relative transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
          }`} style={{ transitionDelay: '400ms' }}>
            {/* Animated glow effect */}
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-emerald-400/20 blur-2xl animate-pulse-slow" />
            {/* Rotating gradient ring */}
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-primary-500 via-sky-400 to-emerald-400 opacity-20 blur-2xl animate-spin-slow" />
            
            <div className="group relative rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-900/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-primary-500/30">
              
              <div className="border-b border-slate-800/70 bg-slate-900/80 px-4 py-3 text-xs text-slate-400">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400/80 animate-pulse" />{' '}
                Live preview &mdash; customer view
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-300">Source photo</p>
                  <div className="group/image h-40 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 sm:h-48 transition-all duration-500 hover:scale-105 hover:shadow-lg" />
                  <p className="text-[11px] text-slate-500">
                    Upload a clean, front-facing portrait or model shot.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-300">AI try-on result</p>
                  <div className="group/image h-40 rounded-2xl bg-gradient-to-tr from-sky-500/40 via-cyan-400/30 to-emerald-400/40 sm:h-48 transition-all duration-500 hover:scale-105 hover:shadow-lg" />
                  <p className="text-[11px] text-slate-500">
                    Preview the garment on-body, adjust, then ship with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="relative border-b border-slate-800/80 bg-gradient-to-r from-slate-900/50 to-slate-950/50 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '300ms' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Trusted by leading fashion brands</p>
          </div>
          <div className={`grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '400ms' }}>
            {[
              { icon: Award, label: 'Enterprise Grade' },
              { icon: Shield, label: '99.9% Uptime' },
              { icon: Zap, label: 'Lightning Fast' },
              { icon: Lock, label: 'Secure & Private' },
              { icon: Users, label: '10k+ Users' }
            ].map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="group flex flex-col items-center rounded-lg border border-slate-800/50 bg-slate-900/30 p-3 text-center transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-900/50">
                  <Icon className="h-5 w-5 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-2 text-xs font-semibold text-slate-300">{badge.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works with animations */}
      <section className="relative border-b border-slate-800/80 bg-slate-900/30 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-4 text-slate-400">Three simple steps to transform your fashion workflow</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Upload, bgClass: 'bg-primary-500/10', iconClass: 'text-primary-400', hoverGlow: 'bg-primary-500/10', ringColor: 'from-primary-500', title: '1. Upload', desc: 'Upload your model photos and garment images. Our AI handles the rest.' },
              { icon: ImageIcon, bgClass: 'bg-sky-500/10', iconClass: 'text-sky-400', hoverGlow: 'bg-sky-500/10', ringColor: 'from-sky-500', title: '2. Generate', desc: 'AI processes your images and creates realistic try-on previews in seconds.' },
              { icon: CheckCircle2, bgClass: 'bg-emerald-500/10', iconClass: 'text-emerald-400', hoverGlow: 'bg-emerald-500/10', ringColor: 'from-emerald-500', title: '3. Deploy', desc: 'Export and use your try-on images across your store, campaigns, and channels.' }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className={`group relative text-center transition-all duration-1000 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl ${step.hoverGlow} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50`} />
                  
                  <div className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.bgClass} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    {/* Rotating ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.ringColor} via-transparent ${step.ringColor} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-30 group-hover:animate-spin-slow`} />
                    <Icon className={`relative z-10 h-8 w-8 ${step.iconClass} transition-transform duration-500 group-hover:scale-110`} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold transition-colors duration-300 group-hover:text-primary-300">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section with animations */}
      <section id="features" className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need</h2>
            <p className="mt-4 text-slate-400">Built for modern fashion teams</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, bgClass: 'bg-primary-500/10', iconClass: 'text-primary-400', hoverBorder: 'hover:border-primary-500/50', hoverShadow: 'hover:shadow-primary-500/10', hoverGlow: 'bg-primary-500/20', title: 'Lightning fast', desc: 'Generate try-on previews in seconds, not hours. No waiting, no delays.' },
              { icon: TrendingUp, bgClass: 'bg-sky-500/10', iconClass: 'text-sky-400', hoverBorder: 'hover:border-sky-500/50', hoverShadow: 'hover:shadow-sky-500/10', hoverGlow: 'bg-sky-500/20', title: 'Increase conversion', desc: 'Show customers exactly how products look before they buy. Reduce returns.' },
              { icon: Clock, bgClass: 'bg-emerald-500/10', iconClass: 'text-emerald-400', hoverBorder: 'hover:border-emerald-500/50', hoverShadow: 'hover:shadow-emerald-500/10', hoverGlow: 'bg-emerald-500/20', title: 'Save time & money', desc: 'Skip expensive photo shoots. Create unlimited variations instantly.' },
              { icon: Users, bgClass: 'bg-purple-500/10', iconClass: 'text-purple-400', hoverBorder: 'hover:border-purple-500/50', hoverShadow: 'hover:shadow-purple-500/10', hoverGlow: 'bg-purple-500/20', title: 'Team collaboration', desc: 'Share galleries, collaborate on styling, and iterate together in real-time.' },
              { icon: Globe, bgClass: 'bg-amber-500/10', iconClass: 'text-amber-400', hoverBorder: 'hover:border-amber-500/50', hoverShadow: 'hover:shadow-amber-500/10', hoverGlow: 'bg-amber-500/20', title: 'API ready', desc: 'Integrate with your existing stack. Built for scale and reliability.' },
              { icon: Lock, bgClass: 'bg-red-500/10', iconClass: 'text-red-400', hoverBorder: 'hover:border-red-500/50', hoverShadow: 'hover:shadow-red-500/10', hoverGlow: 'bg-red-500/20', title: 'Secure & private', desc: 'Your images are encrypted and never shared. Enterprise-grade security.' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${feature.hoverBorder} hover:bg-slate-900/90 hover:shadow-xl ${feature.hoverShadow} ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 rounded-2xl ${feature.hoverGlow} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50`} />
                  
                  <div className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgClass} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className={`h-5 w-5 ${feature.iconClass} transition-transform duration-500 group-hover:scale-110`} />
                  </div>
                  <h3 className="relative z-10 mt-4 text-lg font-semibold transition-colors duration-300 group-hover:text-primary-300">{feature.title}</h3>
                  <p className="relative z-10 mt-2 text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section with animations */}
      <section className="relative border-y border-slate-800/80 bg-slate-900/30 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className={`transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for fashion teams that ship fast
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Whether you're a startup launching your first collection or an established brand optimizing conversion, Virtual Try-On fits your workflow.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Reduce return rates', desc: 'Customers see exactly how products fit before purchasing, leading to fewer returns and happier customers.' },
                  { title: 'Scale your content', desc: 'Generate unlimited product images without booking models or photographers. Scale your catalog instantly.' },
                  { title: 'Improve conversion', desc: 'Visual try-ons increase engagement and conversion rates. Show, don\'t just tell.' }
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className={`group flex items-start gap-3 transition-all duration-700 ${
                      mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <div>
                      <h4 className="font-semibold transition-colors duration-300 group-hover:text-primary-300">{benefit.title}</h4>
                      <p className="mt-1 text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { value: '40%', color: 'text-primary-400', label: 'Average reduction in return rates' },
                { value: '3x', color: 'text-sky-400', label: 'Faster content creation vs traditional shoots' },
                { value: '25%', color: 'text-emerald-400', label: 'Increase in conversion rates' },
                { value: '10k+', color: 'text-purple-400', label: 'Try-ons generated monthly by our users' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary-500/50 hover:shadow-lg ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className={`text-3xl font-bold ${stat.color} transition-transform duration-300 group-hover:scale-110`}>{stat.value}</div>
                  <p className="mt-2 text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview with animations */}
      <section id="pricing" className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-slate-400">Start free, scale as you grow</p>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: 'Free', price: '$0', period: '', badge: '', features: ['5 free credits', 'Basic try-on features'], popular: false },
                { name: 'Basic', price: '$9.99', period: '/month', badge: 'Most popular', features: ['50 credits/month', 'Priority processing', 'Email support'], popular: true },
                { name: 'Premium', price: '$29.99', period: '/month', badge: '', features: ['200 credits/month', 'Highest quality results', 'Priority support', 'Advanced features'], popular: false }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border-2 ${plan.popular ? 'border-primary-500 bg-slate-900/90' : 'border-slate-800 bg-slate-900/70'} p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  {/* Glow effect for popular */}
                  {plan.popular && (
                    <div className="absolute -inset-1 rounded-2xl bg-primary-500/20 blur-xl animate-pulse-slow" />
                  )}
                  
                  {plan.badge && (
                    <div className="mb-4 inline-block rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-300 backdrop-blur-sm">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary-300">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold transition-transform duration-300 group-hover:scale-110">{plan.price}</span>
                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                        <span className="transition-colors duration-300 group-hover:text-slate-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`group/btn mt-6 block w-full overflow-hidden rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-all duration-500 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40'
                        : 'border border-slate-700 bg-slate-800/50 text-slate-200 hover:border-primary-500/50 hover:bg-slate-800'
                    }`}
                  >
                    <span>{plan.popular ? 'Subscribe' : 'Get started'}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className={`mt-8 text-center transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '1000ms' }}>
            <Link href="/pricing" className="group inline-flex items-center gap-1 text-sm text-primary-400 transition-all duration-300 hover:text-primary-300 hover:gap-2">
              View detailed pricing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        </div>
      </section>

      {/* FAQ Section with animations */}
      <section className="relative border-y border-slate-800/80 bg-slate-900/30 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-12 space-y-6">
            {[
              { q: 'How accurate are the try-on results?', a: 'Our AI uses advanced computer vision models trained on millions of fashion images to produce highly realistic results. While results may vary based on image quality, most users report 90%+ satisfaction with the output.' },
              { q: 'Can I use the generated images commercially?', a: 'Yes! All images generated through Virtual Try-On can be used for commercial purposes including product pages, marketing campaigns, and social media.' },
              { q: 'What image formats do you support?', a: 'We support all common image formats including JPG, PNG, and WEBP. Images up to 10MB are supported for optimal processing.' },
              { q: 'Is there an API available?', a: 'Yes! We offer a RESTful API for enterprise customers. Contact us to learn more about API access and custom integrations.' }
            ].map((faq, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-primary-500/50 hover:shadow-lg ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <h3 className="flex items-center gap-2 font-semibold transition-colors duration-300 group-hover:text-primary-300">
                  <HelpCircle className="h-5 w-5 text-primary-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with animations */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            Ready to transform your fashion workflow?
          </h2>
          <p className={`mt-4 text-lg text-slate-400 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '400ms' }}>
            Join hundreds of fashion brands using AI to create better customer experiences.
          </p>
          <div className={`mt-8 flex flex-wrap justify-center gap-3 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '600ms' }}>
            <Link 
              href="/register"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40"
            >
              <span>Start free trial</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <Link 
              href="/pricing"
              className="group inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-800 hover:scale-105"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with animations */}
      <footer className="relative border-t border-slate-800/80 bg-slate-950 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className={`transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="group flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-primary-500/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
                  <span className="relative h-8 w-8 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                </div>
                <span className="text-sm font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-primary-300">
                  Virtual Try-On
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                AI-powered virtual fitting room for modern fashion teams.
              </p>
            </div>
            {[
              { title: 'Product', links: [{ href: '#features', label: 'Features' }, { href: '#pricing', label: 'Pricing' }, { href: '/dashboard', label: 'Dashboard' }] },
              { title: 'Company', links: [{ href: '#', label: 'About' }, { href: '#', label: 'Blog' }, { href: '#', label: 'Careers' }] },
              { title: 'Support', links: [{ href: '#', label: 'Documentation' }, { href: '#', label: 'Contact' }, { href: '/login', label: 'Login' }] }
            ].map((section, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <h4 className="text-sm font-semibold">{section.title}</h4>
                <ul className="mt-4 space-y-2 text-xs text-slate-400">
                  {section.links.map((link, lIndex) => (
                    <li key={lIndex}>
                      <Link href={link.href} className="group/link inline-block transition-all duration-300 hover:text-slate-200 hover:translate-x-1">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
          </div>
            ))}
          </div>
          <div className={`mt-8 border-t border-slate-800 pt-8 text-center text-xs text-slate-500 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '1000ms' }}>
            <p>© 2024 Virtual Try-On. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

