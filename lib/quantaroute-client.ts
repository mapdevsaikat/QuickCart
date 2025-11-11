import axios from 'axios';

export interface LocationInfo {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  digipin: string;
  administrative_info: {
    country: string;
    state: string;
    division: string;
    locality: string;
    district: string;
    pincode: string;
    delivery: string;
    mean_population_density: number;
    min_population_density: number;
    max_population_density: number;
  };
  response_time_ms: number;
}

export interface GeocodeResult {
  digipin: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  formatted_address?: string;
}

export class QuantaRouteClient {
  private apiKey: string;
  private baseURL = 'https://api.quantaroute.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async lookupLocationFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<LocationInfo> {
    try {
      const response = await axios.get(`${this.baseURL}/location/lookup`, {
        params: {
          latitude,
          longitude,
        },
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Location lookup error:', error);
      throw error;
    }
  }

  async geocode(address: string): Promise<GeocodeResult> {
    try {
      const response = await axios.post(
        `${this.baseURL}/geocode`,
        { address },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  }

  async coordinatesToDigiPin(
    latitude: number,
    longitude: number
  ): Promise<{ digipin: string }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/coordinates-to-digipin`,
        { latitude, longitude },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Coordinates to DigiPin error:', error);
      throw error;
    }
  }
}
