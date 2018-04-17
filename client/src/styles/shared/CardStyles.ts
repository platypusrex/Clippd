import { StyleSheet } from 'react-native';
import { borderLight } from '../variables/colors';

export const cardStyles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 290,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  bodyWrapper: {
    padding: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: borderLight,
    borderStyle: 'solid',
  }
});

export const fullImageCardStyles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    borderRadius: 5
  },
  bodyWrapper: {
    ...StyleSheet.absoluteFillObject,
    marginLeft: -1,
    zIndex: 100,
    padding: 15
  }
});