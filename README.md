# JuicyPlays UI

React + Vite frontend for the live JuicyPlays application.

This app is responsible for:

- the public marketing and pricing experience
- protected product pages for EV Plays, Juicy Screen, and Slips
- bootstrapping user session state from `juice-api`
- redirecting users into the Whop login and Whop checkout flows

## Runtime Overview

The UI is a client-side React app that depends on `juice-api` for both authentication state and product data.

It does **not** authenticate users directly with Supabase Auth, even though some legacy file names still reference Supabase.

## Main Routes

- `/`
  - public landing page
  - pricing cards and marketing content
- `/login`
  - handled by `SupabaseLogin.js`
  - actually redirects to `juice-api /auth/whop/login`
- `/ev-plays`
  - protected page backed by `/v1/juicy`
- `/juicy-screen`
  - protected page backed by `/v1/line-shopper`
  - includes prop history modal requests to `/v1/getPropHistory`
- `/slips`
  - protected page backed by `/v1/slips`
- `/account`
  - authenticated account page

Legacy routes `/juicyplays` and `/juicy` redirect to `/ev-plays`.

## Authentication Model

The current login flow is:

1. User visits `/login`.
2. `SupabaseLogin.js` builds a redirect to `${VITE_JUICE_API_BASE_URL}/auth/whop/login`.
3. `juice-api` performs the Whop OAuth flow and creates a server-side session.
4. On return, `App.js` calls `/auth/me` and mirrors that session into `react-auth-kit`.

### Route protection

`App.js` protects pages with:

- `RequireAuth`
- `SubscriptionGuard`

`SubscriptionGuard` allows access only when `subscribed` or `hasAccess` is true in the `/auth/me` response.

### Expired session handling

`App.js` installs a global Axios response interceptor for protected API calls.

- On auth/session failure, the user is signed out and redirected to `/login`.
- On `Subscription required`, the UI refreshes `/auth/me` and redirects to `/` with a subscription-required state.

## Product Pages

### `Home.js`

- marketing landing page
- pricing cards
- opens Whop checkout URLs from environment variables

### `JuicyPlays.js`

- renders EV Plays table
- fetches from `/v1/juicy`
- supports sportsbook, sport, stat, and baseline model filters

### `LineShopper.js`

- renders Juicy Screen table
- fetches from `/v1/line-shopper`
- supports player, sportsbook, sport, stat, and game filters
- opens prop history modal backed by `/v1/getPropHistory`

### `Slips.js`

- renders generated slips/parlays
- fetches from `/v1/slips`
- supports sportsbook, sport, stat, and baseline model filters

## API Configuration

Frontend API paths are derived from `src/common/constants.js`.

The key environment variable is:

- `VITE_JUICE_API_BASE_URL`

Axios is configured with `withCredentials = true`, so browser requests include the session cookie issued by `juice-api`.

## Environment Variables

The UI currently relies on these environment variables:

- `VITE_JUICE_API_BASE_URL`
- `VITE_WHOP_CHECKOUT_BIWEEKLY`
- `VITE_WHOP_CHECKOUT_MONTHLY`
- `VITE_WHOP_CHECKOUT_YEARLY`

Example local setup:

```bash
VITE_JUICE_API_BASE_URL=http://localhost:8081
VITE_WHOP_CHECKOUT_BIWEEKLY=https://whop.com/checkout/plan_...
VITE_WHOP_CHECKOUT_MONTHLY=https://whop.com/checkout/plan_...
VITE_WHOP_CHECKOUT_YEARLY=https://whop.com/checkout/plan_...
```

## Local Development

### Prerequisites

- Node `20.x` (matches `package.json` engines)
- running `juice-api` instance

### Install

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Vite is configured to run on port `3000` locally.

## Build and Scripts

Available scripts:

```bash
npm run dev
npm run build
npm run preview
npm run format
```

### Important build note

The Vite build output directory is `build/`, not `dist/`.

Also note that `npm run build` runs a prebuild `npm audit --audit-level=high`, so CI or local production builds can fail before Vite runs if audit issues are present.

## Tech Stack

- React `18.2.0`
- Vite `6.x`
- `react-router-dom` `6.x`
- Material UI `5.x`
- `material-react-table`
- `react-auth-kit`
- Axios
- Recharts

## Operational Notes

- The UI depends on `juice-api` session cookies and correct CORS/cookie settings.
- `SupabaseLogin.js` is a legacy name; the implemented flow is Whop login.
- Pricing cards open Whop checkout links directly; the current UI does not create Stripe checkout sessions.
- Protected product data ultimately comes from the API's 35-second cached heartbeat snapshot.

## Related Repositories

- `juice-api` for auth, access control, and data endpoints
- `juice-ml` for predictions and sportsbook proxy endpoints
- `juice-docs` for the shared architecture document

## License

Proprietary - JuicyPlays Platform
