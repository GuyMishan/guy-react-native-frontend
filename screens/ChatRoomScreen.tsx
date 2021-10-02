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

const ChatRoomScreen = () => {
  const isFocused = useIsFocused()
  const route = useRoute();

  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

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

  const fetchMessages = async () => {
    /* const messagesData = await API.graphql(
       graphqlOperation(
         messagesByChatRoom, {
           chatRoomID: route.params.id,
           sortDirection: "DESC",
         }
       )
     )
     console.log("FETCH MESSAGES")
     setMessages(messagesData.data.messagesByChatRoom.items);*/
  }

  useEffect(() => {
    //fetchMessages();
  }, [])

  useEffect(() => {
    /* const subscription = API.graphql(
       graphqlOperation(onCreateMessage)
     ).subscribe({
       next: (data) => {
         const newMessage = data.value.data.onCreateMessage;
 
         if (newMessage.chatRoomID !== route.params.id) {
           console.log("Message is in another room!")
           return;
         }
 
         fetchMessages();
         // setMessages([newMessage, ...messages]);
       }
     });
 
     return () => subscription.unsubscribe();*/
  }, [])

  //console.log(`messages in state: ${messages.length}`)

  useEffect(() => {
    console.log(route)
  }, [isFocused])

  return (
    <>
      <HeaderBackOnly />
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      />

      <InputBox chatRoomID={route.params.id} myUserId={myId}/>
    </>
  );
}

export default ChatRoomScreen;