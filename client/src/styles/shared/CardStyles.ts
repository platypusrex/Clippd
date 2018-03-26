import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderStyle: 'solid',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#9a9a9a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 290,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  bodyWrapper: {
    padding: 15
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