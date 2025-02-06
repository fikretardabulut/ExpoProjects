import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// ********** Screens/Home **********
import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Home/SearchScreen";

// ********** Screens/Profile **********
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ProfileNotificationScreen from "../screens/Profile/ProfileNotificationScreen";

// ********** Screens/Settings **********
import SettingsScreen from "../screens/Settings/SettingsScreen";
import ProfileDetails from "../screens/Settings/ProfileDetails";
import AddressSettings from "../screens/Settings/AddressSettings";
import SecuritySettings from "../screens/Settings/SecuritySettings";
import LanguageSettings from "../screens/Settings/LanguageSettings";
import AppearanceSettings from "../screens/Settings/AppearanceSettings";
import PrivacySettings from "../screens/Settings/PrivacySettings";
import StorageSettings from "../screens/Settings/StorageSettings";
import BackupSettings from "../screens/Settings/BackupSettings";
import HelpCenter from "../screens/Settings/HelpCenter";
import About from "../screens/Settings/About";
import Legal from "../screens/Settings/Legal";

import NewAppointment from "../screens/Appointments/NewAppointment";
import AppointmentDetails from "../screens/Appointments/AppointmentDetails";
import ReminderSettings from "../screens/Settings/ReminderSettings";

import NotificationSettings from "../screens/Settings/NotificationSettings";

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

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

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <ProfileStack.Screen name="ProfileNotificationScreen" component={ProfileNotificationScreen} />
      <ProfileStack.Screen name="NotificationSettings" component={NotificationSettings} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <ProfileStack.Screen name="ProfileDetails" component={ProfileDetails} />
      <ProfileStack.Screen name="AddressSettings" component={AddressSettings} />
      <ProfileStack.Screen name="SecuritySettings" component={SecuritySettings} />
      <ProfileStack.Screen name="LanguageSettings" component={LanguageSettings} />
      <ProfileStack.Screen name="AppearanceSettings" component={AppearanceSettings} />
      <ProfileStack.Screen name="PrivacySettings" component={PrivacySettings} />
      <ProfileStack.Screen name="StorageSettings" component={StorageSettings} />
      <ProfileStack.Screen name="BackupSettings" component={BackupSettings} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenter} />
      <ProfileStack.Screen name="About" component={About} />
      <ProfileStack.Screen name="Legal" component={Legal} />

      <ProfileStack.Screen name="NewAppointment" component={NewAppointment} />
      <ProfileStack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <ProfileStack.Screen name="ReminderSettings" component={ReminderSettings} />

    </ProfileStack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF"
      />
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
          component={ProfileStackScreen}
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
    </>
  );
};

export default BottomTabNavigator;
