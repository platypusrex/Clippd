import { StyleSheet } from 'react-native';
import * as colors from '../variables/colors';
import { medium } from '../variables/fonts';

export const buttonStyles = StyleSheet.create({
  full: {
    width: '100%'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingRight: 15,
    paddingLeft: 15
  },
  small: {
    height: 40
  },
  large: {
    height: 50
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disableBorder,
    borderWidth: 1,
    borderRadius: 3
  },
  default: {
    backgroundColor: '#fff',
    borderColor: colors.borderDark,
    borderWidth: 1,
    borderRadius: 3
  },
  primary: {
    backgroundColor: colors.primary
  },
  warning: {
    backgroundColor: colors.warning
  },
  danger: {
    backgroundColor: colors.danger
  },
  success: {
    backgroundColor: colors.success
  },
  defaultClear: {
    borderWidth: 0,
    borderColor: 'transparent'
  },
  primaryClear: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 3
  },
  warningClear: {
    backgroundColor: '#fff',
    borderColor: colors.warning,
    borderWidth: 1,
    borderRadius: 3
  },
  dangerClear: {
    backgroundColor: '#fff',
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 3
  },
  successClear: {
    backgroundColor: '#fff',
    borderColor: colors.success,
    borderWidth: 1,
    borderRadius: 3
  },
  text: {
    fontSize: 16,
    fontFamily: medium
  },
  textColor: {
    color: '#fff'
  },
  disabledTextColor: {
    color: colors.textLight
  },
  defaultTextColor: {
    color: colors.textDark
  },
  primaryTextColor: {
    color: colors.primary
  },
  warningTextColor: {
    color: colors.warning
  },
  dangerTextColor: {
    color: colors.danger
  },
  successTextColor: {
    color: colors.success
  }
});