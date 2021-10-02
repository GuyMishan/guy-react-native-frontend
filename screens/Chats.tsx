import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Images, argonTheme } from "../constants";
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import Footer from '../components/Footer'
import Header  from "../components/Header";
import TextInput from '../components/TextInput';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const { width, height } = Dimensions.get("screen");

const Chats = () => {
    const [user, SetUser] = useState<any>([])

    const navigation = useNavigation();

    async function Getuserbytoken() {
        var gettoken;
        try {
          gettoken = await AsyncStorage.getItem('user_id_token')
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
        axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
          .then(response => {
            console.log(response.data)
            SetUser(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
          /*.then(response => { //get chats of user
            console.log(response.data)
            SetUser(response.data)
          })
          .catch((error) => {
            console.log(error);
          })*/
      }

      async function OpenChat(chat:any) {
        let tempfreindid=null;
        for (let i = 0; i < chat.users.length; i++) {
          if ((chat.users.length == 2)&&(chat.users[i]!=user._id)) {
            tempfreindid = chat.users[i]
          }
        }
        navigatetochatroom(chat._id,tempfreindid)
      }

      async function navigatetochatroom(chatid:any,tempfreindid: any) {
        navigation.navigate('ChatRoomScreen', {
            id: chatid,
            friendid: tempfreindid,
          })
      }
    
      async function onChatclick(chatid: any) {
        OpenChat(chatid)
      }

    function Item({ item }: any) {
        return (
          <>
            {user._id != item._id ?
              <>
                <TouchableOpacity style={styles.listItem} onPress={() => onChatclick(item)}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Image source={{ uri: Images.ProfilePicture }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "bold" }}>{item._id}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                    <Ionicons name="chatbox" size={30}></Ionicons>
                  </View>
                </TouchableOpacity>
                <View style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
              </>
              : null}
          </>
        );
      }

    const OnTextInputFoccus = () => {
        navigation.navigate('ChatPersonSearch')
    };

    useEffect(() => {
        Getuserbytoken()
      }, [])

    return (
        <>
            <Header />
            <TextInput
                right
                style={styles.search}
                placeholder="Who are you looking for?"
                placeholderTextColor={'#8898AA'}
                onFocus={() => OnTextInputFoccus()}
            />
            <View style={styles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    data={user.chats_data}
                    renderItem={({ item }: any) => <Item item={item} />}
                    keyExtractor={(item: any) => item._id}
                />
            </View>
            <Footer/>
        </>
    );
}

export default Chats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },
    listItem: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#FFF",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
      }
});
