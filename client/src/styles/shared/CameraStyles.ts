import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
  actionBar: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  rotateBtn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerBtnWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  centerBtnOuter: {
    height: 80,
    width: 80,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerBtnInner: {
    height: 65,
    width: 65,
    backgroundColor: '#ccc',
    borderRadius: 50
  },
  flashBtn: {
    flex: 1,
    alignItems: 'flex-end'
  }
});