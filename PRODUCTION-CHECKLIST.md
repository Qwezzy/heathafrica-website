# Production Deployment Checklist

Use this checklist to verify the production build before and after deployment.

## Pre-Deployment Checklist

### Build Verification

- [ ] Run `npm run build` successfully without errors
- [ ] Verify TypeScript compilation passes
- [ ] Check build output in `dist/` directory
- [ ] Verify all assets are present in `dist/assets/`
- [ ] Confirm code splitting is working (separate vendor and swiper chunks)
- [ ] Check bundle sizes are reasonable (< 200KB for main bundle)

### Local Production Testing

- [ ] Run `npm run preview` to test production build locally
- [ ] Test at http://localhost:4173

#### Functional Testing

- [ ] **Home Page**
  - [ ] Hero slider displays and auto-advances
  - [ ] All three slides are visible
  - [ ] Value propositions section displays all four cards
  - [ ] "Explore Our Solutions" button navigates to Services page
  - [ ] Approach section displays correctly

- [ ] **About Page**
  - [ ] "Who We Are" section displays
  - [ ] Mission statement is visible
  - [ ] All five core values are displayed
  - [ ] All four industry categories are shown
  - [ ] Vision statement is present

- [ ] **Services Page**
  - [ ] All seven services are displayed
  - [ ] AI Solutions service spans full width
  - [ ] Service cards show titles, descriptions, and features
  - [ ] Grid layout is responsive

- [ ] **Product Page**
  - [ ] Product hero section displays
  - [ ] Challenge and Solution sections are visible
  - [ ] Features section shows all three features
  - [ ] "Perfect For" section displays all tags

- [ ] **Contact Page**
  - [ ] Contact information for both offices displays
  - [ ] Contact form renders with all fields
  - [ ] Form validation works (try submitting empty form)
  - [ ] Form validation shows error messages
  - [ ] Valid form submission shows success message
  - [ ] Email validation works correctly

#### Navigation Testing

- [ ] **Header Navigation**
  - [ ] Logo is visible
  - [ ] All five navigation links are present
  - [ ] Clicking each link navigates to correct page
  - [ ] Active page is highlighted in navigation
  - [ ] Logo click returns to home page

- [ ] **Mobile Navigation**
  - [ ] Mobile menu button appears on small screens
  - [ ] Mobile menu opens when button is clicked
  - [ ] Mobile menu links work correctly
  - [ ] Mobile menu closes after navigation

- [ ] **Footer**
  - [ ] Footer appears on all pages
  - [ ] Copyright notice is present
  - [ ] Quick links to all pages work
  - [ ] Social media links are present
  - [ ] Privacy policy link is present

#### Responsive Design Testing

- [ ] **Mobile (< 768px)**
  - [ ] Test on viewport width 375px (iPhone)
  - [ ] Test on viewport width 414px (iPhone Plus)
  - [ ] All content is readable
  - [ ] No horizontal scrolling
  - [ ] Touch targets are adequate size
  - [ ] Mobile menu works correctly

- [ ] **Tablet (768px - 1024px)**
  - [ ] Test on viewport width 768px (iPad portrait)
  - [ ] Test on viewport width 1024px (iPad landscape)
  - [ ] Grid layouts adjust appropriately
  - [ ] Navigation displays correctly

- [ ] **Desktop (> 1024px)**
  - [ ] Test on viewport width 1280px
  - [ ] Test on viewport width 1920px
  - [ ] Full desktop navigation displays
  - [ ] Content is centered and not too wide

#### Browser Testing

- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)

#### Accessibility Testing

- [ ] **Keyboard Navigation**
  - [ ] Tab through all interactive elements
  - [ ] Focus indicators are visible
  - [ ] Enter/Space activates buttons and links
  - [ ] Can navigate entire site with keyboard only

- [ ] **Screen Reader**
  - [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
  - [ ] All images have alt text
  - [ ] Form labels are properly associated
  - [ ] ARIA labels are present where needed

- [ ] **Color Contrast**
  - [ ] Text meets 4.5:1 contrast ratio
  - [ ] Interactive elements have sufficient contrast
  - [ ] Focus indicators are visible

#### Performance Testing

- [ ] Run Lighthouse audit in Chrome DevTools
  - [ ] Performance score > 90
  - [ ] Accessibility score > 90
  - [ ] Best Practices score > 90
  - [ ] SEO score > 90

- [ ] Check Network Tab
  - [ ] Initial page load < 3 seconds
  - [ ] Total page size < 1MB
  - [ ] No 404 errors for assets
  - [ ] Assets load from correct paths

- [ ] Check Console
  - [ ] No JavaScript errors
  - [ ] No warning messages
  - [ ] No failed network requests

### Code Quality

- [ ] All tests pass: `npm test`
- [ ] No TypeScript errors: `npm run build`
- [ ] Code is committed to Git
- [ ] Git repository is up to date

### Environment Configuration

- [ ] Environment variables are documented in `.env.example`
- [ ] Production environment variables are prepared
- [ ] Sensitive data is not in environment variables
- [ ] API endpoints are configured (if applicable)

### Deployment Configuration

- [ ] `_redirects` file is in `public/` directory (Netlify)
- [ ] `vercel.json` is configured (Vercel)
- [ ] `netlify.toml` is configured (Netlify)
- [ ] SPA routing is configured for chosen platform

## Deployment Steps

### Netlify Deployment

- [ ] Connect Git repository to Netlify
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Set environment variables in Netlify dashboard
- [ ] Trigger deployment
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

### Vercel Deployment

- [ ] Connect Git repository to Vercel
- [ ] Configure project settings:
  - Framework: Vite
  - Build command: `npm run build`
  - Output directory: `dist`
- [ ] Set environment variables in Vercel dashboard
- [ ] Trigger deployment
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

## Post-Deployment Checklist

### Initial Verification

- [ ] Visit production URL
- [ ] Verify HTTPS is working
- [ ] Check that site loads without errors
- [ ] Verify no console errors in browser

### Functional Testing (Production)

Repeat all functional tests from pre-deployment on the live site:

- [ ] Test all pages load correctly
- [ ] Test all navigation links
- [ ] Test mobile menu
- [ ] Test contact form
- [ ] Test responsive design at all breakpoints
- [ ] Test on multiple browsers
- [ ] Test on real mobile devices

### Performance Verification

- [ ] Run Lighthouse audit on production URL
- [ ] Verify performance scores meet targets
- [ ] Check page load times
- [ ] Verify assets are loading from CDN
- [ ] Check that gzip compression is enabled

### SEO Verification

- [ ] Verify meta tags are present
- [ ] Check Open Graph tags (if implemented)
- [ ] Verify robots.txt is accessible (if applicable)
- [ ] Check sitemap.xml (if applicable)
- [ ] Test social media sharing (if applicable)

### Security Verification

- [ ] Verify HTTPS is enforced
- [ ] Check security headers are present:
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] X-XSS-Protection
  - [ ] Referrer-Policy
- [ ] Verify no sensitive data is exposed
- [ ] Check that environment variables are not visible in client

### Monitoring Setup

- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] Configure error tracking (Sentry, if implemented)
- [ ] Set up analytics (Google Analytics, if implemented)
- [ ] Configure performance monitoring

### Documentation

- [ ] Update README with production URL
- [ ] Document deployment process
- [ ] Document environment variables
- [ ] Create runbook for common issues

## Rollback Plan

If issues are discovered after deployment:

### Netlify Rollback

1. [ ] Go to Deploys tab in Netlify dashboard
2. [ ] Find previous working deployment
3. [ ] Click "Publish deploy" to rollback

### Vercel Rollback

1. [ ] Go to Deployments tab in Vercel dashboard
2. [ ] Find previous working deployment
3. [ ] Click "Promote to Production" to rollback

### Emergency Contacts

- **Technical Lead**: [Name/Email]
- **DevOps**: [Name/Email]
- **Project Manager**: [Name/Email]

## Post-Launch Tasks

### Immediate (Within 24 hours)

- [ ] Monitor error logs
- [ ] Check analytics for traffic
- [ ] Verify uptime monitoring is working
- [ ] Review performance metrics
- [ ] Check for any user-reported issues

### Short-term (Within 1 week)

- [ ] Review Lighthouse scores
- [ ] Analyze user behavior in analytics
- [ ] Check for any accessibility issues
- [ ] Review performance metrics
- [ ] Gather user feedback

### Ongoing

- [ ] Monitor uptime and performance
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Review and optimize performance quarterly
- [ ] Conduct accessibility audits quarterly

## Notes

- This checklist should be completed for every production deployment
- Keep a record of completed checklists for audit purposes
- Update this checklist as new requirements emerge
- Share any issues or improvements with the team

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Deployment Platform**: _______________
**Production URL**: _______________
**Git Commit**: _______________
