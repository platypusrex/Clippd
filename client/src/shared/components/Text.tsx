import * as React from 'react';
import { Text as NativeText } from 'react-native';
import * as fonts from '../../styles/variables/fonts';


interface Props {
  children: string;
  style?: {};
  weight?: 'regular' | 'medium' | 'bold' | 'extra-bold' | 'black';
}

export const Text: React.SFC<Props> = (props) => {
  const {children, style, weight} = props;
  const fontWeight = getDefaultFontWeight(weight);

  return (
    <NativeText style={[{fontFamily: fontWeight}, style]}>
      {children}
    </NativeText>
  );
};

function getDefaultFontWeight (weight: string | undefined) {
  switch (weight) {
    case 'regular':
      return fonts.regular;
    case 'medium':
      return fonts.medium;
    case 'bold':
      return fonts.bold;
    case 'extra-bold':
      return fonts.extraBold;
    case 'black':
      return fonts.black;
    default:
      return fonts.regular
  }
}