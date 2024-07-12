import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';

const data = {
  daily: [
    { id: '1', name: 'Alice', score: 30 },
    { id: '2', name: 'Bob', score: 25 },
    { id: '3', name: 'Charlie', score: 20 },
  ],
  weekly: [
    { id: '1', name: 'David', score: 75 },
    { id: '2', name: 'Eve', score: 70 },
    { id: '3', name: 'Frank', score: 65 },
  ],
  monthly: [
    { id: '1', name: 'Grace', score: 100 },
    { id: '2', name: 'Heidi', score: 95 },
    { id: '3', name: 'Ivan', score: 90 },
  ],
};

const Leaderboard = ({navigation}) => {
  const [filter, setFilter] = useState('daily');

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  const handleBackButton = () => {
    navigation.navigate('TaskPage');
  }

  return (
    <View style={styles.leaderboardContainer}>
      <TouchableOpacity 
        style={styles.addButton} 
        // To be implemented
        onPress={handleBackButton}> 
        <Text style={styles.addButtonText}> 
            Back to Task
        </Text> 
      </TouchableOpacity> 
      <Text style={styles.title}>Winners</Text>
      <View style={styles.buttonContainer}>
        <Button title="Daily" onPress={() => setFilter('daily')} />
        <Button title="Weekly" onPress={() => setFilter('weekly')} />
        <Button title="Monthly" onPress={() => setFilter('monthly')} />
      </View>
      <FlatList
        data={data[filter]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#fff', 
    padding: 25, 
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: { 
    backgroundColor: "green", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
  }, 
  addButtonText: { 
    color: "white", 
    fontWeight: "bold", 
    textAlign: "left", 
    fontSize: 18, 
}, 
});

export default Leaderboard;

