import { StyleSheet, Text, View } from "react-native";

import BottomTabNavigation from "./src/navigation/bottomNavigation/index";
import Navigation from "./src/navigation/stackNavigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
