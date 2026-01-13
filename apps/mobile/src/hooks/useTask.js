//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.
//app/mobile/src/hooks/useTask.js


<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import { tasksApi } from "../services/tasksApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const data = await tasksApi.list();
      setTasks(data);
    } catch (e) {
      setError(e.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTask = useCallback(async (t) => {
    setError("");
    const created = await tasksApi.create(t);
    setTasks((prev) => [created, ...prev]);
  }, []);

  const updateTask = useCallback(async (id, patch) => {
    setError("");
    const updated = await tasksApi.update(id, patch);
    setTasks((prev) => prev.map((x) => (x.id === id ? updated : x)));
  }, []);

  const deleteTask = useCallback(async (id) => {
    setError("");
    await tasksApi.remove(id);
    setTasks((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { tasks, loading, error, refresh, addTask, updateTask, deleteTask };
}







// import { useCallback, useState } from "react";

// export function useTasks() {
//   const [tasks, setTasks] = useState([]);

//   const addTask = useCallback((t) => {
//     const newTask = {
//       id: String(Date.now()) + Math.random().toString(16).slice(2),
//       title: t.title,
//       description: t.description,
//       createdAt: new Date().toISOString(),
//     };
//     setTasks((prev) => [newTask, ...prev]);
//   }, []);

//   return { tasks, addTask };
// }
=======
import { useCallback, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  const addTask = useCallback((t) => {
    const newTask = {
      id: String(Date.now()) + Math.random().toString(16).slice(2),
      title: t.title,
      description: t.description,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  return { tasks, addTask };
}
>>>>>>> origin/main
