import * as React from 'react';
import { View } from 'react-native';
import { Text } from '../Text';

interface Props {
  title: string | string[];
  titleStyle?: {};
  subTitle?: string | string[];
  subTitleStyle?: {}
}

export const CardHeader: React.SFC<Props> = (props) => {
  const {title, subTitle, titleStyle, subTitleStyle} = props;

  return (
    <View style={{padding: 15, borderBottomWidth: 1, borderBottomColor: '#e9e9e9'}}>
      <Text weight="bold" style={titleStyle}>{title}</Text>
      {subTitle && <Text style={subTitleStyle}>{subTitle}</Text>}
    </View>
  );
};