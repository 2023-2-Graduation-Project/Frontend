import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FirstTab from "./Tabs/FirstTab";
import SecondTab from "./Tabs/SecondTab";
import ThirdTab from "./Tabs/ThirdTab";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const { userId, userPassword } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "FirstTab") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          } else if (route.name === "SecondTab") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "ThirdTab") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0b5685",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#CEECF5",
        },
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "#CEECF5",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="FirstTab"
        component={FirstTab}
        initialParams={{ userId: userId, userPassword: userPassword }}
        options={{ title: "스팸 검사" }}
      />
      <Tab.Screen
        name="SecondTab"
        component={SecondTab}
        initialParams={{ userId: userId, userPassword: userPassword }}
        options={{ title: "스팸 목록" }}
      />
      <Tab.Screen
        name="ThirdTab"
        component={ThirdTab}
        initialParams={{ userId: userId, userPassword: userPassword }}
        options={{ title: "내 정보" }}
      />
    </Tab.Navigator>
  );
}
