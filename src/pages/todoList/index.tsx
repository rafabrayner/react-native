import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import styles from './styles';
import Loading from './../../components/loading';
import todoRepository from './../../repositories/todoRepository';
import {Todo} from '../../models/todo';
import {RootStackParamList} from './../../routes';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

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
    // Carrega sempre os valores mais recentes da API quando exibir a página
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodos();
    });
    return unsubscribe;
  }, [navigation]);

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

  async function deleteTodo(todo: Todo, index: number) {
    try {
      setLoading(true);
      await todoRepository.delete(todo._id);
      todos.splice(index, 1);
      setTodos([...todos]);
      return Alert.alert('Sucesso', 'Tarefa removida com sucesso');
    } catch (error) {
      return Alert.alert(
        'Erro',
        'Desculpe, mas não foi possível remover a tarefa',
      );
    } finally {
      setLoading(false);
    }
  }

  function openDeleteAlert(todo: Todo, index: number) {
    return Alert.alert(
      'Deletar Tarefa',
      'Você tem certeza que deseja realmente remover essa tarefa?\nUma vez feito isso não poderá mais ser desfeito.',
      [
        {
          text: 'OK',
          onPress: () => deleteTodo(todo, index),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  function renderTodo(value) {
    const {item, index}: {item: Todo; index: number} = value;
    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>{item.description}</Text>
        <View style={styles.todoDescription}>
          <Text>
            {'Status: ' + (item.done ? 'Finalizado' : 'Em Andamento')}
          </Text>
          <Text>
            {'Criado em: ' + moment(item.createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.updateButton}>
            <Button
              color={'#FFF'}
              title={'Atualizar'}
              onPress={() =>
                navigation.navigate('TodoDetail', {todoId: item._id})
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              openDeleteAlert(item, index);
            }}>
            <Button
              color={'#FFF'}
              title={'Remover'}
              onPress={() => openDeleteAlert(item, index)}
            />
          </TouchableOpacity>
        </View>
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
        keyExtractor={(todo: Todo) => todo._id}
        renderItem={renderTodo}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('TodoDetail')}
        style={styles.fabButton}>
        <Icon name="plus" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;
