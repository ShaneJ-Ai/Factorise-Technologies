// src/middleware/error.js
//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

// predictable API errors for browsers

export function notFound(req, res, next) {
  res.status(404).json({ message: "Route not found" });
}

// JSON 404 response for unmatched routes
export function errorHandler(err, req, res, next) { //requires 4 args to be recognized as an error handler by Express. see https://expressjs.com/en/guide/error-handling.html
  if (err?.name === "ZodError") { //Zod throws when .parse() fails
    return res.status(400).json({ message: "Validation error", issues: err.issues });
  }

  if (err?.code === "P2025") {
    return res.status(404).json({ message: "Not found" }); //Prisma uses that code for “record not found”
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" }); //	Final fallback: log server-side, return a generic 500 to the client (don’t leak internals).
}