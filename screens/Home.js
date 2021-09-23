import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import Footer from '../components/Footer'

const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'no message',
      message2: 'no message2'
    }
  }

  renderArticles = () => {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
            <Card item={articles[0]} full />
            <Card item={articles[1]} full />
            <Card item={articles[2]} full />
            <Card item={articles[3]} full />
            <Card item={articles[4]} full />
          </Block>
        </ScrollView>
      </>
    )
  }

  async Getuserbytoken() {
    try {
      var gettoken = await AsyncStorage.getItem('user_id_token')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          message2: response.data.name,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    return axios.get(`${api}/dreamforce`)
      .then((response) => {
        this.setState({
          ...this.state,
          message: response.data.message,
        })
        this.Getuserbytoken()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderArticles()}
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    flexGrow: 1,
    justifyContent: 'center',
    // width: width - theme.SIZES.BASE * 2,
    // paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
