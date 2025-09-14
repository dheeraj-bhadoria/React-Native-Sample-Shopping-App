import React from "react";
import { SafeAreaView, View, Text } from "react-native";

export default function CartScreen({ items }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Cart</Text>
        {items.length === 0 ? (
          <Text style={{ marginTop: 12 }}>Your cart is empty.</Text>
        ) : (
          <View style={{ marginTop: 12 }}>
            {items.map((it, idx) => (
              <View
                key={idx}
                style={{
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text style={{ fontWeight: "700" }}>
                  {it?.title ?? "Untitled"}
                </Text>
                <Text>₹ {it?.price ?? "—"}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
