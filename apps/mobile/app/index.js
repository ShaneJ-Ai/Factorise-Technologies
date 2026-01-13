//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

//main screen
//app/mobile/app/index.js


import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TaskForm from "../src/components/TaskForm";
import TaskItem from "../src/components/TaskItem";
import { theme } from "../src/theme/theme";
import { useTasks } from "../src/hooks/useTask";
import { tasksApi } from "../src/services/taskApi";



export default function Home() {
  const { tasks, addTask } = useTasks();
  const headerTitle = useMemo(() => "Task Planner", []);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Text style={styles.headerSubtitle}>Clean UI • Mobile-first</Text>
        </View>

        <View style={styles.body}>
          <TaskForm onAddTask={addTask} />
          <Text style={styles.listTitle}>Tasks</Text>

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <TaskItem task={item} index={index} />}
            ItemSeparatorComponent={() => <View style={{ height: theme.spacing.sm }} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            initialNumToRender={12}
            windowSize={10}
            removeClippedSubviews={true}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.headerBg },

  header: {
    flex: 1,
    backgroundColor: theme.colors.headerBg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    justifyContent: "center",
  },
  headerTitle: { fontSize: 28, fontWeight: "900", color: "#fff", letterSpacing: 0.2 },
  headerSubtitle: { marginTop: 6, fontSize: 14, color: "rgba(255,255,255,0.85)" },

  body: {
    flex: 2,
    backgroundColor: theme.colors.bodyBg,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  listTitle: { fontSize: 16, fontWeight: "800", color: theme.colors.text, marginTop: theme.spacing.sm },
  listContent: { paddingBottom: 80 },
});



// Expo Router is enabled in package.json
//"main": "expo-router/entry"

