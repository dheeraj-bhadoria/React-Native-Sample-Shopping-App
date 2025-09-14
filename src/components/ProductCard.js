import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProductCard({ item, onPress }) {
  const imageUri =
    item?.image ||
    item?.imageUrl ||
    item?.thumbnail ||
    "https://via.placeholder.com/120";

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <View style={styles.cardRow}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item?.title ?? "No Title"}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item?.description ?? "No description"}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.rating}>⭐ {item?.rating ?? "—"}</Text>
            <Text style={styles.price}>₹ {item?.price ?? "—"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardRow: { flexDirection: "row" },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  cardContent: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700" },
  description: { fontSize: 13, color: "#444", marginTop: 4 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: { marginTop: 6, fontWeight: "600" },
  price: { marginTop: 6, fontSize: 16, fontWeight: "800" },
});
