import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap, Upload, Image as ImageIcon, CheckCircle2, Users, TrendingUp, Clock, Globe, Lock, Star, HelpCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Virtual Try-On
            </span>
          </div>
          <nav className="flex items-center gap-3 text-xs font-medium text-slate-300">
            <Link href="#features" className="hidden text-slate-300 hover:text-slate-50 sm:inline">
              Features
            </Link>
            <Link href="#pricing" className="hidden text-slate-300 hover:text-slate-50 sm:inline">
              Pricing
            </Link>
            <Link href="/login" className="text-slate-300 hover:text-slate-50">
            Login
          </Link>
          <Link 
            href="/register" 
              className="rounded-lg bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-400"
          >
              Get started
          </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr,1fr]">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-100">
              <Sparkles className="h-3 w-3" />
              <span>AI-powered virtual fitting room</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              See every outfit
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                {' '}before it ships.
              </span>
          </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Upload a model or customer photo, drop in garments, and instantly preview realistic try-ons.
              Built for fashion teams that care about conversion, returns, and brand experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link 
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-400"
              >
                Start a demo workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-800"
              >
                View pricing
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>No credit card, no backend required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-sky-400" />
                <span>Optimized for product, growth, and design teams</span>
              </div>
            </div>
          </div>

          {/* Visual / mock preview */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-cyan-400/10 to-emerald-400/20 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-900/60">
              <div className="border-b border-slate-800/70 bg-slate-900/80 px-4 py-3 text-xs text-slate-400">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400/80" />{' '}
                Live preview &mdash; customer view
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-300">Source photo</p>
                  <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 sm:h-48" />
                  <p className="text-[11px] text-slate-500">
                    Upload a clean, front-facing portrait or model shot.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-300">AI try-on result</p>
                  <div className="h-40 rounded-2xl bg-gradient-to-tr from-sky-500/40 via-cyan-400/30 to-emerald-400/40 sm:h-48" />
                  <p className="text-[11px] text-slate-500">
                    Preview the garment on-body, adjust, then ship with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-slate-800/80 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-4 text-slate-400">Three simple steps to transform your fashion workflow</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10">
                <Upload className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">1. Upload</h3>
              <p className="mt-2 text-sm text-slate-400">
                Upload your model photos and garment images. Our AI handles the rest.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10">
                <ImageIcon className="h-8 w-8 text-sky-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">2. Generate</h3>
              <p className="mt-2 text-sm text-slate-400">
                AI processes your images and creates realistic try-on previews in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">3. Deploy</h3>
              <p className="mt-2 text-sm text-slate-400">
                Export and use your try-on images across your store, campaigns, and channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need</h2>
            <p className="mt-4 text-slate-400">Built for modern fashion teams</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                <Zap className="h-5 w-5 text-primary-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Lightning fast</h3>
              <p className="mt-2 text-sm text-slate-400">
                Generate try-on previews in seconds, not hours. No waiting, no delays.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                <TrendingUp className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Increase conversion</h3>
              <p className="mt-2 text-sm text-slate-400">
                Show customers exactly how products look before they buy. Reduce returns.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Save time & money</h3>
              <p className="mt-2 text-sm text-slate-400">
                Skip expensive photo shoots. Create unlimited variations instantly.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Team collaboration</h3>
              <p className="mt-2 text-sm text-slate-400">
                Share galleries, collaborate on styling, and iterate together in real-time.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Globe className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">API ready</h3>
              <p className="mt-2 text-sm text-slate-400">
                Integrate with your existing stack. Built for scale and reliability.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <Lock className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Secure & private</h3>
              <p className="mt-2 text-sm text-slate-400">
                Your images are encrypted and never shared. Enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-slate-800/80 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for fashion teams that ship fast
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Whether you're a startup launching your first collection or an established brand optimizing conversion, Virtual Try-On fits your workflow.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="font-semibold">Reduce return rates</h4>
                    <p className="mt-1 text-sm text-slate-400">
                      Customers see exactly how products fit before purchasing, leading to fewer returns and happier customers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="font-semibold">Scale your content</h4>
                    <p className="mt-1 text-sm text-slate-400">
                      Generate unlimited product images without booking models or photographers. Scale your catalog instantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="font-semibold">Improve conversion</h4>
                    <p className="mt-1 text-sm text-slate-400">
                      Visual try-ons increase engagement and conversion rates. Show, don't just tell.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="text-3xl font-bold text-primary-400">40%</div>
                <p className="mt-2 text-sm text-slate-400">Average reduction in return rates</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="text-3xl font-bold text-sky-400">3x</div>
                <p className="mt-2 text-sm text-slate-400">Faster content creation vs traditional shoots</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="text-3xl font-bold text-emerald-400">25%</div>
                <p className="mt-2 text-sm text-slate-400">Increase in conversion rates</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="text-3xl font-bold text-purple-400">10k+</div>
                <p className="mt-2 text-sm text-slate-400">Try-ons generated monthly by our users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-slate-400">Start free, scale as you grow</p>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
                <h3 className="text-xl font-semibold">Free</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>5 free credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Basic try-on features</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-6 block w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-slate-800"
                >
                  Get started
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-primary-500 bg-slate-900/90 p-8">
                <div className="mb-4 inline-block rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-300">
                  Most popular
                </div>
                <h3 className="text-xl font-semibold">Basic</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>50 credits/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-6 block w-full rounded-lg bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-400"
                >
                  Subscribe
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
                <h3 className="text-xl font-semibold">Premium</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29.99</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>200 credits/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Highest quality results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Advanced features</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-6 block w-full rounded-lg bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-400"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-sm text-primary-400 hover:text-primary-300">
              View detailed pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-y border-slate-800/80 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-12 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <HelpCircle className="h-5 w-5 text-primary-400" />
                How accurate are the try-on results?
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Our AI uses advanced computer vision models trained on millions of fashion images to produce highly realistic results. While results may vary based on image quality, most users report 90%+ satisfaction with the output.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <HelpCircle className="h-5 w-5 text-primary-400" />
                Can I use the generated images commercially?
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Yes! All images generated through Virtual Try-On can be used for commercial purposes including product pages, marketing campaigns, and social media.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <HelpCircle className="h-5 w-5 text-primary-400" />
                What image formats do you support?
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                We support all common image formats including JPG, PNG, and WEBP. Images up to 10MB are supported for optimal processing.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <HelpCircle className="h-5 w-5 text-primary-400" />
                Is there an API available?
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Yes! We offer a RESTful API for enterprise customers. Contact us to learn more about API access and custom integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to transform your fashion workflow?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Join hundreds of fashion brands using AI to create better customer experiences.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-400"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-800"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-primary-500/90 shadow-lg shadow-primary-500/40" />
                <span className="text-sm font-semibold tracking-tight text-slate-100">
                  Virtual Try-On
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                AI-powered virtual fitting room for modern fashion teams.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li><Link href="#features" className="hover:text-slate-200">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-slate-200">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-slate-200">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li><Link href="#" className="hover:text-slate-200">About</Link></li>
                <li><Link href="#" className="hover:text-slate-200">Blog</Link></li>
                <li><Link href="#" className="hover:text-slate-200">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-4 space-y-2 text-xs text-slate-400">
                <li><Link href="#" className="hover:text-slate-200">Documentation</Link></li>
                <li><Link href="#" className="hover:text-slate-200">Contact</Link></li>
                <li><Link href="/login" className="hover:text-slate-200">Login</Link></li>
              </ul>
          </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
            <p>© 2024 Virtual Try-On. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

