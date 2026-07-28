# ShowNest Backend API (NestJS)

This is the NestJS backend API service for the ShowNest ticketing platform, connected to MongoDB using Prisma ORM.

## Setup Instructions

### 1. Local MongoDB Replica Set Setup
Prisma requires a MongoDB replica set (`rs0`) for transaction support. 

If MongoDB Compass shows "connection refused" or your database is not running, start it in replica set mode directly inside the project directory:

```powershell
# 1. Create a local database folder in the workspace
New-Item -ItemType Directory -Force -Path "C:\Users\NETHRA R\Show_nest\shownest\.mongodb_data"

# 2. Run the MongoDB executable pointing to the local folder with replicaSet enabled
& "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\Users\NETHRA R\Show_nest\shownest\.mongodb_data" --logpath "C:\Users\NETHRA R\Show_nest\shownest\.mongodb_data\mongod.log" --port 27017 --replSet rs0
```

### 2. Environment Variables
Create a `.env` file in the `apps/api` directory:

```env
DATABASE_URL="mongodb://localhost:27017/e_cell_task?replicaSet=rs0"
JWT_SECRET="e_cell_tech_team_29_super_secret_key_2026"
PORT=5001
```

### 3. Sync Database and Seed
From the `apps/api` directory, run these commands to push collections and populate initial admin/vendor/customer data:
```bash
# Push database collections schema
npx prisma db push

# Generate Prisma Client
npm run prisma:generate

# Seed the database
npm run seed
```

This will seed these test users:
* **Admin**: `admin@shownest.com` / `password123`
* **Vendor**: `vendor@shownest.com` / `password123`
* **Customer**: `customer@shownest.com` / `password123`

---

## Running the App

Start the entire monorepo stack (frontends + backend API) from the **monorepo root**:
```bash
npm run dev
```

* **Customer Web App**: http://localhost:3004
* **Admin Portal**: http://localhost:3001/login
* **Operator Portal (Mock)**: http://localhost:3003/login
* **NestJS Backend**: http://localhost:5001

---

## Active Backend Routes (Admin & Auth)

Currently, the backend has been streamlined for **Admin Portal and Catalog** functions. Only the following modules are imported in `app.module.ts`:

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/register` - Registers new customer/vendor/admin profiles.
* `POST /api/auth/login` - Authenticates passwords via `bcryptjs` and returns a signed JWT session token.
* `GET /api/auth/profile` - Fetches active profile data (secured by JWT Bearer AuthGuard).

### 🎫 Movies & Events Catalog (`/api/events`)
* `GET /api/events` - Queries MongoDB to serve the movie catalog listing to the Customer portal.

### 🔴 Admin Controls (`/api/admin`)
* `GET /api/admin/vendors` - Queries and returns the directory list of registered system vendors (requires Admin role check).

---

## How to Expand (For Teammates)

To connect the Customer booking logic or Vendor portals to the database:
1. Re-import the `BookingModule` and `ReportingModule` inside [apps/api/src/app.module.ts](file:///C:/Users/NETHRA%20R/Show_nest/shownest/apps/api/src/app.module.ts).
2. On the Customer payment page, change `handlePayNow` to make a `POST` request to `/api/bookings/checkout` with `showtimeId` and `seats`.
