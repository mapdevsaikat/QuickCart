/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Base path for GitHub Pages (use repository name)
  // Set GITHUB_REPOSITORY_NAME environment variable or update manually
  // For root domain on GitHub Pages, leave basePath empty
  basePath: process.env.GITHUB_REPOSITORY_NAME 
    ? `/${process.env.GITHUB_REPOSITORY_NAME}` 
    : (process.env.NODE_ENV === 'production' ? '/QuickCart' : ''),
  
  // Asset prefix for GitHub Pages (must match basePath)
  assetPrefix: process.env.GITHUB_REPOSITORY_NAME 
    ? `/${process.env.GITHUB_REPOSITORY_NAME}` 
    : (process.env.NODE_ENV === 'production' ? '/QuickCart' : ''),
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Ignore ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable trailing slash for cleaner URLs
  trailingSlash: false,
};

module.exports = nextConfig;
