//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.
// apps/mobile/src/services/tasksApi.js

import { config } from "../constants/config";

async function jsonOrThrow(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const tasksApi = {
  list: async () => {
    const res = await fetch(`${config.API_BASE_URL}/tasks`);
    return jsonOrThrow(res);
  },
  create: async (payload) => {
    const res = await fetch(`${config.API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return jsonOrThrow(res);
  },
  update: async (id, patch) => {
    const res = await fetch(`${config.API_BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    return jsonOrThrow(res);
  },
  remove: async (id) => {
    const res = await fetch(`${config.API_BASE_URL}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  },
};