# QuickCart - Quick Start Guide 🚀

Get up and running with QuickCart in 3 simple steps!

## ⚡ Super Quick Setup

### Step 1: Get Your QuantaRoute API Key
Visit [quantaroute.com](https://developers.quantaroute.com) and sign up to get your API key.

### Step 2: Configure Environment
Create/update `.env.local` in the project root:

```bash
NEXT_PUBLIC_QUANTAROUTE_API_KEY=your_api_key_here
```

### Step 3: Run the App

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 📱 Using the App

### Home Page
1. Click **"Use My Location"** to detect your current location
2. Browse products and add items to cart
3. Click **"Proceed to Checkout"** when ready

### Checkout Flow
1. **Review Cart**: Adjust quantities or remove items
2. **Enter Address**: Use the smart address form with auto-populated fields
3. **Confirm Order**: Review everything and place your order

## 🎯 Key Features to Try

- ✅ **Auto Location Detection** - Allow location access to see auto-fill in action
- ✅ **DigiPin Display** - Notice the unique DigiPin code for your location
- ✅ **Interactive Map** - See your delivery location on the map
- ✅ **Smart Address Form** - City, state, and pincode auto-populate
- ✅ **Mobile Experience** - Try it on your phone for the best experience

## 🔧 Troubleshooting

### API Key Not Working?
- Make sure you've added it to `.env.local`
- Restart your dev server after adding the key
- Check that the key is correct (no extra spaces)

### Location Not Detecting?
- Make sure to allow location access in your browser
- Check if HTTPS is enabled (required for geolocation)
- Try using the "Skip for now" option and enter address manually

### Map Not Showing?
- This is normal if MapLibre is still loading
- Check browser console for any errors
- Make sure you have internet connection

## 📚 More Information

- **Full Documentation**: See `README-QUICKCART.md`
- **Setup Guide**: Visit `/setup` page in the app
- **QuantaRoute Docs**: [quantaroute.com](https://quantaroute.com)

## 🎨 What Makes This Special?

This demo showcases:
- **India-Specific Geocoding** with 36,000+ postal boundaries
- **Sub-100ms Response Times** for instant address lookup
- **DigiPin Technology** for precise location codes
- **Population Density Data** integration
- **Government-Level Accuracy** in address details

## 💡 Next Steps

1. Try the location detection feature
2. Add products to cart
3. Experience the smart checkout flow
4. See how QuantaRoute auto-fills address details
5. Check out the DigiPin code for your location

---

**Happy Shopping! 🛍️**

Built with ❤️ to demonstrate QuantaRoute Geocoding API
