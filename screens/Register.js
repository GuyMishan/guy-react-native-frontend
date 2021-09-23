import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Block, Text, Button as GaButton, theme ,Checkbox} from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios';
import { api } from '../config.json'

const { width, height } = Dimensions.get("screen");

const Register = ({ navigation }) => {
  const [checkboxed, setCheckboxed] = useState(false)
  const [formdata, setFormdata] = useState([])

  const clicksubmit = event => {
    console.log(checkboxed)
    console.log(formdata)
    if (checkboxed) {
      //if (CheckForm()) {
      axios.post(`${api}/api/signup`, formdata)
        .then(response => {
          Alert.alert(
            "Registered Succesfully",
            [
              { text: "Continue", onPress: () => console.log("Continue") }
            ]
          );
          console.log(response.data)
        })
        .catch((error) => {
          Alert.alert(
            "Register Unsuccesfull",
            error
            [
            { text: "Try Again", onPress: () => console.log("Try Again") }
            ]
          );
          console.log(error);
        })
      // }
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validateName(name) {
    if (name.length >= 4)
      return true;
  }

  function validatePassword(passowrd) {
    if (passowrd.length >= 4)
      return true;
  }

  function CheckForm() {
    if (formdata.name && formdata.passowrd && formdata.email) {
      if (validateEmail(formdata.email) && validateName(formdata.name) && validatePassword(formdata.passowrd)) {
        return true;
      }
    }
    return false;
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
                Sign up with
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
                  Or sign up the classic way
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
                      placeholder="Name"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={text => setFormdata({ ...formdata, name: text })}
                      value={formdata.name}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={text => setFormdata({ ...formdata, email: text })}
                      value={formdata.email} />
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
                    <Block right={true} style={{}}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        password strength:
                        </Text>
                      <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                        {" "}
                          strong
                        </Text>
                    </Block>
                  </Block>
                  <Block row>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3
                      }}
                      label=""
                      color={argonTheme.COLORS.PRIMARY}
                      value={checkboxed}
                      onChange={setCheckboxed}
                    />
                    <Button
                      style={{ width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14
                      }}
                    >
                      Privacy Policy
                      </Button>
                    <Text style={{ alignSelf: 'center' }}>I Agree With The</Text>

                  </Block>
                  <Block middle>
                    <Button color="primary" style={styles.createButton} onPress={() => clicksubmit()}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        CREATE ACCOUNT
                        </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
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

export default Register;
