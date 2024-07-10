import Details from "../../pages/Details";
import { FontAwesome } from "@expo/vector-icons";
import Home from "../../pages/Home";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../../pages/ProfileScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: "skyblue",
      }}
      activeIndicatorStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: "Translation",
          tabBarIcon: ({ color }) => (
            <Ionicons name="language-outline" color={color} size={26} />
          ),
          tabBarColor: "purpule",
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Details}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
