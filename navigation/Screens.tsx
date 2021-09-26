import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

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

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent/>}
      initialRouteName="Login">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="PersonSearch" component={PersonSearch} />
    </Drawer.Navigator>
  );
}

