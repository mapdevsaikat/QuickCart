# QuickCart - Smart E-Commerce Checkout with QuantaRoute

A beautiful, mobile-first e-commerce checkout demo showcasing the power of **QuantaRoute Geocoding API** for intelligent location detection and address management.

## 🌟 Features

### Core Functionality
- **Automatic Location Detection**: Uses browser geolocation API to detect user's current location
- **Smart Address Auto-Fill**: Automatically populates pincode, city, and state using QuantaRoute's Location Lookup API
- **DigiPin Integration**: Displays unique DigiPin codes for precise location identification
- **Interactive Maps**: Visual confirmation of delivery location using MapLibre with Carto basemaps
- **Mobile-First Design**: Optimized for mobile devices with smooth, intuitive interface

### User Experience
- **Two-Page Flow**: Simple product listing → Smart checkout
- **Real-Time Cart Management**: Add, remove, and update quantities with instant feedback
- **Free Delivery Threshold**: Dynamic delivery charge calculation
- **Address Validation**: Form validation with proper pincode format checking
- **Visual Feedback**: Loading states, success messages, and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- QuantaRoute API key (get it from [quantaroute.com](https://developers.quantaroute.com))

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure API Key**:
Create or update `.env.local` file:
```bash
NEXT_PUBLIC_QUANTAROUTE_API_KEY=your_api_key_here
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open in browser**:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## 📱 Pages

### 1. Home Page (`/`)
- Welcome screen with location detection
- Product listing with dummy products
- Add to cart functionality
- Cart summary at bottom

### 2. Checkout Page (`/checkout`)
Three-step checkout process:
- **Cart Review**: Review items, adjust quantities
- **Address Form**: Smart address input with QuantaRoute integration
- **Order Confirmation**: Final review and place order

### 3. Setup Guide (`/setup`)
Helpful guide for configuring the QuantaRoute API key

## 🛠️ Technology Stack

### Frontend
- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Beautiful UI components
- **Lucide React**: Icon library

### Location Services
- **quantaroute-geocoding**: Official Node.js SDK for QuantaRoute API
- **MapLibre GL**: Open-source map rendering
- **Carto Basemaps**: Beautiful map tiles

### APIs Used
- **Location Lookup API**: Get administrative boundaries from coordinates
- **Coordinates to DigiPin**: Convert lat/lng to unique DigiPin codes
- Browser Geolocation API for user location detection

## 📦 Project Structure

```
├── app/
│   ├── api/
│   │   └── location-lookup/     # Server-side location API
│   ├── checkout/                # Checkout page
│   ├── setup/                   # Setup guide
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page
├── components/
│   ├── address-form.tsx         # Smart address form
│   ├── cart-summary.tsx         # Fixed bottom cart
│   ├── location-detector.tsx   # Location detection UI
│   ├── mini-map.tsx            # MapLibre map component
│   └── product-card.tsx        # Product display
├── contexts/
│   └── cart-context.tsx        # Global cart state
├── lib/
│   ├── quantaroute-client.ts   # QuantaRoute API client
│   ├── types.ts                # TypeScript types
│   └── dummy-products.ts       # Sample products
└── .env.local                  # Environment variables
```

## 🎯 QuantaRoute Integration

### Location Lookup
Automatically fetches administrative information from coordinates:
- Pincode (postal code)
- State
- Division
- Locality
- District
- DigiPin code
- Population density

### Example API Call
```typescript
const client = new QuantaRouteClient(apiKey);
const locationInfo = await client.lookupLocationFromCoordinates(28.6139, 77.2090);

console.log(locationInfo.administrative_info.pincode); // "110001"
console.log(locationInfo.digipin);                     // "39J-438-TJC7"
```

## 🎨 Design Features

### Mobile-First
- Responsive design optimized for mobile devices
- Touch-friendly buttons and inputs
- Swipe gestures support

### Visual Hierarchy
- Clear call-to-action buttons
- Color-coded status messages
- Gradient backgrounds for visual interest

### Smooth Transitions
- Animated loading states
- Smooth page transitions
- Interactive hover effects

## 🔒 Security & Best Practices

- Environment variables for API keys
- Client-side and server-side API calls
- Input validation and sanitization
- Error handling with user-friendly messages
- No hardcoded sensitive data

## 🌐 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- JavaScript enabled
- Geolocation API support (for automatic location detection)

## 📝 Future Enhancements

Potential features to add:
- Multiple saved addresses
- Order tracking with live location
- Delivery time estimation based on location
- Payment gateway integration
- Order history
- Product search and filters
- User authentication

## 🤝 About QuantaRoute

QuantaRoute provides India-specific geocoding services with:
- 36,000+ postal boundaries coverage
- Sub-100ms response times
- Government-level precision
- DigiPin technology for unique location codes
- Administrative boundary lookup
- Population density data

Learn more at [quantaroute.com](https://quantaroute.com)

## 🚀 Deployment to GitHub Pages

QuickCart is configured for easy deployment to GitHub Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Steps

1. Push code to GitHub repository
2. Add `NEXT_PUBLIC_QUANTAROUTE_API_KEY` as a GitHub secret
3. Enable GitHub Pages with GitHub Actions
4. The workflow will automatically deploy on every push to `main` branch

Your app will be live at: `https://YOUR_USERNAME.github.io/QuickCart/`

## 📄 License

This is a demo application showcasing QuantaRoute Geocoding API integration.

---

Built with ❤️ to showcase QuantaRoute's powerful geocoding capabilities
