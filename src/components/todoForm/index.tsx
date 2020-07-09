import * as Yup from 'yup';
import {Formik} from 'formik';

import React, {Component, Fragment} from 'react';
import {TextInput, Text, Button, Alert, Switch} from 'react-native';
import styles from './styles';
import {Todo} from './../../models/todo';

export default class TodoForm extends Component<{
  todo?: Todo;
  navigation: any;
}> {
  todoValidationSchema() {
    return Yup.object().shape({
      description: Yup.string().min(1).required(),
      done: Yup.boolean().required(),
    });
  }

  render() {
    const todo = this.props.todo;
    let id = null,
      description = '',
      done = false;
    if (todo) {
      id = todo._id;
      description = todo.description;
      done = todo.done;
    }
    return (
      <Formik
        initialValues={{description, done}}
        onSubmit={() => {
          Alert.alert('Sucesso', 'Evento salvo!', [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('TodoList'),
            },
          ]);
        }}
        validationSchema={this.todoValidationSchema()}>
        {({
          values,
          handleChange,
          setFieldValue,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <Fragment>
            <TextInput
              style={styles.input}
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              placeholder="Descrição"
            />
            {touched.description && errors.description &&
              <Text style={styles.inputFormError}>
                {'A descrição é obrigatória'}
              </Text>
            }
            <Text>{'Finalizado: '}</Text>
            <Switch
              onValueChange={() => setFieldValue('done', !values.done)}
              value={values.done}
            />
            <Button
              title={id ? 'Atualizar' : 'Criar'}
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </Fragment>
        )}
      </Formik>
    );
  }
}