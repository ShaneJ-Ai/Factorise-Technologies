// SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

//middleware + routes

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import usersRouter from "./routes/users.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

export const app = express(); //app instance

app.disable("x-powered-by"); //security: hide tech stack, because hackers   love that info
app.set("trust proxy", 1); //trust first proxy because we might be behind one and need real IPs for rate limiting

//XSS-related protections, clickjacking-related headers, MIME-type sniffing prevention, etc.
app.use(helmet({ contentSecurityPolicy: false })); //security-related HTTP response headers. because security is important and helmet is cool. Too have CSP in Enabled, for react native we will need to setup nonces and hashes for inline scripts/styles
//CORS: who is allowed to call your API from a browser
app.use(cors({ //CORS configuration, controls cross-origin requests. be specific about it or we get hacked
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE"], //CRUD operations only 
  allowedHeaders: ["Content-Type", "Authorization"], //only these headers allowed. for ios react its best to use Authorization header for tokens and Content-Type for body type.
}));
//app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 })); old rate limit

// throttles abusive traffic
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json({ limit: "1mb" })); // built-in middleware , parses JSON for req.body

app.use("/users", usersRouter); //modular routing for maintainability , become /users/ and /users/:id in the final API

//404 + error handlers 
app.use(notFound);
app.use(errorHandler);



//POSTMAN TESTING INSTRUCTIONS see the official docs at npm cors at https://www.npmjs.com/package/cors
//npm run dev
//GET all users: curl -s http://localhost:3001/users
//GET user by id: curl -s http://localhost:3001/users/1
//CREATE user: curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","email":"
 
// const allowedOrigins = new Set(["http://localhost:3000"]);

// app.use(cors({
//   origin(origin, cb) {
//     if (!origin) return cb(null, true);                 // curl/postman
//     return cb(null, allowedOrigins.has(origin));
//   },
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

//Express error handling docs: https://expressjs.com/en/guide/error-handling.html
