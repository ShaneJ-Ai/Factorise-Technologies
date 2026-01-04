// SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.



import { app } from "./app.js"; //configuration separate from “startup” process entry point for express app starts server

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`API on :${port}`)); //server vs app common clean pattern.