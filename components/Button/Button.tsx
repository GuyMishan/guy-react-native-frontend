import React, { memo } from 'react';
import styles from './ButtonStyle';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../constants/newTheme';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.surface },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);


export default memo(Button);