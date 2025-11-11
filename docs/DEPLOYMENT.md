# QuickCart - GitHub Pages Deployment Guide

This guide will help you deploy QuickCart to GitHub Pages.

## 🚀 Prerequisites

1. A GitHub account
2. A GitHub repository (named `QuickCart` or any name you prefer)
3. QuantaRoute API key ([Get one here](https://quantaroute.com))
4. Node.js 20.9.0 or higher (required for Next.js 16)

## 📋 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Create a new repository on GitHub
2. Name it `QuickCart` (or update the `basePath` in `next.config.js` if using a different name)
3. Initialize with a README (optional)

### 2. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: QuickCart deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/QuickCart.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. This will enable automatic deployment via the workflow we've set up

### 4. Add API Key as Secret

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NEXT_PUBLIC_QUANTAROUTE_API_KEY`
5. Value: Your QuantaRoute API key
6. Click **Add secret**

### 5. Configure Base Path (if needed)

If your repository name is different from `QuickCart`, update the base path:

1. Open `next.config.js`
2. Update the `basePath` value:
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
   ```

### 6. Trigger Deployment

1. The GitHub Actions workflow will automatically run when you push to `main` branch
2. You can also manually trigger it: **Actions** → **Deploy to GitHub Pages** → **Run workflow**
3. Wait for the workflow to complete (usually 2-3 minutes)
4. Once completed, your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/QuickCart/
   ```

## 🔧 Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the project
npm run build:gh-pages

# The static files will be in the /out directory
# You can deploy this directory to any static hosting service
```

### Deploy to GitHub Pages Manually

1. Build the project: `npm run build:gh-pages`
2. Push the `out` directory to the `gh-pages` branch:
   ```bash
   git subtree push --prefix out origin gh-pages
   ```
3. Or use the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
   Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build:gh-pages && gh-pages -d out"
   }
   ```
   Then run: `npm run deploy`

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Create a `CNAME` file in the `public` directory with your domain:
   ```
   yourdomain.com
   ```
2. Update your DNS settings to point to GitHub Pages
3. In GitHub repository settings, add your custom domain

## 📝 Environment Variables

### Required for Production

- `NEXT_PUBLIC_QUANTAROUTE_API_KEY`: Your QuantaRoute API key

### Setting in GitHub Actions

The workflow automatically uses the secret you configured:
```yaml
env:
  NEXT_PUBLIC_QUANTAROUTE_API_KEY: ${{ secrets.NEXT_PUBLIC_QUANTAROUTE_API_KEY }}
```

### Local Development

Create a `.env.local` file:
```bash
NEXT_PUBLIC_QUANTAROUTE_API_KEY=your_api_key_here
```

**Note**: Never commit `.env.local` to git (it's in `.gitignore`)

## 🔍 Troubleshooting

### Build Fails

1. Check GitHub Actions logs for errors
2. Verify API key is set correctly in secrets
3. Ensure `node_modules` is not committed (check `.gitignore`)

### 404 Errors on Routes

- Verify `basePath` is correct in `next.config.js`
- Check that the repository name matches the basePath
- Clear browser cache and try again

### API Key Not Working

1. Verify the API key is correct
2. Check that the secret name matches exactly: `NEXT_PUBLIC_QUANTAROUTE_API_KEY`
3. Ensure the API key has the required permissions

### Assets Not Loading

1. Check that `assetPrefix` matches `basePath` in `next.config.js`
2. Verify images are in the `public` directory
3. Check browser console for 404 errors

## 📊 Monitoring Deployment

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. View build logs and deployment status
4. Check the **Pages** section in Settings for deployment URL

## 🎯 Post-Deployment

After successful deployment:

1. Test the application at your GitHub Pages URL
2. Verify location detection works
3. Test the checkout flow
4. Check mobile responsiveness
5. Verify API calls are working

## 🔄 Updating the Site

To update the site:

1. Make your changes locally
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. GitHub Actions will automatically rebuild and redeploy
4. Wait 2-3 minutes for deployment to complete

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [QuantaRoute Documentation](https://quantaroute.com/docs)

## 🆘 Need Help?

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify all configuration steps are completed
3. Ensure API key is valid and has proper permissions
4. Check browser console for client-side errors

---

