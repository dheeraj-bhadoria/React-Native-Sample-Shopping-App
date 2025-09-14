import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AppHeader({
  title,
  onBack,
  onProfile,
  onCart,
  cartCount,
}) {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.headerIconTouch}>
            <Text style={styles.icon}>{"\u2039"}</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onProfile} style={styles.headerIconTouch}>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCart} style={styles.headerIconTouch}>
          <Text style={styles.icon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", marginLeft: 8 },
  headerRight: { flexDirection: "row", alignItems: "center" },
  headerIconTouch: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    position: "relative",
  },
  icon: { fontSize: 22 },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#ff3333",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
});
