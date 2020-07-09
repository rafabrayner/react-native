import React from 'react';
import styles from './styles';
import {View, Text} from 'react-native';

const Loading = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingMessage}>Loading...</Text>
  </View>
);

export default Loading;
