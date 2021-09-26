import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
//import {} from '../assets/imgs/argon-logo.png'

type Props = {
  width: number,
  height: number,
};

const Logo = ({width , height }: Props ) => (
  <Image source={require('../assets/icon.png')}  style={{width: width,height: height,marginBottom: 10, marginTop : 10 , alignSelf : 'center' , borderRadius: 45}}  />
);



export default memo(Logo);
