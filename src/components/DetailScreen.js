import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function DetailScreen({ params, onAddToCart }) {
  const product = params?.product ?? {};
  const imageUri =
    product?.image ||
    product?.imageUrl ||
    product?.thumbnail ||
    "https://via.placeholder.com/600x400";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: 260,
            borderRadius: 8,
            backgroundColor: "#eee",
          }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 12 }}>
          {product?.title ?? "No title"}
        </Text>
        <Text style={{ marginTop: 8 }}>
          {product?.description ?? "No description"}
        </Text>
        <Text style={{ marginTop: 8, fontWeight: "600" }}>
          ⭐ {product?.rating ?? "—"}
        </Text>
        <Text style={{ marginTop: 8, fontSize: 18, fontWeight: "700" }}>
          ₹ {product?.price ?? "—"}
        </Text>

        <TouchableOpacity
          onPress={() => onAddToCart(product)}
          style={styles.addButton}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#0066cc",
    borderRadius: 8,
  },
});
