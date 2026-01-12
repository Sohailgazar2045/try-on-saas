import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary-700">Virtual Try-On</div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-primary-700 hover:text-primary-900">
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Try On Clothes with
            <span className="text-primary-600"> AI Magic</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            See how clothes look on you before buying. Powered by advanced AI technology.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/register"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/pricing"
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
            <p className="text-gray-600">Upload a photo of yourself or use a model photo</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Select Outfit</h3>
            <p className="text-gray-600">Choose from your uploaded outfits or browse our collection</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">See Results</h3>
            <p className="text-gray-600">Get instant AI-generated try-on results in seconds</p>
          </div>
        </div>
      </main>
    </div>
  )
}

