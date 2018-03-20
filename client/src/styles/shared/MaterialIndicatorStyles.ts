import { StyleSheet } from 'react-native';

export const materialIndicatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
