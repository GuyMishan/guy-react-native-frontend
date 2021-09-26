import React, { useState } from "react";
import { Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </SafeAreaView >
  );
}