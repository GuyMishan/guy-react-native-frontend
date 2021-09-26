import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../constants/newTheme';

type Props = {
  TextLabel: string
};

const Label = ({ TextLabel }: Props) => (
  <Text style={styles.header}>{TextLabel}</Text>
);

const styles = StyleSheet.create({
  header: {
      
    fontSize: 38,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    marginTop : 24 ,
    alignSelf : 'center'
  },
});

export default memo(Label);
