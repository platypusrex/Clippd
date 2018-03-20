import { StyleSheet } from 'react-native';
import * as colors from '../variables/colors';

export const authHeaderStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: '100%',
  },
  title: {
    color: colors.headingDark,
    fontSize: 34,
    lineHeight: 40
  },
  subTitle: {
    color: colors.headingLight,
    fontSize: 14,
  }
});