import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text
} from "react-native";

import Images from "../constants/Images";



function CustomDrawerContent() {
  const screens = [
    "Home", 
    //"Profile",
    //"Account",
    //"Elements",
    // "Articles",
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Images.Logo} /> 
        {/* logo */}
      </View>
      <View style={{ paddingLeft: 8, paddingRight: 14,flex:1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8,flex:1 }}>
        <Text style={{ marginTop: 16, marginLeft: 8,color:"#8898AA" }}>SETTINGS</Text>
        </View>
          {/* {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })} */}
            <View style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <View style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
              <Text  style={{ marginTop: 16, marginLeft: 8,color:"#8898AA" }}>DOCUMENTATION</Text>
            </View>
            {/* <DrawerCustomItem title="Getting Started" navigation={navigation} /> */}
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    flex:0.06,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;
