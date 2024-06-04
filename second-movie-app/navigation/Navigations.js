import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

import { Color } from "../constant/Constant";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerContentStyle: { backgroundColor: Color.drawerBackground },
        drawerActiveTintColor: Color.yellow,

        drawerInactiveTintColor: Color.white,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="home" size={20} color={Color.white} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          drawerIcon: () => (
            <AntDesign name="like1" size={24} color={Color.white} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Drawer" component={MyDrawer} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
