import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { View, Text, TouchableOpacity } from "react-native";

// Tab navigator oluştur
const Tab = createBottomTabNavigator();

// Orta button bileşeni (Görseldeki gibi ortada büyük olacak)
const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

// Bottom Tab Navigator bileşeni
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen name="Anasayfa" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />

      {/* Orta Button */}
      <Tab.Screen
        name="Add"
        component={HomeScreen} // Butona basınca hangi ekran açılsın?
        options={{
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />

      <Tab.Screen name="Favorites" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
