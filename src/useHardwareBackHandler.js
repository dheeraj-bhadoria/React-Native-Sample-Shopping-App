// useHardwareBackHandler.js
import { useEffect, useRef } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";

/**
 * useHardwareBackHandler
 *
 * @param {() => boolean} canGoBack - function (or value) returning whether app can navigate back
 * @param {() => void} onGoBack - function to call to perform navigation back
 * @param {object} opts - { doublePressExit=true (Android), exitToast, exitTimeout }
 */
export default function useHardwareBackHandler(canGoBack, onGoBack, opts = {}) {
  const {
    doublePressExit = Platform.OS === "android",
    exitToast = "Press back again to exit",
    exitTimeout = 2000,
  } = opts;

  const canGoBackRef = useRef(canGoBack);
  const onGoBackRef = useRef(onGoBack);
  const lastBackRef = useRef(0);

  // keep refs up to date
  useEffect(() => {
    canGoBackRef.current = canGoBack;
  }, [canGoBack]);

  useEffect(() => {
    onGoBackRef.current = onGoBack;
  }, [onGoBack]);

  useEffect(() => {
    if (Platform.OS === "web") return; // no hardware back on web

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        try {
          const canBack =
            typeof canGoBackRef.current === "function"
              ? canGoBackRef.current()
              : Boolean(canGoBackRef.current);

          if (canBack) {
            if (typeof onGoBackRef.current === "function") {
              onGoBackRef.current();
              return true; // we handled it
            }
            return false;
          }

          // at root
          if (!doublePressExit) {
            return false; // let OS handle (exit)
          }

          const now = Date.now();
          if (now - lastBackRef.current < exitTimeout) {
            // allow default -> exit
            return false;
          }
          lastBackRef.current = now;
          if (Platform.OS === "android" && ToastAndroid && ToastAndroid.show) {
            ToastAndroid.show(exitToast, ToastAndroid.SHORT);
          }
          return true; // consume this first press
        } catch (e) {
          return false;
        }
      }
    );

    return () => {
      if (subscription && typeof subscription.remove === "function")
        subscription.remove();
      else BackHandler.removeEventListener("hardwareBackPress", () => {});
    };
  }, [doublePressExit, exitToast, exitTimeout]);
}
