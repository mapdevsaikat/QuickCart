'use client';

import { useState } from 'react';
import { ShoppingCart, MapPin, Sparkles } from 'lucide-react';
import { LocationDetector } from '@/components/location-detector';
import { ProductCard } from '@/components/product-card';
import { CartSummary } from '@/components/cart-summary';
import { dummyProducts } from '@/lib/dummy-products';
import { useCart } from '@/contexts/cart-context';

export default function Home() {
  const [locationDetected, setLocationDetected] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { getTotalItems } = useCart();

  const handleLocationDetected = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    setLocationDetected(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b-2 border-orange-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">QuickCart</h1>
                <p className="text-xs text-gray-600">Smart Shopping</p>
              </div>
            </div>
            {getTotalItems() > 0 && (
              <div className="bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-orange-700">
                  {getTotalItems()} items
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 pb-32">
        {!locationDetected ? (
          <div className="space-y-6">
            <div className="text-center space-y-3 mb-8">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-full">
                  <Sparkles className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to QuickCart!
              </h2>
              <p className="text-gray-600">
                Let's start by detecting your location for faster checkout
              </p>
            </div>

            <LocationDetector onLocationDetected={handleLocationDetected} />

            <div className="text-center">
              <button
                onClick={() => setLocationDetected(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Skip for now
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {userLocation && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <MapPin className="w-5 h-5" />
                  <div className="text-sm">
                    <p className="font-semibold">Delivery location set!</p>
                    <p className="text-xs text-green-600">
                      Showing products available in your area
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Featured Products
                </h2>
                <span className="text-sm text-gray-600">
                  {dummyProducts.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {dummyProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-gray-500">
                Powered by{' '}
                <a
                  href="https://quantaroute.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  QuantaRoute Geocoding
                </a>
              </p>
              <p className="text-xs text-gray-400">
                Need help?{' '}
                <a
                  href="/setup"
                  className="text-blue-500 hover:underline"
                >
                  View Setup Guide
                </a>
              </p>
            </div>
          </div>
        )}
      </main>

      <CartSummary />
    </div>
  );
}
