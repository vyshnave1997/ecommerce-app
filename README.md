# E-commerce Application

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Features
- User authentication with OTP
- Product catalog with filters
- Shopping cart & wishlist
- Order management
- Admin dashboard
- CRM system
- Reports & analytics
- Payment integration (Stripe, Razorpay)