import { StyleSheet, Text, View } from "react-native";

import BottomTabNavigation from "../bottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Welcome from "../../pages/Welcome";
import { createStackNavigator } from "@react-navigation/stack";

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Welcome"}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
