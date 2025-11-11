'use client';

import { ArrowLeft, Key, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="bg-white shadow-sm border-b-2 border-blue-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Setup Guide</h1>
              <p className="text-xs text-gray-600">Configure QuantaRoute API</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to QuickCart!
              </h2>
              <p className="text-gray-700">
                This app showcases the power of{' '}
                <strong>QuantaRoute Geocoding API</strong> for intelligent location
                detection and address management in e-commerce.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🚀 Quick Setup Steps
            </h3>

            <div className="space-y-4">
              <Card className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-orange-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-orange-600">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      Get Your API Key
                      <ExternalLink className="w-4 h-4" />
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Visit the QuantaRoute website to sign up and get your API key.
                    </p>
                    <a
                      href="https://quantaroute.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Visit QuantaRoute.com
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-600">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Configure Environment Variable
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Add your API key to the <code className="bg-gray-100 px-2 py-1 rounded text-xs">.env.local</code> file:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      NEXT_PUBLIC_QUANTAROUTE_API_KEY=your_api_key_here
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Restart Development Server
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      After adding the API key, restart your development server:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs">
                      npm run dev
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-green-50 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">All Set!</h4>
                    <p className="text-sm text-gray-700">
                      You're ready to experience intelligent location detection and
                      address auto-population powered by QuantaRoute.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              ✨ Key Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  📍 Auto Location Detection
                </h4>
                <p className="text-sm text-gray-600">
                  Automatically detect user location and populate pincode and address
                  details.
                </p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🗺️ Interactive Maps
                </h4>
                <p className="text-sm text-gray-600">
                  Visual location confirmation with MapLibre and Carto basemaps.
                </p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🎯 DigiPin Integration
                </h4>
                <p className="text-sm text-gray-600">
                  Generate and display unique DigiPin codes for precise location
                  identification.
                </p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  📱 Mobile-First Design
                </h4>
                <p className="text-sm text-gray-600">
                  Optimized for mobile devices with smooth, intuitive interface.
                </p>
              </Card>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={() => router.push('/')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
