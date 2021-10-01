import React, { useEffect, useState } from 'react';
import { FlatList, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';

import { useRoute } from '@react-navigation/native';

import ChatMessage from "../components/ChatComponents/ChatMessage";
import InputBox from "../components/ChatComponents/InputBox";
import HeaderBackOnly from "../components/HeaderBackOnly";

const ChatRoomScreen = () => {

  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  const route = useRoute();

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
    fetchMessages();
  }, [])

  useEffect(() => {
    /* const getMyId = async () => {
       const userInfo = await Auth.currentAuthenticatedUser();
       setMyId(userInfo.attributes.sub);
     }
     getMyId();*/
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

  return (
    <>
      <HeaderBackOnly />
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      />

      <InputBox chatRoomID={route.params.id} />
    </>
  );
}

export default ChatRoomScreen;