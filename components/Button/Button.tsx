import React, { memo } from 'react';
import styles from './ButtonStyle';

import AwesomeButton from "react-native-really-awesome-button";
import { any } from 'prop-types';

type Props = {
  ButonLabel: string ,
  Width : number , 
  OnClick : () => void , 
};


const Button = ({ ButonLabel, Width , OnClick }: Props) => (
  <AwesomeButton
    
    onPress={ () =>  {
      OnClick();
    }
    
    }
    style={styles.button}
    width = {Width}
    textSize =  {18}
  >
  {ButonLabel} 
  </AwesomeButton>
);


export default memo(Button);