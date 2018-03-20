import { StyleSheet } from 'react-native';

export const uiActivityIndicatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
