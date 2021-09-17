import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    return (
      <NavBar
        back={false}
        transparent={transparent}
        left={
          <Icon
            name={back ? 'chevron-left' : "menu"} family="entypo"
            size={30} onPress={this.handleLeftPress}
            color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
            style={{ marginTop: 2 }}
          />

        }
        leftStyle={{ flex: 0.2 }}
        title={title}
        titleStyle={[
          styles.title,
        ]}
      >
      </NavBar>
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
