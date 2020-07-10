import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  todoContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#FFF',
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoDescription: {
    color: '#666',
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DA552F',
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
