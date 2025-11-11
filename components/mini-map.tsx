'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MiniMapProps {
  latitude: number;
  longitude: number;
  height?: string;
}

export function MiniMap({ latitude, longitude, height = '200px' }: MiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'carto-dark': {
              type: 'raster',
              tiles: [
                'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: 'carto-dark-layer',
              type: 'raster',
              source: 'carto-dark',
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        center: [longitude, latitude],
        zoom: 18,
      });

      marker.current = new maplibregl.Marker({ color: '#ef4444' })
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    } else {
      map.current.setCenter([longitude, latitude]);
      marker.current?.setLngLat([longitude, latitude]);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainer}
      style={{ height }}
      className="w-full rounded-lg overflow-hidden border-2 border-gray-200"
    />
  );
}
