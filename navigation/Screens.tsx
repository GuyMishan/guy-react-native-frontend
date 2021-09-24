import React from "react";
import { Easing, Animated, Dimensions,View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
//new screens
import Home from "../screens/Home";
import Register from "../screens/Register";
import Login from "../screens/Login";
import PersonSearch from "../screens/PersonSearch";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppStack(props) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Login">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="PersonSearch" component={PersonSearch} />
    </Drawer.Navigator>
  );
}

