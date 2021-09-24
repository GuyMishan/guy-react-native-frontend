import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Button as GaButton } from "galio-framework";

import { Card } from '../components';
import { Images, argonTheme } from "../constants";
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import Icon from '../components/Icon';
import Input from '../components/Input';
import Footer from '../components/Footer'
import { Header } from "../components";

const { width, height } = Dimensions.get("screen");

const PersonSearch = ({ navigation }) => {
  const [user, SetUser] = useState([])

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]); //users
  const [masterDataSource, setMasterDataSource] = useState([]); //users

  async function Getuserbytoken() {
    try {
      var gettoken = await AsyncStorage.getItem('user_id_token')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
      .then(response => {
        console.log(response.data);
        SetUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function SendFriendRequest(userid) {
    axios.post(`${api}/api/friendrequest`, { send_user: user._id, recieved_user: userid })
      .then(response => {
        var tempres = response;
        axios.post(`${api}/api/user/addsentfriendrequest`, { userid: user._id, friendrequestid: response.data._id })
          .then(response => {
            axios.post(`${api}/api/user/addrecievedfriendrequest`, { userid: userid, friendrequestid: tempres.data._id })
              .then(response => {
                Getuserbytoken()
              })
              .catch((error) => {
                console.log(error);
              })
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function onuserclick(userid1) {
    navigation.navigate('Profile',{userid:userid1,})
  }

  function isuseralreadyfriendrequested(userid) { //states= {0=no friend whatsoever,1=i requested friend,2=he requested friend,3=already friends(unfriend)}
    //check if userid is in user friendrequests already(sender/reciever) +another func for is the user is me?+another
    if(user.friendrequests_sent_data.some(friendrequest_sent_data=>friendrequest_sent_data.recieved_user===userid))
    {
      return 1;
    }
    if(user.friendrequests_recieved_data.some(friendrequest_recieved_data=>friendrequest_recieved_data.send_user===userid))
    {
      return 2;
    }
    /*if(user.friends.some(friend=>friend._id===userid))
    {
      return 3;
    }*/
    return 0;
  }

  function Item({ item }) {
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
                {isuseralreadyfriendrequested(item._id) ==0 ? //more than true/false.. write down states!!!
                  <GaButton color="info" style={{ width: '80%', height: '40%' }} onPress={() => SendFriendRequest(item._id)}>
                    <Text bold>
                      Add Friend
                    </Text>
                  </GaButton> 
                  : isuseralreadyfriendrequested(item._id) ==1 ?  
                  <GaButton color="#808080" style={{ width: '80%', height: '40%' }} /*onPress={() => CancelFriendRequest(item._id)}*/>
                  <Text bold>
                    Sent Request
                  </Text>
                </GaButton> 
                : isuseralreadyfriendrequested(item._id) ==2 ?
                <GaButton color="success" style={{ width: '80%', height: '40%' }} /*onPress={() => AcceptFriendRequest(item._id)}*/>
                  <Text bold>
                    Accept Request
                  </Text>
                </GaButton> 
                : isuseralreadyfriendrequested(item._id) ==3 ?
                <GaButton color="error" style={{ width: '80%', height: '40%' }} /*onPress={() => UnFriendRequest(item._id)}*/>
                  <Text bold>
                    Unfriend
                  </Text>
                </GaButton> 
                :null }
              </View>
            </TouchableOpacity>
            <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
          </>
          : null}
      </>
    );
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank , Filter the masterDataSource, Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
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

  async function LoadAllUsers() {
    axios.get(`${api}/api/users`)
      .then(response => {
        setFilteredDataSource(response.data);
        setMasterDataSource(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    LoadAllUsers()
    Getuserbytoken()
  }, [])

  return (
    <>
    <Header/>
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Input
          right
          color="black"
          style={styles.search}
          placeholder="Who are you looking for?"
          placeholderTextColor={'#8898AA'}
          iconContent={<Icon size={16} name="search-zoom-in" family="ArgonExtra" />}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
        />
        <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
        {search.length >= 2 ?
          <FlatList
            style={{ flex: 1 }}
            data={filteredDataSource}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item._id}
          /> : null}

      </SafeAreaView>
      <Footer navigation={navigation} />
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

export default PersonSearch;
