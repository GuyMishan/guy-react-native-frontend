import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Button from "../components/Button/Button";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import Footer from '../components/Footer'

import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import { useIsFocused } from '@react-navigation/native'
import { Header } from "../components";
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function Profile({ route }: any) {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const [user, SetUser] = useState<any>([])

  async function Getuserbytoken() {
    let tempid = route.params.userid;
    axios.post(`${api}/api/getuserbyid`, { userid: tempid })
      .then(response => {
        SetUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    Getuserbytoken()
    console.log(route)
  }, [isFocused, route, navigation])

  return (
    <SafeAreaView style={{ flex: 0, justifyContent: 'center' ,  alignSelf : 'center'}}>
      <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              <Image
                source={{ uri: Images.ProfilePicture }}
                style={styles.avatar}
              />
            </Block>
            <Block style={styles.info}>
              <Block
                middle
                row
                space="evenly"
                style={{ marginTop: 20, paddingBottom: 24 }}
              >
                <TouchableOpacity>
                  <Button ButonLabel="CONNECT" Width={130} OnClick={()=>null}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Button ButonLabel="MESSAGE" Width={130} OnClick={()=>null}/>
                </TouchableOpacity>
              </Block>
              <Block row space="between">
                <Block middle>
                  <Text
                    bold
                    size={18}
                    color="#525F7F"
                    style={{ marginBottom: 4 }}
                  >
                    2K
                      </Text>
                  <Text size={12} color={argonTheme.COLORS.PRIMARY}>Orders</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    color="#525F7F"
                    size={18}
                    style={{ marginBottom: 4 }}
                  >
                    10
                      </Text>
                  <Text size={12} color={argonTheme.COLORS.PRIMARY}>Photos</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    color="#525F7F"
                    size={18}
                    style={{ marginBottom: 4 }}
                  >
                    89
                      </Text>
                  <Text size={12} color={argonTheme.COLORS.PRIMARY}>Comments</Text>
                </Block>
              </Block>
            </Block>
            <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  {user.name}
                </Text>
                <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                  {user.email}
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>
                <Text
                  size={16}
                  color="#525F7F"
                  style={{ textAlign: "center" }}
                >
                  An artist of considerable range, Jessica name taken by
                  Melbourne
                    </Text>
              </Block>
              <Block
                row
                space="between"
              >
                <Text bold size={16} color="#525F7F" style={{ marginTop: 12 }}>
                  Album
                    </Text>
              </Block>
              <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                <Block row space="between" style={{ flexWrap: "wrap" }}>
                  {Images.Viewed.map((img, imgIndex) => (
                    <Image
                      source={{ uri: img }}
                      key={`viewed-${img}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))}
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
        <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme?.SIZES?.BASE,
    marginHorizontal: theme?.SIZES?.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme?.COLORS?.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  articles: {
    flexGrow: 1,
    justifyContent: 'center',
    // width: width - theme.SIZES.BASE * 2,
    // paddingVertical: theme.SIZES.BASE,
  },
});

export default Profile;
