import { Timestamp, collection, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../config/firebase';

const Leaderboard = ({navigation}) => {
  // Set up initial state for filtering which user to show. 
  const [filter, setFilter] = useState('daily');
  // Store the leaderboard data. 
  const [tasks, setTasks] = useState({daily: [], weekly: [], monthly: []});
  // Set the loading state. 
  const [loading, setLoading] = useState(false);

  const currentUser = FIREBASE_AUTH.currentUser;
  const now = new Date();
  
  // Render the leaderboard view based on the filter. 
  const renderItem = ({ item }) => {
    
    return (
    <View style={styles.item}>
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.score}>{item.count}</Text>
    </View>
  )};
  
  const handleBackButton = () => {
    navigation.navigate('TaskPage');
  }

  // Update monthly. 
  useEffect(() => {
    if (currentUser != null) {
      setLoading(true);
              
      const _oneMonthAgo = new Date(now);
      
      // Create a date object that's a month away from now. 
      _oneMonthAgo.setMonth(_oneMonthAgo.getMonth() - 1);
      // Convert to Firebase timestamp. 
      const oneMonthAgo = Timestamp.fromDate(_oneMonthAgo);
      
      // Query the month old users. 
      const oneMonthOldQuery = query(collection(FIRESTORE_DB, 'Tasks'), 
        where('completed', '==', true), 
        where('time_completed', '>=', oneMonthAgo));

      // Add snapshot listener on the query
      const subscriber = onSnapshot(oneMonthOldQuery, (monthQuerySnapshot) => {
        console.log('In the leaderboard Inside the subscriber')
        // Create an array to store the leaderboard data. 
        const currentMonthly = []
        
        // Reading data from the query. 
        monthQuerySnapshot.forEach((doc) => {
        const findUser = currentMonthly.find((user) => user.uid === doc.data().uid);
        // Store data to the monthly leaderboard data list. 
        if ( findUser === undefined) {
          currentMonthly.push({
            uid: doc.data().uid, 
            username: doc.data().username, 
            count: 1
          })
        }
        else {
          findUser["count"] += 1;
        }
      });
      // Sort the data. 
      currentMonthly.sort((a, b) => b.count - a.count);
      const updatedValue = {
        monthly: currentMonthly
      }
      // Update data to the useState
      setTasks(tasks => ({
        ...tasks, 
        ...updatedValue
      }));
      setLoading(false);
        });
        // Unsubscribe from the firestore database. 
          return () => subscriber();
        }
    }, []);

  // Update weekly. 
  useEffect(() => {
    if (currentUser != null) {
      setLoading(true);

        // Create a date object that's a week old. 
      const _oneWeekAgo = new Date(now);
      _oneWeekAgo.setDate(_oneWeekAgo.getDate() - 7);
      const oneWeekAgo = Timestamp.fromDate(_oneWeekAgo);
      console.log('One week', _oneWeekAgo);

      // Query for documents one week old
      const oneWeekOldQuery = query(collection(FIRESTORE_DB, 'Tasks'), 
          where('time_completed', '>=', oneWeekAgo));

      // Add snapshot listener on the query
      const subscriber = onSnapshot(oneWeekOldQuery, (weekQuerySnapshot) => {
      const currentWeekly = []

      // Read data from the query. 
      weekQuerySnapshot.forEach((doc) => {
        const findUser = currentWeekly.find((user) => user.uid === doc.data().uid);
        // Store data to the temperary weekly leaderboard list. 
        if ( findUser === undefined) {
          currentWeekly.push({
            uid: doc.data().uid, 
            username: doc.data().username, 
            count: 1
          })
        }
        else {
          findUser["count"] += 1;
        }
            
          });
          // Sort the weekly array. 
            currentWeekly.sort((a, b) => b.count - a.count);
            const updatedValue = {
              weekly: currentWeekly
            }
            // Update the useState. 
            setTasks(tasks => ({
              ...tasks, 
              ...updatedValue
            }));

        }); 
        // Unsubscribe from the firestore. 
        return () => subscriber();
      }
        
  }, []);

  // Update daily. 
  useEffect(() => {
    console.log('In the leaderboard first');
    if (currentUser != null) {
      console.log('In the leaderboard after auth');
      setLoading(true);

      // Calculate the timestamps for one day, one week, and one month ago
      const _oneDayAgo = new Date(now);
      _oneDayAgo.setDate(_oneDayAgo.getDate() - 1);
      const oneDayAgo = Timestamp.fromDate(_oneDayAgo);

      const taskRef = collection(FIRESTORE_DB, 'Tasks');

      // Query for documents one day old
      const oneDayOldQuery = query(taskRef, 
          where('time_completed', '>=', oneDayAgo));

      // Add snapshot listener on the query
      const subscriber = onSnapshot(oneDayOldQuery, (dayQuerySnapshot) => {
      const currentDaily = []
      dayQuerySnapshot.forEach((doc) => {
        const findUser = currentDaily.find((user) => user.uid === doc.data().uid);
        if ( findUser === undefined) {
          currentDaily.push({
            uid: doc.data().uid, 
            username: doc.data().username, 
            count: 1
          })
        }
        else {
          findUser["count"] += 1;
        }
      });
      currentDaily.sort((a, b) => b.count - a.count);

      const updatedValue = {
        daily: currentDaily
      }

      setTasks(tasks => ({
        ...tasks, 
        ...updatedValue
      }));

      setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
    }
}, []);

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
      <View style={styles.item}>
      <Text style={styles.score}>Username</Text>
      <Text style={styles.score}>Completed</Text>
      </View>

      { loading ? <ActivityIndicator size="large" color="#0000ff"/> :
      <FlatList
          data={tasks[filter]}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> 
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#fff', 
    padding: 25, 
    marginTop: 45
    
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

