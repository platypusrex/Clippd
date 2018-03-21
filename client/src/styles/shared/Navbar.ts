import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export const sharedNavbar = StyleSheet.create({
  navWrapper: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#efefef',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#9a9a9a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  navInnerWrapper: {
    flexDirection: 'row'
  },
  titleWrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: '800',
    fontSize: 18,
  },
  leftButton: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  rightButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#108ee9'
  },
});

export const androidNavbar = StyleSheet.create({
  navWrapper: {
    height: 50,
    marginTop: Constants.statusBarHeight
  },
  navInnerWrapper: {},
  buttonIcon: {}
});

export const iosNavbar = StyleSheet.create({
  navWrapper: {
    height: 90,
  },
  navInnerWrapper: {
    marginTop: 30
  },
  buttonIcon: {
    top: 2
  },
});