import React, { useState } from "react";
import { SafeAreaView, Platform } from "react-native";

import useHardwareBackHandler from "./useHardwareBackHandler";

import AppHeader from "./components/AppHeader";
import ProductsScreen from "./components/ProductsScreen";
import DetailScreen from "./components/DetailScreen";
import ProfileScreen from "./components/ProfileScreen";
import CartScreen from "./components/CartScreen";

if (
  typeof process !== "undefined" &&
  typeof process.env === "object" &&
  typeof process.env.EXPO_OS === "undefined"
) {
  process.env.EXPO_OS = Platform.OS === "web" ? "web" : Platform.OS;
}

export default function App() {
  const [history, setHistory] = useState([{ name: "Products", params: {} }]);
  const [cartItems, setCartItems] = useState([]);

  const current = history[history.length - 1];
  const cartCount = cartItems.length;

  const canGoBack = () => history.length > 1;
  const goBack = () => {
    setHistory((h) => {
      if (h.length <= 1) return h;
      return h.slice(0, h.length - 1);
    });
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  };

  const navigate = (name, params = {}) => {
    setHistory((h) => [...h, { name, params }]);
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  };

  useHardwareBackHandler(canGoBack, goBack, {
    doublePressExit: true,
    exitToast: "Press back again to exit",
    exitTimeout: 2000,
  });

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const onProfile = () => navigate("Profile");
  const onCart = () => navigate("Cart");
  const onBack = canGoBack() ? goBack : null;

  let content = null;
  if (current.name === "Products") {
    content = <ProductsScreen navigate={navigate} />;
  } else if (current.name === "Detail") {
    content = (
      <DetailScreen params={current.params} onAddToCart={handleAddToCart} />
    );
  } else if (current.name === "Profile") {
    content = <ProfileScreen />;
  } else if (current.name === "Cart") {
    content = <CartScreen items={cartItems} />;
  } else {
    content = <ProductsScreen navigate={navigate} />;
  }

  const title =
    current.name === "Products"
      ? "Products"
      : current.name === "Detail"
      ? "Product Detail"
      : current.name === "Profile"
      ? "Profile"
      : current.name === "Cart"
      ? "Cart"
      : "App";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        title={title}
        onBack={onBack}
        onProfile={onProfile}
        onCart={onCart}
        cartCount={cartCount}
      />
      {content}
    </SafeAreaView>
  );
}
