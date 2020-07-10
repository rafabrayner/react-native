import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import Loading from './../../components/loading';
import todoRepository from './../../repositories/todoRepository';
import {Todo} from '../../models/todo';
import {RootStackParamList} from './../../routes';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TodoForm from './../../components/todoForm';

type TodoDetailScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;
type TodoDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TodoDetail'
>;

const TodoDetail = ({
  navigation,
  route,
}: {
  navigation: TodoDetailScreenNavigationProp;
  route: TodoDetailScreenRouteProp;
}) => {
  const [todo, setTodo] = useState<Todo>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const todoId =
    route.params && route.params.todoId ? route.params.todoId : undefined;

  useEffect(() => {
    loadTodo();
  }, []);

  async function loadTodo() {
    try {
      if (todoId) {
        setLoading(true);
        const todoResult = await todoRepository.getById(todoId);
        console.log('RESULTADO: ', todoResult);
        setTodo(todoResult);
      }
    } catch (error) {
      console.error(error);
      setTodo(null);
    } finally {
      setLoading(false);
    }
  }

  async function onFormSubmit(description: string, done: boolean) {
    let alertTitle = '',
      alertMessage = '';
    try {
      let todoResponse: Todo;
      if (todo && todo._id) {
        todoResponse = await todoRepository.update(todo._id, {
          description,
          done,
        });
        alertMessage = 'Tarefa Atualizada com Sucesso';
      } else {
        todoResponse = await todoRepository.create({description, done});
        alertMessage = 'Tarefa Criada com Sucesso';
      }
      alertTitle = 'Sucesso';
      setTodo(todoResponse);
    } catch (error) {
      alertTitle = 'Error';
      alertMessage = 'Não foi possível realizar a requisição';
      console.error(error);
    } finally {
      Alert.alert(alertTitle, alertMessage, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TodoList'),
        },
      ]);
    }
  }

  function renderTodo(todoItem) {
    return (
      <View>
        <TodoForm todo={todoItem} onSubmit={onFormSubmit} />
      </View>
    );
  }

  // this.props.navigation.setOptions({title: 'Updated!'}); // Muda navigation title em tempo real
  return loading ? <Loading /> : renderTodo(todo);
};

export default TodoDetail;
