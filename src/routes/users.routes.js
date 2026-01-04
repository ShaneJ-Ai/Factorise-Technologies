// SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

/// (temporary stub so server boots) 
//This stub proves your server boots and routing works; in the next iteration, ill replace it with real CRUD + Prisma + Zod

import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.json([]));

export default router;

//# sourceMappingURL=users.routes.js.map
//# sourceURL=src/routes/users.routes.js
//npm run dev
//curl -s http://localhost:3001/users
