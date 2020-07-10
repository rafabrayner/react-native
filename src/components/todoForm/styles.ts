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
  },
  input: {
    height: 40,
    borderWidth: 0.7,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
  inputFormError: {
    fontSize: 10,
    color: 'red',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchText: {
    marginStart: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    alignContent: 'center',
  },
});

export default styles;
