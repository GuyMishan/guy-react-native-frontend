import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import { Images, argonTheme } from "../constants";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import { useNavigation } from '@react-navigation/core';

const { width, height } = Dimensions.get("screen");

const Login = () => {
  const navigation=useNavigation();
  const [loading, setLoading] = useState(false)
  const [formdata, setFormdata] = useState<any>([])

  const clicksubmit = async () => {
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

  async function StoreUserData(user_id: any) {
    try {
      await AsyncStorage.setItem('user_id_token', user_id);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    navigation.navigate('Home')
  }

  async function CheckIfUserIsSigned() {
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

    /*async function ClearPrevUserData()//nneds to be on signout
  {
    try {
      await AsyncStorage.removeItem('user_id_token');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }*/

  useEffect(() => {
    CheckIfUserIsSigned()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1,alignItems: 'center',justifyContent: 'center', }}>
      <ImageBackground
        resizeMode="cover"
        source={Images.RegisterBackground}
        style={styles.image}>
        <SafeAreaView style={{ flex: 0.25,alignItems: 'center',justifyContent: 'center', }}>
          <View style={styles.registerContainer}>
            <View style={styles.socialConnect}>
              <Text style={{ color: "#8898AA" }}>
                Sign in with
                </Text>
              <View style={{ flex: 1,flexDirection: 'row' }}>
                <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center', }}>
                  <TouchableOpacity style={styles.socialButtons} onPress={() => Alert.alert('Simple Button pressed')}>
                    <View>
                     <Text>sdsd</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 ,alignItems: 'center',justifyContent: 'center',}} >
                <TouchableOpacity style={styles.socialButtons} onPress={() => Alert.alert('Simple Button pressed')}>
                    <View>
                     <Text>sdsd</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center', }}>
                <TouchableOpacity style={styles.socialButtons} onPress={() => Alert.alert('Simple Button pressed')}>
                    <View>
                     <Text>sdsd</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.25,alignItems: 'center',justifyContent: 'center', }}>
              <View style={{ flex: 1 }} >
                <Text style={{ color: "#8898AA" }} >
                  Or sign in the classic way
                  </Text>
              </View>
              <View style={{ flex: 1 }}>
                  <View style={{ marginBottom: 15, width: width * 0.8 }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      onChangeText={text => setFormdata({ ...formdata, email: text })}
                      value={formdata.name}
                    />
                  </View>
                  <View style={{ marginBottom: 15, width: width * 0.8 }}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder="Password"
                      onChangeText={text => setFormdata({ ...formdata, password: text })}
                      value={formdata.password}
                    />
                    <ActivityIndicator
                      animating={loading}
                      color="#0000ff"
                      size="large" />
                  </View>
                  <View style={{ paddingTop: 35, flex: 1,alignItems: 'center',justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => clicksubmit()}>
                    <View>
                     <Text>LOGIN</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ paddingTop: 35, flex: 1,alignItems: 'center',justifyContent: 'center' }}>
                  <Text onPress={() => navigation.navigate('Account')}>
                    Don't have an account? sign up
                  </Text>
                </View>
                  </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.25,
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
    direction: 'ltr'
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width, height, zIndex: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 120,
    height: 40,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

export default Login;
