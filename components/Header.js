import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, View } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  handleHeartPress = () => {
   /* const { navigation } = this.props;
    return (navigation.navigate('Elements'));*/
  }

  handlePlusPress = () => {
    /*const { navigation } = this.props;
    return (navigation.navigate('Elements'));*/
  }

  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    return (
      <View style={{ flexDirection: "row", height: 55, backgroundColor: "#FFFF", alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon
            name={back ? 'chevron-left' : "menu"} family="entypo"
            size={30} onPress={this.handleLeftPress}
            color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
            style={{ paddingRight: 15 }}
          />
          <Icon
            name={"heart"} family="entypo"
            size={30} onPress={this.handleHeartPress}
            color={argonTheme.COLORS.ICON}
            style={{ paddingRight: 15 }}
          />
          <Icon
            name={back ? 'chevron-left' : "plus"} family="entypo"
            size={30} onPress={this.handlePlusPress}
            color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
            style={{ paddingRight: 10 }}
          />
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
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default withNavigation(Header);
