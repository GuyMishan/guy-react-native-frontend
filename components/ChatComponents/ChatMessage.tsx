import React from 'react';
import {Text, View} from 'react-native';
import { Message } from "../../types";
import { StyleSheet } from "react-native";

export type ChatMessageProps = {
  message: Message;
  myId: String,
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message, myId } = props;

  const isMyMessage = () => {
    return message.user.id === myId;
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          marginLeft: isMyMessage() ? 50 : 0,
          marginRight: isMyMessage() ? 0 : 50,
        }
      ]}>
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{message.createdAt}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
    },
    name: {
      fontWeight: "bold",
      marginBottom: 5,
    },
    message: {
  
    },
    time: {
      alignSelf: "flex-end",
      color: 'grey'
    }
  });

  export default ChatMessage;
