import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback,View,Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

 type CardProps = {
  item: { title: string; image: string; cta: string; };
}

export default function Card ({ item }: CardProps){
  const navigation=useNavigation();

    return (
      <View style={{flex:1}}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <View style={{flex:1}} >
             <Image source={{uri: item.image}} style={styles.fullImage} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <View style={styles.cardDescription}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    flex:1,
    justifyContent:'space-between'
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 350
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});