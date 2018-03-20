import * as React from 'react';
import { CustomText } from './CustomText';

interface Props {
  children: string;
  style?: {},
  weight?: 'regular' | 'medium' | 'bold' | 'extra-bold' | 'black';
}

export const H1: React.SFC<Props> = (props) => {
  const {children, style, weight} = props;
  const defaultStyles = {fontSize: 20, ...style};
  const fontWeight = weight ? weight : 'medium';

  return (
    <CustomText weight={fontWeight} style={defaultStyles}>{children}</CustomText>
  );
};