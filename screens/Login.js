import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  const [formdata, setFormdata] = useState([])

  const clicksubmit = async event => {
    ClearPrevUserData()
    axios.post(`https://guy-react-native-backend.herokuapp.com/api/signin`, formdata)
      .then(response => {
        StoreUserData(response.data._id);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function ClearPrevUserData()//nneds to be on signout
  {
    try {
      await AsyncStorage.removeItem('user_id_token');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async function StoreUserData(user_id) {
    try {
      await AsyncStorage.setItem('user_id_token', user_id);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    navigation.navigate('Home')
  }

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign in with
                </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                  <Block row>
                    <Icon
                      name="logo-github"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GITHUB</Text>
                  </Block>
                </Button>
                <Button style={styles.socialButtons}>
                  <Block row>
                    <Icon
                      name="logo-google"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GOOGLE</Text>
                  </Block>
                </Button>
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
                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={() => clicksubmit()}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        LOGIN
                        </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
              <Block flex center>
              <Text color="#8898AA" size={12} onPress={() => navigation.navigate('Account')}>
                  Don't have an account? sign up
                  </Text>
                {/* <Button color="primary" style={styles.createButton} onPress={() => clicksubmit()}>
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                    SIGN UP
                        </Text>
                </Button> */}
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
