# HEATH Website Deployment Guide

This document provides comprehensive instructions for deploying the HEATH corporate website to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Configuration](#build-configuration)
3. [Environment Variables](#environment-variables)
4. [Local Production Testing](#local-production-testing)
5. [Deployment Options](#deployment-options)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Git repository access
- All tests passing (`npm test`)
- Production environment variables configured

## Build Configuration

### Production Build

The project uses Vite for building. The production build is optimized with:

- **Code splitting**: Vendor libraries and Swiper are split into separate chunks
- **Minification**: Terser minification with console.log removal
- **Tree shaking**: Unused code is automatically removed
- **CSS optimization**: Tailwind CSS purges unused styles

### Build Command

```bash
npm run build
```

This command:
1. Runs TypeScript compiler to check for type errors
2. Builds the application using Vite
3. Outputs optimized files to the `dist/` directory

### Build Output

The `dist/` directory will contain:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS, and other static assets
- `img/` - Image assets
- Other static files from the `public/` directory

## Environment Variables

### Creating Environment Files

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Configure variables for your environment:
   ```env
   # API Configuration (for future backend integration)
   VITE_API_URL=https://api.heathafrica.com
   
   # Analytics (optional)
   VITE_GA_ID=G-XXXXXXXXXX
   
   # Contact Form Endpoint (when backend is implemented)
   VITE_CONTACT_FORM_URL=https://api.heathafrica.com/contact
   
   # Environment
   VITE_ENV=production
   ```

### Environment Variable Usage

All environment variables must be prefixed with `VITE_` to be accessible in the application:

```typescript
// Accessing environment variables in code
const apiUrl = import.meta.env.VITE_API_URL;
const environment = import.meta.env.VITE_ENV;
```

### Security Notes

- **Never commit `.env.local` or `.env.production` files** to version control
- The `.env.example` file should only contain example values, not real credentials
- Environment variables are embedded in the build at build time
- Sensitive data should never be stored in environment variables accessible to the client

## Local Production Testing

Before deploying to production, test the production build locally:

### 1. Create Production Build

```bash
npm run build
```

### 2. Preview Production Build

```bash
npm run preview
```

This starts a local server serving the production build from the `dist/` directory.

### 3. Test Checklist

Verify the following in the production build:

- [ ] All pages load correctly (Home, About, Services, Product, Contact)
- [ ] Navigation works between all pages
- [ ] Mobile menu functions properly
- [ ] Contact form validation works
- [ ] Hero slider on home page works
- [ ] All images load correctly
- [ ] Responsive design works at all breakpoints
- [ ] Browser back/forward buttons work
- [ ] Direct URL access to all routes works
- [ ] 404 page displays for invalid routes
- [ ] All interactive elements have hover/focus states
- [ ] No console errors in browser developer tools

### 4. Performance Testing

Use browser developer tools to verify:

- **Lighthouse Score**: Run Lighthouse audit (target: 90+ for all metrics)
- **Bundle Size**: Check network tab for asset sizes
- **Load Time**: Verify initial page load is under 3 seconds
- **Code Splitting**: Verify separate chunks are loaded on demand

## Deployment Options

### Option 1: Netlify (Recommended)

Netlify provides automatic deployments from Git with built-in CDN and HTTPS.

#### Setup Steps

1. **Connect Repository**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add your production environment variables

4. **Deploy**
   - Netlify will automatically build and deploy
   - Subsequent pushes to main branch trigger automatic deployments

#### Configuration Files

The project includes `netlify.toml` with:
- Build configuration
- SPA redirect rules
- Security headers
- Cache headers for static assets

### Option 2: Vercel

Vercel offers similar features to Netlify with excellent performance.

#### Setup Steps

1. **Connect Repository**
   - Sign up at [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   - Add environment variables in project settings

4. **Deploy**
   - Vercel automatically detects Vite and configures correctly
   - Automatic deployments on Git push

#### Configuration Files

The project includes `vercel.json` with:
- SPA rewrite rules
- Cache headers for assets

### Option 3: GitHub Pages

For static hosting directly from GitHub repository.

#### Setup Steps

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Deploy Script**
   Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Configure Base Path**
   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/repository-name/',
     // ... other config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select `gh-pages` branch as source

### Option 4: Traditional Web Server (Nginx/Apache)

For deployment to your own server.

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name heathafrica.com www.heathafrica.com;
    
    root /var/www/heath-website/dist;
    index index.html;
    
    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

#### Apache Configuration

Create `.htaccess` in the `dist/` directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

#### Deployment Steps

1. Build the application:
   ```bash
   npm run build
   ```

2. Upload `dist/` contents to server:
   ```bash
   rsync -avz dist/ user@server:/var/www/heath-website/dist/
   ```

3. Restart web server:
   ```bash
   sudo systemctl restart nginx
   # or
   sudo systemctl restart apache2
   ```

## Post-Deployment Verification

After deployment, verify the following:

### Functional Testing

- [ ] Visit the production URL
- [ ] Test all navigation links
- [ ] Test mobile menu on small screens
- [ ] Submit contact form (if backend is connected)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS and Android)

### Performance Testing

- [ ] Run Lighthouse audit on production URL
- [ ] Check page load times
- [ ] Verify assets are loading from CDN
- [ ] Check for any console errors

### SEO Verification

- [ ] Verify meta tags are present
- [ ] Check that pages are indexable
- [ ] Submit sitemap to search engines (if applicable)

### Security Checks

- [ ] Verify HTTPS is working
- [ ] Check security headers are present
- [ ] Ensure no sensitive data is exposed

## Troubleshooting

### Issue: Blank Page After Deployment

**Cause**: Incorrect base path or routing configuration

**Solution**:
1. Check browser console for errors
2. Verify `base` path in `vite.config.ts` matches deployment path
3. Ensure SPA redirect rules are configured correctly

### Issue: 404 Errors on Page Refresh

**Cause**: Server not configured for SPA routing

**Solution**:
1. Verify `_redirects` file (Netlify) or `vercel.json` (Vercel) is present
2. For custom servers, ensure rewrite rules are configured
3. Check that all routes redirect to `index.html`

### Issue: Assets Not Loading

**Cause**: Incorrect asset paths or missing files

**Solution**:
1. Check that `public/` directory contents are in build output
2. Verify asset paths don't have hardcoded domains
3. Check browser network tab for 404 errors

### Issue: Environment Variables Not Working

**Cause**: Variables not prefixed with `VITE_` or not set in deployment platform

**Solution**:
1. Ensure all variables start with `VITE_`
2. Set variables in deployment platform (Netlify/Vercel settings)
3. Rebuild application after changing environment variables

### Issue: Slow Load Times

**Cause**: Large bundle size or unoptimized assets

**Solution**:
1. Run bundle analyzer: `npm run build -- --mode analyze`
2. Optimize images (compress, use WebP format)
3. Verify code splitting is working
4. Check CDN is serving assets

### Issue: Styles Not Applied

**Cause**: Tailwind CSS not purging correctly or CSS not loading

**Solution**:
1. Verify `tailwind.config.js` content paths are correct
2. Check that CSS file is imported in `main.tsx`
3. Clear browser cache and hard reload

## Continuous Deployment

### Automated Deployments

Both Netlify and Vercel support automatic deployments:

1. **Main Branch**: Automatically deploys to production
2. **Pull Requests**: Creates preview deployments for testing
3. **Other Branches**: Can be configured for staging environments

### Deployment Workflow

```
Developer Push → Git Repository → CI/CD Platform → Build → Deploy → Live Site
```

### Rollback Procedure

If issues occur after deployment:

**Netlify**:
1. Go to Deploys tab
2. Find previous working deployment
3. Click "Publish deploy"

**Vercel**:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

## Monitoring and Maintenance

### Recommended Monitoring

- **Uptime Monitoring**: Use services like UptimeRobot or Pingdom
- **Error Tracking**: Consider Sentry for JavaScript error tracking
- **Analytics**: Google Analytics or privacy-focused alternatives
- **Performance**: Regular Lighthouse audits

### Regular Maintenance

- Update dependencies monthly: `npm update`
- Review and update content as needed
- Monitor and optimize performance
- Review security advisories

## Support

For deployment issues or questions:
- Check this documentation first
- Review platform-specific documentation (Netlify/Vercel)
- Check browser console for errors
- Review build logs for deployment failures

---

**Last Updated**: 2025
**Version**: 1.0.0
