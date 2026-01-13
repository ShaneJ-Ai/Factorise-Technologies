// src/routes/tasks.routes.js
//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

//same crud as user

import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

const TaskCreate = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json(tasks);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = TaskCreate.parse(req.body);
    const task = await prisma.task.create({ data });
    res.status(201).json(task);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = TaskCreate.partial().parse(req.body);
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data,
    });
    res.json(task);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.status(204).send();
  })
);

export default router;


//npm run dev
//curl -s http://localhost:3001/tasks
