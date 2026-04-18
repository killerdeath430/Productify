# Productify

A full-stack product management web application built with Node.js, Express, Drizzle ORM, and React.

---

## Tech Stack

**Backend**
- Node.js + Express (TypeScript)
- Drizzle ORM + PostgreSQL (Neon serverless)
- Clerk authentication (JWT-based)

**Frontend**
- React + Vite (TypeScript)
- TailwindCSS
- TanStack Query (React Query)
- Clerk React SDK

---

## Features

- User authentication via Clerk (sign up, sign in, session management)
- Create, read, update, and delete products
- Protected routes — only authenticated users can manage their products
- Responsive UI built with TailwindCSS
- Optimistic updates and server-state sync via TanStack Query

---

## Project Structure

```
Productify/
├── Backend/
│   ├── src/
│   │   ├── index.ts        # Express app entry point
│   │   ├── routes/         # API route handlers
│   │   ├── db/
│   │   │   ├── schema.ts   # Drizzle schema definitions
│   │   │   └── index.ts    # DB connection (Neon serverless)
│   │   └── middleware/     # Auth middleware (Clerk JWT verification)
│   ├── drizzle.config.ts
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   ├── components/     # UI components
    │   └── api/            # TanStack Query hooks
    ├── index.html
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database (or [Neon](https://neon.tech) serverless instance)
- [Clerk](https://clerk.com) account for authentication

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=3000
```

Run database migrations:

```bash
npx drizzle-kit push
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products for the user | ✅ |
| POST | `/products` | Create a new product | ✅ |
| PUT | `/products/:id` | Update a product | ✅ |
| DELETE | `/products/:id` | Delete a product | ✅ |

---

## Notes

- The backend uses Neon's HTTP-based serverless driver, which works on restricted networks where port 5432 is blocked.
- Clerk handles all auth — no passwords are stored in the database.

---

## Author

**Rudra** — [@killerdeath430](https://github.com/killerdeath430)
