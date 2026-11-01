# Gangster

A full-stack fashion e-commerce platform: React storefront, Express API and MongoDB, with a protected admin dashboard for managing products and orders.

## Features

**Storefront**
- Home, shop with category filtering, and product detail pages with sizes, colours, ratings and stock
- Wishlist and cart, persisted on the client
- Checkout flow that creates an order and lands on an order success page
- User signup, login and profile pages
- Responsive layout down to mobile, with a fixed WhatsApp contact button

**Admin**
- Separate admin login; admin routes are JWT protected
- Create, edit and delete products
- View orders and update order status
- Dashboard statistics endpoint for revenue and order counts
- Product image uploads through Cloudinary (up to 5 images per product)

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7 |
| Backend | Node.js, Express 5, Mongoose |
| Auth | JWT, bcryptjs |
| File storage | Cloudinary + Multer |

## Getting started

### 1. Backend

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

```bash
node seedAdmin.js   # creates the seed admin account
npm run dev         # starts the API on :5000
```

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

The API base URL is set in `src/api/api.ts` (currently `http://localhost:5000/api`).

## API

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/users/signup` | Public |
| POST | `/api/users/login` | Public |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Admin login |
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |
| POST | `/api/orders` | Public |
| GET | `/api/orders` | Admin |
| PUT | `/api/orders/:id` | Admin |
| GET | `/api/orders/dashboard/stats` | Admin |
| POST | `/api/upload/product-images` | Admin |

Admin-only endpoints expect `Authorization: Bearer <token>`.

## Project structure

```
Gangster/
├── Backend/
│   ├── config/        # MongoDB and Cloudinary setup
│   ├── controllers/   # users, admin auth, products, orders, uploads
│   ├── middleware/    # JWT verification, Multer storage
│   ├── models/        # admin, user, product, order schemas
│   ├── routes/
│   ├── seedAdmin.js
│   └── server.js
└── Frontend/
    └── src/
        ├── api/       # fetch wrappers for each resource
        ├── components/# layout and navigation
        ├── context/   # store state
        ├── data/      # product catalog and categories
        └── pages/     # storefront and admin screens
```
