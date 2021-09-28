import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import { theme } from 'galio-framework';


const Header = () => {
  const navigation = useNavigation<any>();

  const handleLeftPress = () => {
    return (navigation.openDrawer());
  }

  const handleHeartPress = () => {
    /* return (navigation.navigate('Elements'));*/
  }

  const handleChatPress = () => {
    return (navigation.navigate('Chat'));

  }

  return (
    <View style={styles.topbar}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Ionicons name="menu" size={40} color="black" onPress={handleLeftPress} style={styles.openNavigationIcon} />
        <Ionicons name="heart" size={40} color="black" onPress={handleHeartPress} style={styles.regularIcon} />
        <Entypo name="chat" size={40} color="black" onPress={handleChatPress} style={styles.regularIcon} />
      </View>


      <View style={styles.title}>
        <Text style={styles.textTitle}>WingerX</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    height: 55,
    backgroundColor:theme.COLORS?.NAVBAR,
    alignItems: 'center' ,
    marginTop : 20 , 
  },
  title: {
    justifyContent: "center",
    alignItems: 'center',
    flex: 1 ,
  } ,
  textTitle: {
    fontSize : 28 ,
    fontWeight : 'bold' ,
    color : theme.COLORS?.PRIMARY
  } ,
  openNavigationIcon : { 
    paddingRight: 10,
    paddingLeft: 10 
  } ,
  regularIcon : { 
    paddingRight: 10,
    
  } ,
});

export default Header;
