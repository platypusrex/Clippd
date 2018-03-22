import * as React from 'react';
import { Text } from './Text';

interface Props {
  children: string;
  style?: {},
  weight?: 'regular' | 'medium' | 'bold' | 'extra-bold' | 'black';
}

export const H2: React.SFC<Props> = (props) => {
  const {children, style, weight} = props;
  const defaultStyles = {fontSize: 24, ...style};
  const fontWeight = weight ? weight : 'medium';

  return (
    <Text weight={fontWeight} style={defaultStyles}>{children}</Text>
  );
};