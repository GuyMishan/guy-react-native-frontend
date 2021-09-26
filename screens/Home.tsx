import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import Footer from '../components/Footer'
import { Header } from "../components";

const { width } = Dimensions.get('screen');

const Home = () => {

  const renderArticles = () => {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <View style={{ flex: 1 }}>
            <Card item={articles[0]} />
            <Card item={articles[1]} />
            <Card item={articles[2]} />
            <Card item={articles[3]} />
            <Card item={articles[4]} />
          </View>
        </ScrollView>
      </>
    )
  }
  const Getuserbytoken = async () => {
    try {
      var gettoken;
      gettoken = await AsyncStorage.getItem('user_id_token')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
      .then(response => {
        console.log(response.data);
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
      <Header/>
      <View style={{ flex: 1 }}>
        {renderArticles()}
        <Footer/>
      </View>
      </>
    );
  }

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Home;
