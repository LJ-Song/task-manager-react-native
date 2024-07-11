import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';

const addTask = () => {
  const [value, setValue] = useState(0);
  return (
    <View>
      <Text> Add your new task today </Text>
      <View>
        <TextInput placeholder="Title" />
        <TextInput/>
        <TextInput placeholder="Description" style= {{ flex: 1 }}/>
        <TextInput/>
      </View>
    </View>
  );
};
export default addTask;