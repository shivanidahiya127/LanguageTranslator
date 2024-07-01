import AnDesign from "react-native-vector-icons/AntDesign";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useState } from "react";
import Home from "../../pages/Home";
import Details from "../../pages/Details";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  const [tabBackground, setTabBackground] = useState("red");
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="black"
        inactiveColor="#3e2465"
        barStyle={{
          backgroundColor: "skyblue",
        }}
        activeIndicatorStyle={{ backgroundColor: "pink" }}
      >
        <Tab.Screen
          name="Feed"
          component={Home}
          listeners={{
            tabPress() {
              setTabBackground("red");
            },
          }}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <AnDesign name="home" color={color} size={26} />
            ),
            tabBarColor: "purpule",
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Details}
          listeners={{
            tabPress() {
              setTabBackground("pink");
            },
          }}
          options={{
            tabBarLabel: "Updates",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                onPre
                name="bell"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Home}
          listeners={{
            tabPress() {
              setTabBackground("green");
            },
          }}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
