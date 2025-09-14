import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Profile</Text>
      <Text style={{ marginTop: 8 }}>This is a placeholder profile page.</Text>
    </SafeAreaView>
  );
}
