//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.
//app/mobile/src/hooks/useTask.js


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