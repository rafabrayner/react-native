import * as Yup from 'yup';
import {Formik} from 'formik';

import React, {Component, Fragment} from 'react';
import {TextInput, Text, Button, Switch, View} from 'react-native';
import styles from './styles';
import {Todo} from './../../models/todo';

export default class TodoForm extends Component<{
  todo?: Todo;
  onSubmit: (description: string, done: boolean) => void;
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
        onSubmit={(values) =>
          this.props.onSubmit(values.description, values.done)
        }
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
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={() => setFieldValue('done', !values.done)}
                value={values.done}
              />
              <Text style={styles.switchText}>
                {values.done ? 'SIM' : 'NÃO'}
              </Text>
            </View>

            <View style={styles.primaryButton}>
              <Button
                color={'#FFF'}
                title={id ? 'Atualizar' : 'Criar'}
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          </Fragment>
        )}
      </Formik>
    );
  }
}