import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoList from './pages/todoList';
import TodoDetail from './pages/todoDetail';
import colors from './styles/colors';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="TodoList"
      screenOptions={{
        headerStyle: {backgroundColor: colors.theme},
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{title: 'To Do List'}}
      />
      <Stack.Screen
        name="TodoDetail"
        component={TodoDetail}
        options={{title: 'To Do Detail'}}
      />
    </Stack.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  TodoList: undefined;
  TodoDetail: {todoId: string};
};

export default Routes;
