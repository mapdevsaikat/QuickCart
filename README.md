# QuickCart 🛒

> A smart e-commerce checkout demo showcasing QuantaRoute Geocoding SDK for efficient address management and location-based services.

![QuickCart](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen?style=for-the-badge&logo=github)

## 🎯 Overview

QuickCart is a mobile-first e-commerce demo application that demonstrates the efficiency of using the **QuantaRoute Geocoding SDK** for seamless checkout experiences. The app focuses on an easy, streamlined checkout flow with intelligent location detection and automatic address population.

## ✨ Key Features

- 🎯 **Smart Location Detection** - Automatic location detection using browser geolocation
- 📍 **Auto-Fill Address** - Intelligent address auto-population using QuantaRoute API
- 🗺️ **Interactive Maps** - Visual location confirmation with MapLibre
- 🛒 **Easy Checkout Flow** - Streamlined 3-step checkout process
- 📱 **Mobile-First Design** - Optimized for mobile devices
- ⚡ **Fast & Efficient** - Quick address lookup and form population

## 🚀 Quick Start

### Prerequisites

- Node.js 20.9.0 or higher (required for Next.js 16)
- QuantaRoute API key ([Get one here](https://quantaroute.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/QuickCart.git
cd QuickCart

# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_QUANTAROUTE_API_KEY=your_api_key_here" > .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📚 Documentation

- **[Full Documentation](./README-QUICKCART.md)** - Complete feature documentation and API details
- **[Deployment Guide](./DEPLOYMENT.md)** - Step-by-step GitHub Pages deployment instructions
- **[Quick Start Guide](./QUICKSTART.md)** - Quick setup and getting started

## 🌐 Deploy to GitHub Pages

QuickCart is ready for GitHub Pages deployment out of the box!

1. Push your code to GitHub
2. Add `NEXT_PUBLIC_QUANTAROUTE_API_KEY` as a GitHub secret
3. Enable GitHub Pages with GitHub Actions
4. Your app will be automatically deployed

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Live Demo**: `https://YOUR_USERNAME.github.io/QuickCart/`

## 🛠️ Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Maps**: MapLibre GL
- **Geocoding**: QuantaRoute Geocoding SDK

## 📖 About QuantaRoute

QuantaRoute provides India-specific geocoding services with:
- 36,000+ postal boundaries coverage
- Sub-100ms response times
- Government-level precision
- DigiPin technology for unique location codes

Learn more at [quantaroute.com](https://quantaroute.com)

## 📝 Project Structure

```
QuickCart/
├── app/                    # Next.js app directory
│   ├── checkout/          # Checkout page
│   ├── setup/             # Setup guide
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── address-form.tsx   # Smart address form
│   ├── location-detector.tsx
│   └── mini-map.tsx       # Map component
├── contexts/              # React contexts
│   └── cart-context.tsx   # Cart state management
├── lib/                   # Utilities and types
└── .github/               # GitHub Actions workflow
```

## 🤝 Contributing

This is a demo application. Feel free to fork and customize for your needs!

## 📄 License

This is a demo application showcasing QuantaRoute Geocoding API integration.

## 🙏 Acknowledgments

- [QuantaRoute](https://quantaroute.com) for providing the geocoding API
- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components

---

**Built with ❤️ to showcase QuantaRoute's powerful geocoding capabilities**

For questions or support, please refer to the [documentation](./README-QUICKCART.md) or [deployment guide](./DEPLOYMENT.md).

