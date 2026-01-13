# CRUD Express + Prisma (SQLite) — CodingAce Backend

A minimal, clean CRUD API built with **Node.js (ESM)** + **Express** + **Prisma ORM** + **SQLite**, with **Zod** validation and baseline security middleware (**Helmet**, **CORS**, **Rate limiting**).

> Status: Working CRUD for `/users` with Prisma + migrations + smoke tests.

---

## Tech Stack

- **Node.js** (ES Modules, `"type": "module"`)
- **Express**
- **Prisma** + **SQLite**
- **Zod** (request validation)
- **Helmet** (security headers)
- **cors** (CORS policy)
- **express-rate-limit** (basic abuse protection)
- **nodemon** (dev hot reload)

---

## Features

- ✅ RESTful resource routes (`/users`, `/users/:id`)
- ✅ Full CRUD: Create, Read, Update (PATCH), Delete
- ✅ Zod validation at the API boundary
- ✅ Central error handler + async error propagation
- ✅ Prisma migrations tracked in Git (`prisma/migrations`)
- ✅ Baseline security headers + rate limiting

---

## Project Layout


src/
  app.js                # Express app wiring (middleware + routes)
  server.js             # Server startup (listen)
  prisma.js             # Prisma client singleton
  routes/
    users.routes.js     # Users CRUD routes
  middleware/
    error.js            # 404 + error handler
  utils/
    asyncHandler.js     # async wrapper -> errors go to next()
prisma/
  schema.prisma         # Prisma schema
  migrations/           # Migration history (COMMIT THIS)


⸻

Requirements
	•	Node.js 20+ (Node 22 recommended)
	•	npm

⸻

Quick Start

1) Install dependencies

npm install

2) Prisma setup (SQLite)

Prisma uses a local SQLite file via DATABASE_URL in .env.

Typical .env for SQLite:

DATABASE_URL="file:./dev.db"

3) Run migrations (create DB + tables)

npx prisma migrate dev

4) Start the API

npm run dev

Default server:
	•	http://localhost:3001

Scripts (matches package.json)

npm run dev          # nodemon src/server.js
npm start            # node src/server.js
npm run prisma --    # run prisma CLI via npm (example below)
npm test             # placeholder

Prisma CLI via npm script

npm run prisma -- generate
npm run prisma -- migrate dev
npm run prisma -- studio

Why postinstall exists

This repo includes:

"postinstall": "prisma generate"

Database / Prisma Notes
	•	Schema: prisma/schema.prisma
	•	Migrations: prisma/migrations/** ✅ commit
	•	Local SQLite DB file: prisma/dev.db 🚫 do NOT commit

Create a new migration:
npx prisma migrate dev --name <migration_name>
Regenerate client after schema changes:
npx prisma generate


API

Base URL: http://localhost:3001

Users Resource

Method	Path	Description
GET	/users	List users
GET	/users/:id	Get one user by id
POST	/users	Create a user
PATCH	/users/:id	Update user (partial)
DELETE	/users/:id	Delete a user

User schema

Create (POST /users):

{
  "email": "a@b.com",
  "name": "Alice"
}

Update (PATCH /users/:id) supports partial:

{
  "name": "Alice Updated"
}


⸻

Smoke Tests (curl)

Tip: install jq to pretty-print JSON (brew install jq on macOS).

Create

curl -i -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","name":"Alice"}'

List

curl -s http://localhost:3001/users | jq

Get by id

curl -s http://localhost:3001/users/<id> | jq

Patch

curl -i -X PATCH http://localhost:3001/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}'

Delete

curl -i -X DELETE http://localhost:3001/users/<id>




Security Defaults

This backend enables baseline protections:
	•	helmet() adds common security headers.
	•	cors() restricts browser origins (configured for local dev).
	•	express-rate-limit throttles request bursts.
	•	app.disable("x-powered-by") reduces fingerprinting.
	•	JSON body size limited via express.json({ limit: "1mb" }).

Production hardening ideas (future):
	•	strict CORS per environment
	•	authentication + authorization middleware
	•	request logging + correlation ids
	•	API schema docs (OpenAPI)



Error Handling
	•	asyncHandler() ensures async errors flow into Express error middleware.
	•	middleware/error.js:
	•	returns 400 for Zod validation errors
	•	returns 404 for missing records (Prisma P2025)
	•	returns 500 for unexpected errors



Development Notes
	•	This project uses ES Modules ("type": "module").
	•	Routes are modular via express.Router() and mounted in app.js.



Requests File (optional)

VS Code REST Client, create requests.http:

### List users
GET http://localhost:3001/users

### Create user
POST http://localhost:3001/users
Content-Type: application/json

{
  "email": "a@b.com",
  "name": "Alice"
}


⸻

Git Workflow

See README_GIT.md for:
	•	branch model (feature/* → develop → main)
	•	PR flow
	•	rebasing policy
	•	cleanup + recovery commands

⸻

License

Proprietary — All Rights Reserved.

Copyright (c) 2025 Shane Flaten (CodingAce).
See LICENSE for the full terms.

Note: For npm metadata, this repo may use "license": "UNLICENSED" or "license": "LicenseRef-LICENSE" depending on distribution goals. The authoritative terms are in LICENSE.

---

### Next commit for Iteration 5 (docs)
1) Save that as `README.md`
2) (Optional) add `requests.http`
3) Commit:


git add README.md requests.http 2>/dev/null || true
git commit -m "docs: add professional README and smoke tests"
