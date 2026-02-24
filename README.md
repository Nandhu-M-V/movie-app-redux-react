# 🎬 Movie Explorer – React + TypeScript

A modern **Movie & TV Discovery Web App** built using **React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, TMDB API, and Auth0 authentication**.

This application allows users to explore trending movies and TV shows, apply advanced filters, view detailed pages, and supports **role-based access control (Admin & User)**.

---

# 🚀 Project Overview

This app integrates with:

- 🎥 The Movie Database (TMDB) – Movie & TV data
- 🔐 Auth0 – Authentication & RBAC

The goal of this project is to build a scalable, type-safe, production-ready frontend architecture using modern React practices.

---

# ✨ Features

## 🎥 Movies
- Trending Movies (Weekly)
- Discover Movies with Advanced Filters:
  - Multi-genre selection
  - Release year filter
  - Minimum rating
  - Minimum votes
  - Runtime range
  - Sorting options
- Movie Details Page
- Similar Movie Recommendations

## 📺 TV Shows
- Trending TV Shows
- TV Show Details Page

## 🔎 Smart Filtering
- Dynamic filter object builder
- Fully typed filter interface
- Pagination support
- Memo-based client-side search

## 🌍 Internationalization
- Multi-language support (i18n)
- API language sync with UI language

## 🔐 Authentication & Authorization
- Login / Logout with Auth0
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Admin & User roles
- Protected routes

---

# 🏗 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- i18next
- TMDB API
- Auth0 (RBAC)

---

# 📦 Setup & Installation

## ✅ Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- TMDB API Access Token
- Auth0 account

---

# 🔑 TMDB Setup

1. Create an account at:
   https://www.themoviedb.org/

2. Navigate to:
   Settings → API

3. Generate a **v4 Bearer Token**

4. Create `.env` file:

```
VITE_TMDB_ACCESS_TOKEN=your_tmdb_bearer_token
```

---

# 🔐 Auth0 Setup (Admin & User Roles)

## 1️⃣ Create Auth0 Application

1. Go to:
   https://manage.auth0.com/

2. Create:
   - Single Page Application

3. Add URLs:

Allowed Callback URL:
```
http://localhost:5173
```

Allowed Logout URL:
```
http://localhost:5173
```

Allowed Web Origins:
```
http://localhost:5173
```

---

## 2️⃣ Create API in Auth0

Applications → APIs → Create API

Example:
- Name: movie-api
- Identifier: https://movie-api

Enable:
- RBAC
- Add Permissions in Access Token

---

## 3️⃣ Create Roles

User Management → Roles

### 👤 user
Permissions:
```
read:movies
read:tv
```

### 🛠 admin
Permissions:
```
read:movies
edit:movies
delete:movies
manage:users
```

---

## 4️⃣ Assign Roles to Users

User Management → Users → Assign Role

---

## 5️⃣ Add Custom Claim (Auth0 Action)

Create Action:

```javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://movie-app.example.com';

  if (event.authorization) {
    api.idToken.setCustomClaim(
      `${namespace}/roles`,
      event.authorization.roles
    );

    api.accessToken.setCustomClaim(
      `${namespace}/roles`,
      event.authorization.roles
    );
  }
};
```

Attach it to Login Flow.

---

## 6️⃣ Auth0 Environment Variables

Create `.env`:

```
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

---

# ▶️ Run the Application

Install dependencies:

```
yarn install
```

or

```
npm install
```

Start development server:

```
yarn dev
```

or

```
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 📂 Project Structure

```
src/
│
├── api/
│   └── ApiFetch.ts
│
├── app/
│   └── store.ts
│
├── features/
│   ├── movies/
│   └── tvshows/
│
├── auth/
│   ├── ProtectedRoute.tsx
│   ├── RoleGuard.tsx
│   └── useRoles.ts
│
├── components/
│   ├── MovieCard.tsx
│   ├── TvCard.tsx
│   ├── Loading.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── DiscoverMoviesPage.tsx
│   ├── MovieDetails.tsx
│   ├── TvDetail.tsx
│   └── AdminDashboard.tsx
│
├── i18n.ts
├── main.tsx
└── vite-env.d.ts
```

---

# 🛡 Role-Based Access Logic

Roles are extracted from JWT:

```ts
const roles =
  user?.['https://movie-app.example.com/roles'] || [];

const isAdmin = roles.includes('admin');
```

Admin-only route protection:

```tsx
if (!isAdmin) {
  return <Navigate to="/" replace />;
}
```

Admin UI example:

```tsx
{isAdmin && (
  <button>Delete Movie</button>
)}
```

---

# 🧠 Architecture Highlights

- Centralized Axios instance with Bearer authentication
- Fully typed API responses
- Dynamic Discover filter builder
- No `any` types
- Clear separation between:
  - Discover models
  - Detail models
  - Base media types
- Role-based frontend protection
- Scalable folder architecture

---

# 🔐 Security Notes

- Frontend role checks are for UI only
- Backend validation required for real production security
- Do not expose secrets in frontend
- Use HTTPS in production

---

# 📈 Future Improvements

- Backend API with JWT verification
- Infinite scroll
- Watchlist feature
- Dark / Light theme toggle
- Debounced search
- URL query sync for filters
- Admin content moderation dashboard

---

# 📜 License

This project is built for educational and portfolio purposes.

Movie data provided by The Movie Database (TMDB)  
Authentication powered by Auth0
