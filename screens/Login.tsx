import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Button from '../components/Button/Button';
import { Images, argonTheme } from "../constants";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import { useNavigation } from '@react-navigation/core';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import Logo from '../components/Logo';
import { theme } from '../constants/newTheme';

import io from 'socket.io-client'
import {localApi,chatPort} from '../config.json'

const { width, height } = Dimensions.get("screen");
const ENDPOINT =`${localApi}:${chatPort}`

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const clicksubmit = async () => {
    var metadata = { 'email': email.value, 'password': password.value }
    setLoading(true);
    axios.post(`${api}/api/signin`, metadata)
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

  async function StoreUserData(user_id: string) {
    try {
      await AsyncStorage.setItem('user_id_token', user_id);
    } catch (error: any) {
      console.log('AsyncStorage error: ' + error.message);
    }
    ConnectUserToSocket(user_id);
  }

  async function ConnectUserToSocket(user_id: string) {
    try {
     const socket =io(ENDPOINT);
     socket.on("Chat message",(msg:any)=>{
       console.log(msg)
     })
    } catch (error: any) {
      console.log('error: ' + error.message);
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
    } catch (error: any) {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <ImageBackground
        resizeMode="cover"
        source={Images.RegisterBackground}
        style={styles.image}>
        <SafeAreaView style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', }}>
          <View style={styles.registerContainer}>
            <Label TextLabel="Login" />
            <Logo width={170}
              height={160}
            />
            <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', }}>

              <View style={{ flex: 1 }}>
                <View >
                  <TextInput

                    placeholder="Email"
                    onChangeText={text => setEmail({ value: text, error: '' })}
                    value={email.value}
                  />

                  <TextInput

                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={text => setPassword({ value: text, error: '' })}
                    value={password.value}
                  />
                  <ActivityIndicator
                    animating={loading}
                    color="#0000ff"
                    size="large" />
                </View>
                <View  >
                  <View >
                    <Button ButonLabel="Login"
                      Width={130}
                      OnClick={clicksubmit}
                    />

                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Dont have an account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                      <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 40,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 80,
    shadowOpacity: 1,
    elevation: 1,
    overflow: "hidden"
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center' ,
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
    fontSize: 18
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 18
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

  button: {
    width: 120,
    height: 40,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

export default Login;
