//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

//app/mobile/src/components/TaskForm.js

import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
//pill style input + validation + disabled button + autoclear)

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState({ title: false });

  const errors = useMemo(() => {
    const e = {};
    if (!title.trim()) e.title = "Task title is required.";
    else if (title.trim().length < 2) e.title = "Title must be at least 2 characters.";
    return e;
  }, [title]);

  const isValid = Object.keys(errors).length === 0;

  const submit = () => {
    setTouched({ title: true });
    if (!isValid) return;

    onAddTask({ title: title.trim(), description: description.trim() || "" });

    setTitle("");
    setDescription("");
    setTouched({ title: false });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>New Task</Text>

      <View style={styles.inputWrap}>
        <Ionicons name="clipboard-outline" size={20} color={theme.colors.muted} />
        <TextInput
          style={styles.input}
          placeholder="Task title (required)"
          placeholderTextColor={theme.colors.muted}
          value={title}
          onChangeText={setTitle}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          returnKeyType="next"
        />
      </View>

      {touched.title && errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

      <View style={styles.inputWrap}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme.colors.muted} />
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          placeholderTextColor={theme.colors.muted}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Pressable
        onPress={submit}
        disabled={!isValid}
        style={({ pressed }) => [
          styles.button,
          !isValid && styles.buttonDisabled,
          pressed && isValid && styles.buttonPressed,
        ]}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    marginTop: theme.spacing.sm,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.text,
  },
  error: {
    marginTop: theme.spacing.xs,
    color: theme.colors.danger,
    fontSize: 13,
    marginLeft: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.md,
    height: 52,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonDisabled: { backgroundColor: "#A9CFFF" },
  buttonPressed: { transform: [{ scale: 0.99 }] },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
