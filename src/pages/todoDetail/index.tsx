import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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
  const {todoId} = route.params;

  useEffect(() => {
    loadTodo();
  }, []);

  async function loadTodo() {
    try {
      setLoading(true);
      const todoResult = await todoRepository.getById(todoId);
      console.log('RESULTADO: ', todoResult);
      setTodo(todoResult);
    } catch (error) {
      console.error(error);
      setTodo(null);
    } finally {
      setLoading(false);
    }
  }

  function renderTodo(todoItem: Todo) {
    return (
      <View>
        <TodoForm todo={todoItem} navigation={navigation} />
      </View>
    );
  }

  // this.props.navigation.setOptions({title: 'Updated!'}); // Muda navigation title em tempo real
  return todo === undefined || loading ? <Loading /> : renderTodo(todo);
};

export default TodoDetail;
