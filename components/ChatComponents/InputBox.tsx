import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,} from "react-native";
import { StyleSheet } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';

const InputBox = (props:any) => {
  const isFocused = useIsFocused()

  const { chatRoomID } = props;
  const { myUserId } = props;
  const { socket } = props;

  const [message, setMessage] = useState('');

  const onMicrophonePress = () => {
    console.log('Microphone')
  }

  const onSendPress = async () => {
    socket.emit('sendmessage', {chatRoomID,myUserId,message}) //supposed to: store message in chat db +send straight up message to users
    setMessage('');
  }

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{width: '100%'}}
    >
      <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons name="microphone" size={28} color="grey" />
            : <MaterialIcons name="send" size={28} color="grey" />}
        </View>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default InputBox;
