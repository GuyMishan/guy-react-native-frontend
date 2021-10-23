import React, { useEffect, useState } from 'react';
import { FlatList, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import ChatMessage from "../components/ChatComponents/ChatMessage";
import InputBox from "../components/ChatComponents/InputBox";
import HeaderBackOnly from "../components/HeaderBackOnly";
import { io } from 'socket.io-client';

const ChatRoomScreen = () => {
  const [, forceUpdate] = useState();

  const isFocused = useIsFocused()
  const route = useRoute();

  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const socket = io(`https://guy-react-native-backend.herokuapp.com`).connect();

  socket.on('message', data => {
    console.log(data)
  })

  socket.on('loadchatmessagesfromdb', data => {
    setMessages(data[0].messages_data);
    //console.log(data[0].messages_data)
  })

  socket.on('pushmessagetoscreen', data => {
    var tempmessages=messages;
    tempmessages.push(data);
    setMessages(tempmessages);
    forceUpdate(data._id)
  })

  async function Getuserbytoken() {
    var gettoken;
    try {
      gettoken = await AsyncStorage.getItem('user_id_token')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
      .then(response => {
        setMyId(response.data._id)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    Getuserbytoken();
  }, [])

  useEffect(() => {
    if (route != undefined)
      socket.emit('loadchatmessages', route.params.id)
  }, [route,isFocused])

  return (
    <>
      <HeaderBackOnly />

      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item}/>}
        keyExtractor={(item, index) => index.toString()}
        // inverted
      />

      <InputBox chatRoomID={route.params.id} myUserId={myId} socket={socket}/>
    </>
  );
}

export default ChatRoomScreen;