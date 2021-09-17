import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import axios from 'axios'
import { AsyncStorage } from 'react-native';

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>
    )
  }

  async Getuserbytoken() {
    try {
      var gettoken = await AsyncStorage.getItem('user_id_token')
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    axios.post(`https://guy-react-native-backend.herokuapp.com/api/getuserbyid`, {userid:gettoken})
      .then(response => {
        console.log(response.data);
        this.setState({...this.state,
          message2: response.data.name,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    return axios.get("https://guy-react-native-backend.herokuapp.com/dreamforce")
      .then((response) => {
        this.setState({...this.state,
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
      <>
        <Block flex center style={styles.home}>
          <Text>{this.state.message}</Text>
          <Text>Hello,{this.state.message2}</Text>
          {this.renderArticles()}
        </Block>
      </>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
