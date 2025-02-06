import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Home/SearchScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Iconları ekledik

// Tab navigator oluştur
const Tab = createBottomTabNavigator();

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
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Anasayfa"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />

      {/* Orta Buton */}
      {/* <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      /> */}

      <Tab.Screen
        name="Favorites"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-outline" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
