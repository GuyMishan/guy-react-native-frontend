import React, {useState} from "react";
import { Image,SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

export default props => {
    return (
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <SafeAreaView style={{flex: 1}}>
            <Screens />
          </SafeAreaView >
        </GalioProvider>
      </NavigationContainer>
    );
}