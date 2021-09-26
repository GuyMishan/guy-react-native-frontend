import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import TextInput from '../components/TextInput';
import { theme } from '../constants/newTheme';
import Button from '../components/Button/Button';
import axios from 'axios';
import { api } from '../config.json'
import { useNavigation } from '@react-navigation/core';
// import {
//   emailValidator,
//   passwordValidator,
//   nameValidator,
// } from '../constants/utils';

const { width, height } = Dimensions.get("screen");


const Register = () => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });


  const navigation = useNavigation();

  const clicksubmit = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    var metadata = { 'name': name.value  , 'email': email.value , 'password': password.value }
      axios.post(`${api}/api/signup`, metadata)
        .then(response => {
          Alert.alert("Registered Succesfully");
          console.log(response.data)
        })
        .catch((error) => {
          Alert.alert("Register Unsuccesfull"
          );
          console.log(error);
        })

  }


   const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';
  
    return '';
  };
  
   const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';
  
    return '';
  };
  
   const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';
  
    return '';
  }; 
  return (
    <View>

      {/* <Logo />  Add Logo Commponent */}

      {/* <Header>Create Account</Header> */}

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TouchableOpacity onPress={clicksubmit}>
        <Button mode="contained" style={styles.button}>
          Sign Up
        </Button>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
export default Register;