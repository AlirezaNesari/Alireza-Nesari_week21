# Warehouse Product Management

A full-stack admin panel for managing products, built with **Next.js (App Router)** and a RESTful **Express** API.

## Features

- User registration and login (JWT, Bearer token)
- Protected admin routes and guest-only auth routes
- Product CRUD (create, edit, delete)
- Search by name, price filter and pagination (via query parameters)
- Form handling and validation with React Hook Form and Yup
- Swagger API documentation

## Technologies

**Frontend:** Next.js, React, Axios, React Hook Form, Yup, CSS Modules

**Backend:** Node.js, Express, JWT, bcryptjs, Swagger

## Project Structure

```text
Alireza-Nesari_week19/
├── client/                     # Next.js app
│   ├── public/images/
│   └── src/
│       ├── app/                # File-based routing
│       │   ├── (auth)/         # /login, /register
│       │   ├── (admin)/        # /products (protected)
│       │   ├── layout.jsx
│       │   ├── page.jsx
│       │   └── not-found.jsx
│       ├── components/AdminShell/
│       ├── features/
│       │   ├── auth/
│       │   └── products/
│       ├── lib/
│       ├── services/
│       └── validations/
├── data/
├── middleware/
├── routes/
├── swagger/
├── server.js
└── package.json
```

## Requirements

- Node.js 20.9 or newer (22 LTS recommended)

## Installation

```bash
git clone https://github.com/AlirezaNesari/Alireza-Nesari_week19.git
cd Alireza-Nesari_week19

# API dependencies
npm install

# Client dependencies
cd client
npm install
cp .env.example .env.local
```

## Running the Project

Start the API (http://localhost:3000):

```bash
npm start
```

Start the client in another terminal (http://localhost:3001):

```bash
cd client
npm run dev
```

Swagger docs: http://localhost:3000/api-docs

## Environment Variables

`client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Do not commit secrets such as JWT secrets, API keys or passwords.

## Git Workflow

Each feature or fix is committed separately with a meaningful message:

```bash
git commit -m "feat(client): add products page"
git commit -m "fix(client): restore original UI details"
```

## Author

**Alireza Nesari** — https://github.com/AlirezaNesari