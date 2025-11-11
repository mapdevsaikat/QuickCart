'use client';

import { useState, useEffect } from 'react';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LocationDetectorProps {
  onLocationDetected: (lat: number, lng: number, pincode?: string) => void;
}

export function LocationDetector({ onLocationDetected }: LocationDetectorProps) {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
        setLoading(false);
        onLocationDetected(lat, lng);
      },
      (error) => {
        setLoading(false);
        setError('Unable to detect location. Please enable location access.');
        console.error('Geolocation error:', error);
      }
    );
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="rounded-full bg-blue-100 p-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Detect Your Location
          </h3>
          <p className="text-sm text-gray-600">
            We'll use your location to show nearby delivery options and auto-fill your pincode
          </p>
        </div>

        {location && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Location detected successfully!</span>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <Button
          onClick={detectLocation}
          disabled={loading || !!location}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Detecting...
            </>
          ) : location ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Location Detected
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              Use My Location
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
