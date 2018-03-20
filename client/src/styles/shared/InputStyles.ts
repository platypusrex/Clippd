import { StyleSheet } from 'react-native';
import * as colors from '../variables/colors';
import { regular } from '../variables/fonts';

export const inputStyles = StyleSheet.create({
  inputWrapper: {
    height: 80,
    marginBottom: 10,
    width: '100%'
  },
  input: {
    borderColor: colors.borderLight,
    borderWidth: 1,
    height: 60,
    fontSize: 14,
    color: colors.textDark,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    fontFamily: regular
  },
  textArea: {
    height: 125,
    textAlignVertical: 'top'
  },
  inputError: {
    color: colors.danger,
    position: 'absolute',
    bottom: 0,
    left: 0
  }
});