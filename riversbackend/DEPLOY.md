# Rivers Kitchen Backend - Vercel Deployment

## Prerequisites
- Node.js 18+ installed
- Vercel CLI installed: `npm i -g vercel`
- PostgreSQL database (Neon, Supabase, or Railway)

## Deployment Steps

### 1. Set up PostgreSQL Database
Create a PostgreSQL database and get the connection string:
- Neon: https://neon.tech
- Supabase: https://supabase.com
- Railway: https://railway.app

### 2. Run Database Migrations
```bash
cd riversbackend
npm install
npx drizzle-kit push
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Set Environment Variables in Vercel
Go to your Vercel project settings and add:
```
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
BUSINESS_WHATSAPP_NUMBER=234816165772
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 5. Update Frontend API URL
Update `riversfrontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app/api
```

### 6. Deploy Frontend to Vercel
```bash
cd riversfrontend
vercel --prod
```

## Local Development
```bash
# Backend
cd riversbackend
npm install
npm run dev

# Frontend (in another terminal)
cd riversfrontend
npm install
npm run dev
```

## API Endpoints
- `GET /health` - Health check
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Paystack webhook
- `GET /api/payments/booking/:bookingId` - Get booking payments
- `GET /api/menus/packages` - List menu packages
- `GET /api/menus/packages/:id` - Get single package
- `POST /api/menus/custom` - Save custom menu
- `GET /api/menus/custom/:sessionId` - Get custom menus
- `POST /api/menus/custom/:sessionId/convert` - Convert custom menu to booking
- `POST /api/inquiries` - Create inquiry
- `GET /api/inquiries` - List all inquiries
- `PATCH /api/inquiries/:id/status` - Update inquiry status
