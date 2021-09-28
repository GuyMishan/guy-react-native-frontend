import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button/Button';
import { Images, argonTheme } from "../constants";
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import Footer from '../components/Footer'
import  Header  from "../components/Header";
import TextInput from '../components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("screen");

const PersonSearch = ({ navigation }: { navigation: any }) => {
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
        console.log(response.data);
        SetUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function SendFriendRequest(userid:any) {
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

  async function CancelFriendRequest(userid:any) {
    let tempfriendrequestid;
    for (let i = 0; i < user.friendrequests_sent_data.length; i++) {
      if (user.friendrequests_sent_data[i].recieved_user == userid) {
        tempfriendrequestid = user.friendrequests_sent_data[i]._id
      }
    }
    axios.post(`${api}/api/user/deletesentfriendrequest`, { userid: user._id, friendrequestid: tempfriendrequestid })
      .then(response => {
        axios.post(`${api}/api/user/deleterecievedfriendrequest`, { userid: userid, friendrequestid: tempfriendrequestid })
          .then(response => {
            axios.post(`${api}/api/friendrequest/remove/${tempfriendrequestid}`)
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
    console.log({ userid: userid, friendrequestid: tempfriendrequestid })
  }

  async function onuserclick(userid1:any) {
    navigation.navigate('Profile', { userid: userid1, })
  }

  function isuseralreadyfriendrequested(userid:any) { //states= {0=no friend whatsoever,1=i requested friend,2=he requested friend,3=already friends(unfriend)}
    if (user.friendrequests_sent_data.some(( friendrequest_sent_data ) => friendrequest_sent_data.recieved_user === userid)) {
      return 1;
    }
    if (user.friendrequests_recieved_data.some(( friendrequest_recieved_data ) => friendrequest_recieved_data.send_user === userid)) {
      return 2;
    }
    if (/*user.friends.some(friend=>friend._id===userid)*/false) {
      return 3;
    }
    return 0;
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
                {isuseralreadyfriendrequested(item._id) == 0 ? //more than true/false.. write down states!!!
                  <Button
                    ButonLabel="Add Friend"
                    Width={80}
                    OnClick={()=>SendFriendRequest(item._id)}
                  />
                  : isuseralreadyfriendrequested(item._id) == 1 ?
                    <Button
                      ButonLabel="Cancel Request"
                      Width={80}
                      OnClick={()=>CancelFriendRequest(item._id)}
                    />
                    : isuseralreadyfriendrequested(item._id) == 2 ?
                      <Button
                        ButonLabel="Accept Request"
                        Width={80}
                        OnClick={()=>null}
                      /*onPress={AcceptFriendRequest(item._id)}*/
                      />
                      : isuseralreadyfriendrequested(item._id) == 3 ?
                        <Button
                          ButonLabel="Unfriend"
                          Width={80}
                          OnClick={()=>null}
                        /*onPress={UnFriend(item._id)}*/
                        />
                        : null}
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
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
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
    </SafeAreaView>
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
