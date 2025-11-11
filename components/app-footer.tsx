import { MapPin, Github, ExternalLink } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">QuickCart</span>
        </div>

        <p className="text-center text-sm mb-6">
          Intelligent checkout powered by{' '}
          <a
            href="https://quantaroute.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            QuantaRoute Geocoding
          </a>
        </p>

        <div className="flex justify-center gap-6 text-xs">
          <a
            href="/setup"
            className="hover:text-white flex items-center gap-1"
          >
            Setup Guide
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://quantaroute.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1"
          >
            API Docs
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-center text-xs mt-6 text-gray-500">
          Demo application showcasing QuantaRoute API integration
        </p>
      </div>
    </footer>
  );
}
