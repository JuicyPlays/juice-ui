# JuicyPlays UI

React + Vite frontend for the JuicyPlays esports analytics platform. Provides real-time line discrepancy alerts, AI-generated slips, and subscription management for CS2, Valorant, League of Legends, Call of Duty, and Dota 2.

---

## 🎯 Overview

The `juice-ui` is a modern React application built with Vite that delivers:
- **Juicy Screen** - Real-time esports prop line comparisons with +EV indicators
- **Slip Generator** - AI-optimized parlays across multiple sportsbooks
- **Subscription Management** - Stripe-powered billing with tiered access
- **Responsive Design** - Mobile-first UI with Material-UI components

---

## 📁 Project Structure

```
juice-ui/
├── src/
│   ├── pages/
│   │   ├── Home/                    # Landing page (atomic components)
│   │   │   ├── index.jsx            # Main orchestrator
│   │   │   ├── components/          # Hero, Pricing, FAQ, etc.
│   │   │   ├── data/                # Pricing plans, FAQ data
│   │   │   └── styles/              # Extracted styles
│   │   ├── JuicyPlays.js            # Main dashboard (line comparisons)
│   │   ├── Slips.js                 # Slip generator page
│   │   ├── Account.js               # User account management
│   │   └── NavBar.js / Footer.js    # Layout components
│   ├── hooks/
│   │   ├── useMediaQuery.js         # Responsive breakpoint hook
│   │   ├── useJuicyPlaysData.js     # Data fetching for Juicy Screen
│   │   ├── useSlipsData.js          # Data fetching for Slip Generator
│   │   └── useSubscriptionStatus.js # Subscription checking
│   ├── common/
│   │   ├── columns.js               # MaterialReactTable column definitions
│   │   ├── constants.js             # API endpoints and constants
│   │   └── SlipComponent.js         # Slip display component
│   └── App.js                       # Root component with routing
├── public/                          # Static assets
├── .env.example                     # Environment variable template
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies
```

---

## 🚀 Local Development Setup

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm 9+** or **yarn 1.22+**
- **Supabase account** (for authentication)
- **Stripe account** (for payments)

### 1. Clone the Repository

```bash
cd /path/to/JuicyPlays
cd juice-ui
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

**Key Dependencies:**
- `react@18.3.1` - UI library
- `vite@6.0.7` - Build tool
- `react-router-dom@7.1.1` - Routing
- `@mui/material@6.3.0` - UI components
- `material-react-table@3.3.0` - Data tables
- `@stripe/react-stripe-js@3.2.0` - Payment integration
- `@supabase/supabase-js@2.49.2` - Authentication
- `react-auth-kit@3.1.3` - Auth state management
- `axios@1.7.9` - HTTP client

### 3. Configure Environment Variables

Create a `.env` file in the `juice-ui/` directory:

```bash
# Supabase Configuration (Authentication)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON=your-supabase-anon-key

# Backend API
VITE_JUICE_API_BASE_URL=http://localhost:8080
VITE_JUICE_API_USERS=http://localhost:8080/users

# Stripe Configuration (Payments)
VITE_STRIPE_PK=pk_test_your_stripe_publishable_key

# Application URL
VITE_BASE_URL=http://localhost:5173
```

**Environment Variable Details:**

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON` | Supabase anonymous key (public) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_JUICE_API_BASE_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_JUICE_API_USERS` | User management endpoint | `http://localhost:8080/users` |
| `VITE_STRIPE_PK` | Stripe publishable key | `pk_test_51...` |
| `VITE_BASE_URL` | Frontend URL (for redirects) | `http://localhost:5173` |

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

**Server will start at:** `http://localhost:5173`

**Hot Module Replacement (HMR)** is enabled - changes will reflect instantly.

---

## 🏃 Available Scripts

### Development

```bash
npm run dev
```
Starts Vite dev server with HMR on `http://localhost:5173`

### Build for Production

```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview Production Build

```bash
npm run preview
```
Serves the production build locally for testing

### Lint Code

```bash
npm run lint
```
Runs ESLint to check code quality

---

## 🔐 Authentication Flow

The app uses **Supabase Auth** with **react-auth-kit** for state management:

1. **User signs up/logs in** via Supabase email/password
2. **Supabase session** is created and stored in localStorage
3. **react-auth-kit** wraps the session for React context
4. **Protected routes** use `<RequireAuth>` wrapper
5. **Subscription Guard** checks user access for premium features

**Key Components:**
- `SupabaseLogin.js` - Login/signup form
- `App.js` - Auth provider and route guards
- `SubscriptionGuard` - Checks user subscription status

---

## 💳 Stripe Integration

Subscription management is handled via **Stripe Checkout**:

**Flow:**
1. User selects a plan on the Home page
2. Frontend calls `POST /checkout-session` on `juice-api`
3. Backend creates Stripe Checkout session
4. User is redirected to Stripe-hosted checkout
5. On success, user is redirected back to app
6. Subscription status is synced via Stripe webhooks

**Pricing Plans:**
- **Bi-Weekly:** $19.99 / 2 weeks
- **Monthly:** $29.99 / month (40% off)
- **Annual:** $249 / year (58% off)

**Billing Portal:**
- Users can manage subscriptions at `https://billing.stripe.com/p/login/...`

---

## 📊 Key Features

### 1. Juicy Screen (`/juicyplays`)
**Real-time line comparison dashboard**

- Fetches player props from `juice-api`
- Displays line discrepancies across sportsbooks
- Calculates Expected Value (+EV) using ML model
- Filters by sport, stat type, and sportsbook
- Responsive MaterialReactTable with sorting

**Data Hook:** `useJuicyPlaysData(userId)`

### 2. Slip Generator (`/slips`)
**AI-optimized parlay builder**

- Generates profitable 2-3 pick parlays
- Filters by sport, stat type, and target sportsbook
- Displays total EV and shareable links
- Mobile-responsive slip cards

**Data Hook:** `useSlipsData(userId)`

### 3. Home Page (`/`)
**Landing page with pricing**

- Hero section with animated slip visual
- Technology advantage section
- Comparison matrix (Traditional vs Algorithmic)
- Pricing cards with Stripe integration
- FAQ accordion

**Components:** Atomic structure in `src/pages/Home/`

---

## 🎨 Styling

**CSS Variables** (defined in `index.css`):
```css
--bg-primary: #0d0d1a
--text-primary: #f1f1fb
--text-secondary: #a0a0c0
--accent-light: #818cf8
--border-subtle: rgba(255,255,255,0.06)
```

**Inline Styles:** Used for dynamic styling (hover states, conditional styles)

**Material-UI Theme:** Dark mode with custom color palette

---

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON
vercel env add VITE_JUICE_API_BASE_URL
vercel env add VITE_STRIPE_PK
vercel env add VITE_BASE_URL

# Deploy to production
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables in Netlify dashboard
```

**Build Settings:**
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18+

---

## 🐛 Troubleshooting

### Issue: `Module not found: Can't resolve '@/hooks/useMediaQuery'`

**Solution:**
Ensure Vite alias is configured in `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@': '/src'
  }
}
```

### Issue: `Supabase session not persisting`

**Solution:**
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON` are correct
- Clear localStorage and cookies
- Verify Supabase project is active

### Issue: `Stripe checkout not redirecting`

**Solution:**
- Verify `VITE_STRIPE_PK` is the **publishable key** (starts with `pk_`)
- Check `VITE_BASE_URL` matches your frontend URL
- Ensure backend `/checkout-session` endpoint is accessible

### Issue: `API calls failing with CORS errors`

**Solution:**
- Ensure `juice-api` backend has CORS enabled for your frontend URL
- Check `VITE_JUICE_API_BASE_URL` is correct
- Verify backend is running on the specified port

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can sign up and log in
- [ ] Protected routes redirect to login
- [ ] Subscription guard blocks non-subscribers
- [ ] Juicy Screen loads and displays props
- [ ] Filters work (sport, stat, sportsbook)
- [ ] Slip Generator creates parlays
- [ ] Stripe checkout flow completes
- [ ] Mobile responsive on all pages

### Future: Automated Tests

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

---

## 📚 Additional Resources

- **React Documentation:** https://react.dev/
- **Vite Documentation:** https://vite.dev/
- **Material-UI:** https://mui.com/material-ui/
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Stripe Checkout:** https://stripe.com/docs/payments/checkout
- **react-auth-kit:** https://authkit.arkadip.dev/

---

## 🤝 Contributing

When adding new features:

1. Create atomic components in appropriate folders
2. Extract reusable logic into custom hooks
3. Use existing CSS variables for consistency
4. Test on mobile and desktop viewports
5. Update this README with new setup instructions

---

## 📝 License

Proprietary - JuicyPlays Platform

---

**Last Updated:** March 6, 2026  
**Maintainer:** JuicyPlays Engineering Team
