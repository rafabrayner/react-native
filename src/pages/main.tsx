import React, {Component} from 'react';
import api from '../services/api';

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

export default class Main extends Component<any> {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    const response = await api.get('');
    const todos = response.data;
    this.setState({todos});
  };

  renderTodo = ({item}: any) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.description}</Text>
      <Text style={styles.postDescription}>{item.done}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    this.props.navigation.setOptions({title: 'Updated!'});
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todos}
          keyExtractor={(todo: any) => todo._id}
          renderItem={this.renderTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  postContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#FFF',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    color: '#666',
  },
});
