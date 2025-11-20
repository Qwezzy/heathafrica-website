# HEATH Website - React Application

This is the React version of the HEATH corporate website, built with modern web technologies.

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **Swiper** - Touch slider for hero carousel
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **fast-check** - Property-based testing library

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── layout/         # Header, Footer, Layout components
│   ├── home/           # Home page components
│   ├── about/          # About page components
│   ├── services/       # Services page components
│   ├── product/        # Product page components
│   └── contact/        # Contact page components
├── pages/              # Page-level components
├── data/               # Static data and content
├── test/               # Test configuration
│   └── setup.ts        # Vitest setup file
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind directives
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:5173`

## Testing

The project uses Vitest for unit testing and fast-check for property-based testing.

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

This will serve the production build at `http://localhost:4173`

## Deployment

The application is configured for deployment to modern hosting platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

### Quick Deploy Options

**Netlify** (Recommended):
- Build command: `npm run build`
- Publish directory: `dist`
- Configuration: `netlify.toml` included

**Vercel**:
- Build command: `npm run build`
- Output directory: `dist`
- Configuration: `vercel.json` included

**GitHub Pages**:
- See DEPLOYMENT.md for detailed instructions

### Environment Variables

Copy `.env.example` to `.env.local` and configure as needed:

```bash
cp .env.example .env.local
```

All environment variables must be prefixed with `VITE_` to be accessible in the application.

### Production Checklist

Before deploying to production, complete the checklist in [PRODUCTION-CHECKLIST.md](./PRODUCTION-CHECKLIST.md).

## Original HTML Files

The original static HTML files have been preserved with `-old` suffix for reference during migration.
