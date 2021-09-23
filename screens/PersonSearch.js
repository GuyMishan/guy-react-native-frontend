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

const { width, height } = Dimensions.get("screen");

const PersonSearch = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]); //users
  const [masterDataSource, setMasterDataSource] = useState([]); //users

  async function onaddfriendclick(userid) {
  console.log("addfriend: "+userid);
  }

  async function onuserclick(userid) {
    //console.log("userclick: "+userid);
    try {
      await AsyncStorage.removeItem('profile_user_id')
  } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
  }
    try {
      await AsyncStorage.setItem('profile_user_id',userid)
  } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
  }
  navigation.navigate('Profile')
    }

  function Item({ item }) {
    return (
      <>
          <TouchableOpacity style={styles.listItem} onPress={() => onuserclick(item._id)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <Image source={{ uri: Images.ProfilePicture }} style={{ width: 60, height: 60, borderRadius: 30 }} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
            <GaButton color="info" style={{ width: '80%', height: '40%' }} onPress={() => onaddfriendclick(item._id)}>
              <Text bold>
                Add Friend
            </Text>
            </GaButton>
          </View>
          </TouchableOpacity>
        <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
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
  }, [])

  return (
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
        {search.length>=2 ? 
        <FlatList
          style={{ flex: 1 }}
          data={filteredDataSource}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item._id}
        />:null}
        
      </SafeAreaView>
      <Footer navigation={navigation} />
    </View>
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
