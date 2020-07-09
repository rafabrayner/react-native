import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loading: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessage: {
    fontSize: 20,
    color: '#eee',
  },
});

export default styles;
