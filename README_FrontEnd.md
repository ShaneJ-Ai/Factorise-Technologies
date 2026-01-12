# Factorise-Technologies
SPDX-License-Identifier: LicenseRef-LICENSE
(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

CRUDExpNode Monorepo Architecture & Run/Test Procedure

This repository is set up as a monorepo with two independent apps:
	•	Backend API (Express + Prisma) at the repository root
	•	Key folders: src/, prisma/
	•	Uses the root package.json
	•	Frontend Mobile App (Expo + expo-router) under apps/mobile/
	•	Key folders: app/ (routes), src/ (shared code), assets/
	•	Uses apps/mobile/package.json

Current state: The mobile UI works without the backend connected yet. The mobile app currently uses an in-memory useTasks hook (useState) that generates an id locally and updates the list in memory (no HTTP calls).

⸻

Architecture & Flow

Frontend routing / entry (expo-router)
	•	apps/mobile/package.json sets "main": "expo-router/entry", so expo-router owns app startup.
	•	apps/mobile/app/_layout.js defines a <Stack /> and hides headers → this is the root navigator.
	•	apps/mobile/app/index.js is the Home screen route (file-based routing). It renders:
	1.	Header (top 1/3 via flex: 1)
	2.	Body (bottom 2/3 via flex: 2)
	3.	<TaskForm onAddTask={addTask} />
	4.	<FlatList data={tasks} ... /> (note: scrolling is currently a known issue to address)

UI components
	•	TaskForm
	•	Uses useMemo() to compute errors
	•	isValid is derived from errors
	•	On submit: sets touched → validates → calls onAddTask → clears inputs
	•	TaskItem
	•	Renders a card row for each task
	•	Uses theme tokens for consistent colors/spacing/radius
	•	theme.js
	•	A small design system: palette + spacing scale + radius scale

Backend pattern

Backend follows a clean Express composition pattern:
	•	src/server.js → process entrypoint (listen)
	•	src/app.js → app composition (middleware + routes + error handling)
	•	src/routes/users.routes.js → resource router for /users (Prisma + Zod + async handler)
	•	src/middleware/error.js → consistent 404 + error responses
	•	src/prisma.js → singleton Prisma client

⸻

Separation & Best Practices (current and future)

Keep frontend and backend separate
	•	Do not mix React Native logic into backend src/
	•	Do not place Express routes inside apps/mobile/

Recommended frontend separation (when connecting to API)
	•	apps/mobile/src/hooks/useTasks.js → state + side effects (loading state, caching, errors, optimistic updates)
	•	apps/mobile/src/services/tasksApi.js → pure API calls (URLs, fetch, JSON parsing)
	•	apps/mobile/src/constants/config.js → environment config (API base URL)

Why this is the best option:
	•	Hooks stay focused on React concerns (state, caching, optimistic UI)
	•	API module stays focused on HTTP concerns (endpoints, headers, parsing)
	•	When backend/auth changes, you update the service layer—not every component

⸻

Run Procedure (as-is)

1) Backend (Express + Prisma)

From the repo root:

npm install
npm run dev

Expected:
	•	Backend starts and prints something like: API on :3001

2) Frontend (Expo + expo-router)

From the mobile app folder:

cd apps/mobile
npm install
npx expo start -c

Expected:
	•	Expo bundler starts
	•	You can open the app in iOS simulator, Android emulator, or with Expo Go (depending on setup)

⸻

Functional Test (as-is) — Commands Only

Backend API quick checks

List users

curl -s http://localhost:3001/users

Create a user

curl -i -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","name":"Alice"}'

List users again (confirm it persisted)

curl -s http://localhost:3001/users

Note: The mobile app does not call these endpoints yet.

Frontend UI checks (manual)

Run the app (commands above), then verify:
	•	Header is visible and occupies roughly 1/3 of the screen
	•	Body occupies the remaining 2/3
	•	Task form inputs are styled as pill inputs
	•	Submit button is disabled until Title is valid
	•	Submitting adds a task and clears the form
	•	Task list renders below the form

⸻

Notes / Known Items
	•	Tasks are currently local-only (in-memory state). Backend integration will come next.
	•	FlatList scrolling is noted as a current issue to fix in the UI iteration.
# CRUDExpNode — Mobile Frontend (Expo + expo-router)

This document explains the **mobile app** in the CRUDExpNode monorepo and how to run/test it **as-is**.

---

## Table of Contents
- [Overview](#overview)
- [Monorepo Layout](#monorepo-layout)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Run Procedure (As-Is)](#run-procedure-as-is)
- [Functional Tests (Commands Only)](#functional-tests-commands-only)
- [Notes / Known Items](#notes--known-items)

---

## Overview
This repository is a **monorepo** with two independent apps:

- **Backend API (Express + Prisma)** at the repository root
  - Key folders: `src/`, `prisma/`
  - Uses the root `package.json`
- **Frontend Mobile App (Expo + expo-router)** under `apps/mobile/`
  - Key folders: `app/` (routes), `src/` (shared code), `assets/`
  - Uses `apps/mobile/package.json`

### Current state
✅ The mobile UI **works without backend integration**.

Right now the mobile app uses an **in-memory** `useTasks` hook (`useState`) that generates an `id` locally and updates the list in memory (**no HTTP calls**).

---

## Monorepo Layout

### Frontend (Expo)
Path: `apps/mobile/`

- `app/` — expo-router routes (`_layout.js`, `index.js`, ...)
- `src/` — shared app code
  - `components/` — UI components (e.g., TaskForm, TaskItem)
  - `hooks/` — state + side effects (e.g., `useTasks`)
  - `theme/` — palette + spacing + radius tokens
  - `constants/` — config (reserved for later: API base URL)
- `assets/` — app icons / images

### Backend (Express)
Path: repository root

- `src/` — Express app source
- `prisma/` — Prisma schema, migrations, SQLite dev DB

---

## Frontend Architecture

### Routing / Entry (expo-router)

- `apps/mobile/package.json` sets:

  ```json
  {
    "main": "expo-router/entry"
  }
  ```

  This means **expo-router owns app startup**.

- `apps/mobile/app/_layout.js`
  - Defines a `<Stack />`
  - Hides headers (global navigation policy)

- `apps/mobile/app/index.js`
  - Home screen route (file-based routing)
  - Renders:
    1. **Header** (top 1/3 via `flex: 1`)
    2. **Body** (bottom 2/3 via `flex: 2`)
    3. `<TaskForm onAddTask={addTask} />`
    4. `<FlatList data={tasks} ... />` (list rendering)

### UI Components

- **TaskForm**
  - Uses `useMemo()` to compute validation errors
  - `isValid` derived from errors
  - Submit flow: sets `touched` → validates → calls `onAddTask` → clears inputs

- **TaskItem**
  - Renders each task as a readable card row
  - Uses theme tokens for consistent spacing, radius, and color

- **theme.js**
  - Small design system:
    - Palette
    - Spacing scale
    - Radius scale

---

## Backend Architecture

Backend follows a clean Express composition pattern:

- `src/server.js` → process entrypoint (`listen`)
- `src/app.js` → app composition (middleware + routes + error handling)
- `src/routes/users.routes.js` → `/users` resource router (Prisma + Zod + async handler)
- `src/middleware/error.js` → consistent 404 + error responses
- `src/prisma.js` → singleton Prisma client

---

## Run Procedure (As-Is)

### 1) Backend (Express + Prisma)
From the repo root:

```bash
npm install
npm run dev
```

Expected output:
- Backend starts and prints something like: `API on :3001`

### 2) Frontend (Expo + expo-router)
From the mobile app folder:

```bash
cd apps/mobile
npm install
npx expo start -c
```

Expected output:
- Expo bundler starts
- Run on iOS simulator, Android emulator, or Expo Go (depending on setup)

---

## Functional Tests (Commands Only)

### Backend API quick checks (Users)

List users:
```bash
curl -s http://localhost:3001/users
```

Create a user:
```bash
curl -i -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","name":"Alice"}'
```

List users again (confirm it persisted):
```bash
curl -s http://localhost:3001/users
```

> Note: the mobile app does **not** call these endpoints yet.

### Frontend UI checks (manual)
Run the app (commands above), then verify:

- Header is visible and occupies roughly **1/3** of the screen
- Body occupies the remaining **2/3**
- Task form inputs are styled as pill inputs
- Submit button is disabled until Title is valid
- Submitting adds a task and clears the form
- Task list renders below the form

---

## Notes / Known Items

- Tasks are currently **local-only** (in-memory state). Backend integration is planned next.
- FlatList scrolling is a known UI issue to address in the next iteration.
- Separation rule (important for review): keep React Native code inside `apps/mobile/`, and keep Express code at the repo root.