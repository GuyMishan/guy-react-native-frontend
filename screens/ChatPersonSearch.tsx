import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button/Button';
import { Images, argonTheme } from "../constants";
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import Footer from '../components/Footer'
import HeaderBackOnly from "../components/HeaderBackOnly";
import TextInput from '../components/TextInput';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const { width, height } = Dimensions.get("screen");

const ChatPersonSearch = () => {
  const navigation = useNavigation();

  const [user, SetUser] = useState<any>([])

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]); //users
  const [masterDataSource, setMasterDataSource] = useState([]); //users

  async function Getuserbytoken() {
    var gettoken;
    try {
      gettoken = await AsyncStorage.getItem('user_id_token')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
      .then(response => {
        SetUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
      .then(response => {
        LoadUserFriends()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function onuserclick(userid1: any) {
    navigation.navigate('ChatRoomScreen', {
      id: 1,
      //id: chatRoom.id,
      name: user.name,
    })
  }

  function Item({ item }: any) {
    return (
      <>
        {user._id != item._id ?
          <>
            <TouchableOpacity style={styles.listItem} onPress={() => onuserclick(item._id)}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <Image source={{ uri: Images.ProfilePicture }} style={{ width: 60, height: 60, borderRadius: 30 }} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
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

  const searchFilterFunction = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank , Filter the masterDataSource, Update FilteredDataSource
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank ,Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  async function LoadUserFriends() {
    axios.post(`${api}/api/user/loadfriends`,{userid:user._id}) //need to make!!
      .then(response => {
        setFilteredDataSource(response.data);
        setMasterDataSource(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    Getuserbytoken()
  }, [])

  return (
    <>
      <HeaderBackOnly />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            right
            style={styles.search}
            placeholder="Who are you looking for?"
            placeholderTextColor={'#8898AA'}
            onChangeText={(text: any) => searchFilterFunction(text)}
            // onClear={() => searchFilterFunction('')}
            value={search}
          />
          <View style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
          {search.length >= 2 ?
            <FlatList
              style={{ flex: 1 }}
              data={filteredDataSource}
              renderItem={({ item }: any) => <Item item={item} />}
              keyExtractor={(item: any) => item._id}
            /> : null}
        </View>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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

export default ChatPersonSearch;
