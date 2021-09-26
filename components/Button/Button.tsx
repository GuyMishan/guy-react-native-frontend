import React, { memo } from 'react';
import styles from './ButtonStyle';

import AwesomeButton from "react-native-really-awesome-button";

type Props = {
  ButonLabel: string ,
  Width : number
};


const Button = ({ ButonLabel, Width }: Props) => (
  <AwesomeButton
    progress={false}
    style={styles.button}
    width = {Width}

    textSize =  {18}
  >
  {ButonLabel} 
  </AwesomeButton>
);


export default memo(Button);