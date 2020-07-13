import {StyleSheet} from 'react-native';
import colors from './../../styles/colors';

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
    marginBottom: 10,
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateButton: {
    padding: 10,
    backgroundColor: colors.primary,
    marginEnd: 10,
  },
  removeButton: {
    padding: 10,
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default styles;
