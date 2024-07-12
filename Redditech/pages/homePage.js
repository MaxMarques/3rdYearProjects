import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from './profilePage';
import SettingsScreen from './settingsPage';
import searchScreen from "./searchPage";
import PostList from "../components/listComponent";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

/**
 * We create a Tab to have a navigation bar at the bottom
 * of the screen to navigate between the different pages
*/
const Tab = createMaterialBottomTabNavigator();

/**
 * This function is display when you are in the home of
 * the application.
 * She call a component PostList to get and display the posts
 * @param {var} navigation - use to move to another string
 * @return The view
*/
function HomeScreen ({ navigation }) {
  return (
    <View>
      <PostList/>
    </View>
  );
};

/**
 * This function create and display all of the button
 * in the tab bar.
 * She call the different function to switch in the
 * different screens.
 * @return The stack to navigate between the screen
*/
export default function HomePage () {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" activeColor="white" colorScheme="red" barStyle={{ backgroundColor: 'red' }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={20} />
          ),
        }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" color={color} size={20} />
          ),
        }} />
      <Tab.Screen name="Search" component={searchScreen} options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="search" color={color} size={20} />
        ),
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" color={color} size={20} />
          ),
        }} />
    </Tab.Navigator>
  );
}