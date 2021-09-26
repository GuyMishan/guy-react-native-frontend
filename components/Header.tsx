import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';


const Header = () => {
  const navigation = useNavigation<any>();

  const handleLeftPress = () => {
    return (navigation.openDrawer());
  }

  const handleHeartPress = () => {
    /* return (navigation.navigate('Elements'));*/
  }

  const handlePlusPress = () => {
    /*return (navigation.navigate('Elements'));*/
  }

  return (
    <View style={{ flexDirection: "row", height: 55, backgroundColor: "#FFFF", alignItems: 'center' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Ionicons name="menu" size={30} color="black" onPress={handleLeftPress} style={{ paddingRight: 10, paddingLeft: 5 }} />
        <Ionicons name="heart" size={30} color="black" onPress={handleHeartPress} style={{ paddingRight: 10 }} />
        <Ionicons name="add" size={30} color="black" onPress={handlePlusPress} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: 'center' }}>
          <Text>Myapplogo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default (Header);
