import * as React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { authHeaderStyles } from '../../styles/shared/AuthHeader';

interface Props {
  title: string;
  subTitle: string;
}

export const AuthHeader: React.SFC<Props> = (props) => (
  <View style={authHeaderStyles.wrapper}>
    <Text weight="black" style={authHeaderStyles.subTitle}>{props.subTitle.toUpperCase()}</Text>
    <Text weight="black" style={authHeaderStyles.title}>{props.title}</Text>
  </View>
);