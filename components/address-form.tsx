'use client';

import { useState, useEffect } from 'react';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { MiniMap } from './mini-map';
import { DeliveryAddress } from '@/lib/types';

interface AddressFormProps {
  initialLocation?: { lat: number; lng: number };
  onSubmit: (address: DeliveryAddress) => void;
}

export function AddressForm({ initialLocation, onSubmit }: AddressFormProps) {
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DeliveryAddress>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    latitude: initialLocation?.lat,
    longitude: initialLocation?.lng,
  });

  const [locationData, setLocationData] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation || null);

  useEffect(() => {
    if (initialLocation) {
      fetchLocationInfo(initialLocation.lat, initialLocation.lng);
    }
  }, [initialLocation]);

  const cleanLocalityName = (locality: string): string => {
    if (!locality) return '';
    
    // Remove common post office suffixes and administrative designations
    // Patterns to remove: "SO", "BO", "Action Area I SO", "Action Area 1 SO", etc.
    let cleaned = locality.trim();
    
    // Remove "Action Area" designations first (e.g., "Action Area I SO", "Action Area 1", "Action Area II", etc.)
    // This handles both Roman numerals (I, II, III, IV, V, etc.) and Arabic numerals (1, 2, 3, etc.)
    cleaned = cleaned.replace(/\s+Action\s+Area\s+[IVX0-9]+(\s+(SO|BO|S.O|B.O))?$/i, '');
    
    // Remove other common administrative suffixes with numbers/letters
    cleaned = cleaned.replace(/\s+(Sector|Block|Zone|Ward|Area)\s+[A-Z0-9]+(\s+(SO|BO|S.O|B.O))?$/i, '');
    
    // Remove post office suffixes (SO, BO, HO, PO, etc.) at the end
    cleaned = cleaned.replace(/\s+(SO|BO|HO|PO|Sub Post Office|Branch Office|Head Post Office|Post Office)$/i, '');
    
    // Remove any remaining standalone administrative terms at the end
    cleaned = cleaned.replace(/\s+(SO|BO|S.O|B.O|Area|Zone|Sector|Block|Ward)$/i, '').trim();
    
    // If the cleaned result is empty or too short, return the original
    if (cleaned.length < 2) {
      return locality.trim();
    }
    
    return cleaned;
  };

  const parseAddress = (address: string) => {
    // Parse the address string to extract components
    // Format: "Maharaja Nandakumar Mahavidyalaya, Contai-Nandakumar Road, Uttar Pada, Nandakumar, Purba Medinipur, West Bengal, 721632, India"
    const parts = address.split(',').map(p => p.trim());
    
    // Usually the format is: Building/House, Road, Area, Locality, District, State, Pincode, Country
    const parsed: Partial<{ addressLine1: string; addressLine2: string; city: string; state: string; pincode: string }> = {};
    
    // Remove country (usually last part)
    const filteredParts = parts.filter(p => p.toLowerCase() !== 'india');
    
    // Get pincode (6-digit number, usually second to last)
    const pincodeMatch = filteredParts.find(p => /^\d{6}$/.test(p));
    if (pincodeMatch) {
      parsed.pincode = pincodeMatch;
      const pincodeIndex = filteredParts.indexOf(pincodeMatch);
      
      // Get state (usually before pincode)
      if (pincodeIndex > 0) {
        parsed.state = filteredParts[pincodeIndex - 1];
      }
      
      // Get district/city (usually before state) and clean it
      if (pincodeIndex > 1) {
        const cityRaw = filteredParts[pincodeIndex - 2];
        parsed.city = cleanLocalityName(cityRaw);
      }
      
      // Get road name and area (parts before city/district)
      const locationParts = filteredParts.slice(0, Math.max(0, pincodeIndex - 2));
      if (locationParts.length > 1) {
        // First part is usually building/house, rest is road/area
        parsed.addressLine1 = locationParts[0];
        parsed.addressLine2 = locationParts.slice(1).join(', ');
      } else if (locationParts.length === 1) {
        // Single part could be building or road
        parsed.addressLine2 = locationParts[0];
      }
    } else {
      // Fallback: if no pincode found, use last few parts for state/city
      if (filteredParts.length >= 2) {
        parsed.state = filteredParts[filteredParts.length - 2];
        const cityRaw = filteredParts[filteredParts.length - 3] || '';
        parsed.city = cleanLocalityName(cityRaw);
      }
      
      // Use first parts for road/house
      if (filteredParts.length > 3) {
        parsed.addressLine1 = filteredParts[0];
        parsed.addressLine2 = filteredParts.slice(1, -2).join(', ');
      }
    }
    
    return parsed;
  };

  const fetchLocationInfo = async (lat: number, lng: number) => {
    setLoading(true);
    setLocationError(null);
    
    try {
      // Get API key from environment (available on client via NEXT_PUBLIC_)
      const apiKey = process.env.NEXT_PUBLIC_QUANTAROUTE_API_KEY;

      if (!apiKey) {
        throw new Error('QuantaRoute API key not configured. Please set NEXT_PUBLIC_QUANTAROUTE_API_KEY in your environment.');
      }

      // Step 1: Get DigiPin and administrative info from coordinates
      // Using the hosted MCP server REST API at https://mcp-gc.quantaroute.com/
      const lookupResponse = await fetch(
        'https://mcp-gc.quantaroute.com/api/lookup-location-from-coordinates',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify({ latitude: lat, longitude: lng }),
        }
      );

      const lookupData = await lookupResponse.json();

      // Check if the response has an error
      if (!lookupResponse.ok || lookupData.error || !lookupData.success) {
        const errorMessage = lookupData.message || lookupData.error || 'Failed to get location information';
        console.error('Location lookup error:', lookupData);
        throw new Error(errorMessage);
      }

      // Check if we have the expected success structure
      if (!lookupData.data?.digipin) {
        console.error('Invalid lookup response structure:', lookupData);
        throw new Error('Failed to get DigiPin - invalid response format');
      }

      const digipin = lookupData.data.digipin;
      const adminInfo = lookupData.data.administrative_info;

      console.log('Step 1 success - DigiPin:', digipin, 'Admin Info:', adminInfo);

      // Clean locality name to remove post office suffixes
      const cleanedLocality = adminInfo?.locality ? cleanLocalityName(adminInfo.locality) : '';
      const cleanedDivision = adminInfo?.division ? cleanLocalityName(adminInfo.division) : '';

      // Start with data from administrative_info (always available from step 1)
      let updatedFormData: Partial<DeliveryAddress> = {
        pincode: adminInfo?.pincode || '',
        state: adminInfo?.state || '',
        city: cleanedLocality || cleanedDivision || '',
        latitude: lat,
        longitude: lng,
        digipin: digipin || '',
      };

      // Step 2: Get detailed address from DigiPin reverse API (optional - for address lines)
      // Using the hosted MCP server REST API
      try {
        const reverseResponse = await fetch(
          'https://mcp-gc.quantaroute.com/api/reverse-geocode',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
            body: JSON.stringify({ digipin }),
          }
        );

        const reverseData = await reverseResponse.json();

        // Check if the response has an error
        if (!reverseResponse.ok || reverseData.error || !reverseData.success) {
          console.warn('Reverse lookup failed (non-critical):', reverseData);
          // Don't throw - we can still populate with admin_info
        } else if (reverseData.data?.address) {
          console.log('Step 2 success - Address:', reverseData.data.address);

          // Parse address and add address lines
          const address = reverseData.data.address;
          const parsedAddress = parseAddress(address);

          // Add address lines from parsed address
          updatedFormData.addressLine1 = parsedAddress.addressLine1 || address.split(',')[0]?.trim() || '';
          updatedFormData.addressLine2 = parsedAddress.addressLine2 || address.split(',')[1]?.trim() || '';
        } else {
          console.warn('Invalid reverse response structure (non-critical):', reverseData);
        }
      } catch (reverseError: any) {
        console.warn('Reverse lookup error (non-critical):', reverseError);
        // Continue with admin_info data only
      }

      console.log('Populating form with:', updatedFormData);

      // Clear any previous errors since we successfully got location data
      setLocationError(null);

      setFormData((prev) => ({
        ...prev,
        ...updatedFormData,
      }));
    } catch (error: any) {
      console.error('Error fetching location info:', error);
      
      if (error.code === 1 || error.message?.includes('permission')) {
        setLocationError('Please enable location permissions and try again.');
      } else if (error.code === 2 || error.message?.includes('unavailable')) {
        setLocationError('Location information is unavailable. Please try again.');
      } else if (error.code === 3 || error.message?.includes('timeout')) {
        setLocationError('Location request timed out. Please try again.');
      } else {
        setLocationError(error instanceof Error ? error.message : 'Failed to get location');
      }
    } finally {
      setLoading(false);
    }
  };

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setDetectingLocation(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocationData({ lat, lng });
        fetchLocationInfo(lat, lng);
        setDetectingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        if (error.code === 1) {
          setLocationError('Please enable location permissions and try again.');
        } else if (error.code === 2) {
          setLocationError('Location information is unavailable. Please try again.');
        } else if (error.code === 3) {
          setLocationError('Location request timed out. Please try again.');
        } else {
          setLocationError('Unable to detect location. Please enable location access.');
        }
        setDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.pincode) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field: keyof DeliveryAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {locationData && (
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="rounded-full bg-green-100 p-2">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Delivery Location
              </h3>
              <p className="text-sm text-gray-600">
                {formData.digipin && (
                  <span className="font-mono text-green-700">
                    DigiPin: {formData.digipin}
                  </span>
                )}
              </p>
            </div>
          </div>
          {locationError && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {locationError}
            </div>
          )}
          <MiniMap
            latitude={locationData.lat}
            longitude={locationData.lng}
            height="180px"
          />
        </Card>
      )}

      {!locationData && (
        <div>
          <Button
            type="button"
            onClick={detectCurrentLocation}
            disabled={detectingLocation || loading}
            variant="outline"
            className="w-full border-2 border-blue-200"
          >
            {detectingLocation || loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {detectingLocation ? 'Detecting Location...' : 'Fetching Address...'}
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Detect Current Location
              </>
            )}
          </Button>
          {locationError && (
            <p className="mt-2 text-sm text-red-500">{locationError}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="10-digit mobile number"
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div>
          <Label htmlFor="addressLine1">Address Line 1 *</Label>
          <Input
            id="addressLine1"
            value={formData.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            placeholder="House No., Building Name"
            required
          />
        </div>

        <div>
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            id="addressLine2"
            value={formData.addressLine2 || ''}
            onChange={(e) => handleChange('addressLine2', e.target.value)}
            placeholder="Road name, Area, Colony"
          />
        </div>

        <div>
          <Label htmlFor="landmark">Landmark</Label>
          <Input
            id="landmark"
            value={formData.landmark || ''}
            onChange={(e) => handleChange('landmark', e.target.value)}
            placeholder="Nearby landmark"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="City"
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={formData.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
              placeholder="6-digit PIN"
              pattern="[0-9]{6}"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            placeholder="State"
            required
            disabled={loading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg mt-6"
        size="lg"
      >
        Save Address & Continue
      </Button>
    </form>
  );
}
