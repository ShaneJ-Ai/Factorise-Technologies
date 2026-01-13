// src/routes/user.routes.js
//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.



import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

const UserCreate = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

// router.get("/", (req, res) => res.json([]));
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    res.json(users);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = UserCreate.parse(req.body);
    const user = await prisma.user.create({ data });
    res.status(201).json(user);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = UserCreate.partial().parse(req.body);
    const user = await prisma.user.update({ where: { id: req.params.id }, data });
    res.json(user);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  })
);


export default router;




//npm run dev
//curl -s http://localhost:3001/users
