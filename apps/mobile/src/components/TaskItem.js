//SPDX-License-Identifier: LicenseRef-LICENSE
//(c) Copyright 2026 Shane Flaten (CodingAce), all rights reserved.

//app/mobile/src/components/TaskItem.js



import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export default function TaskItem({ task, index }) {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{index + 1}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
        {task.description ? (
          <Text style={styles.desc} numberOfLines={2}>{task.description}</Text>
        ) : (
          <Text style={styles.descMuted}>No description</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    flexDirection: "row",
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badge: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: "#E6EEFF",
    alignItems: "center", justifyContent: "center",
  },
  badgeText: { fontWeight: "800", color: theme.colors.headerBg },
  title: { fontSize: 16, fontWeight: "800", color: theme.colors.text },
  desc: { marginTop: 4, fontSize: 14, color: theme.colors.muted },
  descMuted: { marginTop: 4, fontSize: 14, color: "#94A3B8", fontStyle: "italic" },
});