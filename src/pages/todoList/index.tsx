import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import Loading from './../../components/loading';
import todoRepository from './../../repositories/todoRepository';
import {Todo} from '../../models/todo';
import {RootStackParamList} from './../../routes';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type TodoListScreenRouteProp = RouteProp<RootStackParamList, 'TodoList'>;
type TodoListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TodoList'
>;

const TodoList = ({
  navigation,
  route,
}: {
  navigation: TodoListScreenNavigationProp;
  route: TodoListScreenRouteProp;
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setLoading(true);
      const todosResult = await todoRepository.read();
      setTodos(todosResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function renderTodo({item}: {item: Todo}) {
    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>{item.description}</Text>
        <Text style={styles.todoDescription}>
          {item.done ? 'Finalizado' : 'Em Andamento'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TodoDetail', {todoId: item._id});
          }}>
          <Text>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // this.props.navigation.setOptions({title: 'Updated!'}); // Muda navigation title em tempo real
  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(todo: any) => todo._id}
        renderItem={renderTodo}
      />
    </View>
  );
};

export default TodoList;
