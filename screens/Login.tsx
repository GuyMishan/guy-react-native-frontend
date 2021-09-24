import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  View
} from "react-native";
import { Block, Text, Button as GaButton, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [formdata, setFormdata] = useState([])

  const clicksubmit = async event => {
    setLoading(true);
    axios.post(`${api}/api/signin`, formdata)
      .then(response => {
        setLoading(false);
        StoreUserData(response.data._id);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(
          "Sign in Failed",
          "One or more credentials are incorrect",
          [
            { text: "Try Again", onPress: () => console.log("Try Again") }
          ]
        );
        console.log(error);
      })
  }

  /*async function ClearPrevUserData()//nneds to be on signout
  {
    try {
      await AsyncStorage.removeItem('user_id_token');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }*/

  async function StoreUserData(user_id) {
    try {
      await AsyncStorage.setItem('user_id_token', user_id);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    navigation.navigate('Home')
  }

  async function CheckIfUserIsSigned(user_id) {
    try {
      var gettoken = await AsyncStorage.getItem('asdsa')
      console.log(gettoken);
      if (gettoken != null) {
        navigation.navigate('Home')
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  useEffect(() => {
    CheckIfUserIsSigned()
  }, [])


  return (
    <Block flex middle>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}>
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign in with
                </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Block flex middle right>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="google"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.625}
                    color='#f74933'
                    style={[styles.social, styles.shadow]}
                  />
                </Block>
                <Block flex middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="twitter"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.625}
                    color='#1d9bf0'
                    style={[styles.social, styles.shadow]}
                  />
                </Block>
                <Block flex middle left>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="facebook"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.625}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                  />
                </Block>
              </Block>
            </Block>
            <Block flex>
              <Block flex={0.17} middle>
                <Text color="#8898AA" size={12}>
                  Or sign in the classic way
                  </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={text => setFormdata({ ...formdata, email: text })}
                      value={formdata.name}
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={text => setFormdata({ ...formdata, password: text })}
                      value={formdata.password}
                    />
                    <ActivityIndicator
                      animating={loading}
                      color="#0000ff"
                      size="large" />
                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={() => clicksubmit()}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        LOGIN
                        </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
                <Block flex center style={{paddingTop:35}}>
                  <Text color="#8898AA" size={12} onPress={() => navigation.navigate('Account')}>
                    Don't have an account? sign up
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    // paddingLeft: 15,
    // paddingTop: 13,
    // paddingBottom: 30
    direction: 'ltr'
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;
