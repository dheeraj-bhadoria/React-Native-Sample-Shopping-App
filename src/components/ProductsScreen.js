import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from "react-native";
import ProductCard from "./ProductCard";

const API_URL = "https://api.npoint.io/866592d4df655060f42c";

export default function ProductsScreen({ navigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.products ?? [];
      if (mounted.current) {
        setProducts(list);
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "Failed to load");
      setLoading(false);
    }
  }

  const handlePressProduct = (item) => {
    navigate("Detail", { product: item });
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
        <Pressable onPress={load}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item, idx) =>
          item?.id != null ? String(item.id) : String(idx)
        }
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={handlePressProduct} />
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </SafeAreaView>
  );
}
