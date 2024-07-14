import { Timestamp, collection, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../config/firebase';


// const data = {
//   // daily: [
//   //   { id: '1', name: 'Alice', score: 30 },
//   //   { id: '2', name: 'Bob', score: 25 },
//   //   { id: '3', name: 'Charlie', score: 20 },
//   // ],
//   // weekly: [
//   //   { id: '1', name: 'David', score: 75 },
//   //   { id: '2', name: 'Eve', score: 70 },
//   //   { id: '3', name: 'Frank', score: 65 },
//   // ],
//   // monthly: [
//   //   { id: '1', name: 'Grace', score: 100 },
//   //   { id: '2', name: 'Heidi', score: 95 },
//   //   { id: '3', name: 'Ivan', score: 90 },
//   // ],
// };

const Leaderboard = ({navigation}) => {
  const [filter, setFilter] = useState('daily');
  const [tasks, setTasks] = useState({daily: [], weekly: [], monthly: []});
  const [loading, setLoading] = useState(false);

  // const [daily, setDaily] = useState([]);
  // const [weekly, setWeekly] = useState([]);
  // const [monthly, setMonthly] = useState([]);
  const currentUser = FIREBASE_AUTH.currentUser;
  const now = new Date();
  
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
    console.log('In the leaderboard first');
    if (currentUser != null) {
      console.log('In the leaderboard after auth');
        setLoading(true);
        // const taskRef = collection(FIRESTORE_DB, 'Tasks');

          const _oneMonthAgo = new Date(now);
          _oneMonthAgo.setMonth(_oneMonthAgo.getMonth() - 1);
          const oneMonthAgo = Timestamp.fromDate(_oneMonthAgo);
          const oneMonthOldQuery = query(collection(FIRESTORE_DB, 'Tasks'), 
            where('completed', '==', true), 
            where('time_completed', '>=', oneMonthAgo));
          
          // Add snapshot listener on the query
          const subscriber = onSnapshot(oneMonthOldQuery, (monthQuerySnapshot) => {
            console.log('In the leaderboard Inside the subscriber')
            // const dayQuerySnapshot = getDocs(oneDayOldQuery);
            const currentMonthly = []
            console.log('Daily')
            monthQuerySnapshot.forEach((doc) => {
            const findUser = currentMonthly.find((user) => user.uid === doc.data().uid);
            console.log(findUser);
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
        // console.log(doc.id, " => ", doc.data());
        console.log(doc.data().uid);
        console.log(currentMonthly);
      });
      // const updateMonthly = { ...tasks};
      // updateMonthly["monthly"] = currentMonthly;

      // setTasks( tasks => ({
      //   ...updateMonthly
      // }))
      const updatedValue = {
        monthly: currentMonthly
      }

      setTasks(tasks => ({
        ...tasks, 
        ...updatedValue
      }));
      setLoading(false);
        });
          return () => subscriber();
        }
    }, []);

  // Update weekly. 
  useEffect(() => {
    console.log('In the leaderboard first');
    if (currentUser != null) {
      console.log('In the leaderboard after auth');
        setLoading(true);
        // const taskRef = doc(FIRESTORE_DB, 'Tasks');



          const _oneWeekAgo = new Date(now);
          _oneWeekAgo.setDate(_oneWeekAgo.getDate() - 7);
          const oneWeekAgo = Timestamp.fromDate(_oneWeekAgo);
          console.log('One week', _oneWeekAgo);

          // Query for documents one week old
          const oneWeekOldQuery = query(collection(FIRESTORE_DB, 'Tasks'), 
              where('time_completed', '>=', oneWeekAgo));
    
          // Add snapshot listener on the query
          const subscriber = onSnapshot(oneWeekOldQuery, (weekQuerySnapshot) => {
            console.log('In the leaderboard Inside the subscriber')
            // const dataSets = {};
    
          // const dayQuerySnapshot = getDocs(oneDayOldQuery);
          const currentWeekly = []
          console.log('Weekly')
          weekQuerySnapshot.forEach((doc) => {
            const findUser = currentWeekly.find((user) => user.uid === doc.data().uid);
            console.log(findUser);
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
            // console.log(doc.id, " => ", doc.data());
            console.log(doc.data().uid);
            console.log(currentWeekly);
          });
            // const updateWeekly = { ...tasks};
            // updateWeekly["weekly"] = currentWeekly;

            // setTasks( tasks => ({
            // ...updateWeekly
            // }));
            const updatedValue = {
              weekly: currentWeekly
            }

            setTasks(tasks => ({
              ...tasks, 
              ...updatedValue
            }));

        }); 
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
      console.log("one day: ", oneDayAgo);

      const taskRef = collection(FIRESTORE_DB, 'Tasks');

      // Query for documents one day old
      const oneDayOldQuery = query(taskRef, 
          where('time_completed', '>=', oneDayAgo));

      // Add snapshot listener on the query
      const subscriber = onSnapshot(oneDayOldQuery, (dayQuerySnapshot) => {
        console.log('In the leaderboard Inside the subscriber')
        // const dataSets = {};

      // const dayQuerySnapshot = getDocs(oneDayOldQuery);
      const currentDaily = []
      console.log('Daily')
      dayQuerySnapshot.forEach((doc) => {
        const findUser = currentDaily.find((user) => user.uid === doc.data().uid);
        console.log(findUser);
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
        // console.log(doc.id, " => ", doc.data());
        console.log(doc.data().uid);
        console.log(currentDaily);
      });
      // const updateDaily = { ...tasks};
      // updateDaily["daily"] = currentDaily;

      // setTasks( tasks => ({
      //   ...updateDaily
      // }));
      const updatedValue = {
        daily: currentDaily
      }

      setTasks(tasks => ({
        ...tasks, 
        ...updatedValue
      }));
      // ***********************************************************//

      setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
    }
}, []);


    // const getLeaderboard = async () => {
    //   const dataSets = {};
    //   console.log('In the get Documents');
    //   // Determine whether a key is present in the object. 
    // //   const get = (object, key, default_value) => {
    // //     var result = object[key];
    // //     return (typeof result !== "undefined") ? result : default_value;
    // // }
    // // const nameMap = {}

    // // // Count the frequencies of a uid. 
    // // const frequencies = arr =>
    // //     arr.reduce((a, v) => {
    // //       a[v] = (a[v] ?? 0) + 1;
    // //       return a;
    // //     }, {});

        
    //     const now = new Date();

    //     // Calculate the timestamps for one day, one week, and one month ago
    //     const _oneDayAgo = new Date(now);
    //     _oneDayAgo.setDate(_oneDayAgo.getDate() - 1);
    //     const oneDayAgo = Timestamp.fromDate(_oneDayAgo);
    //     console.log("one day: ", oneDayAgo);
  
    //     const _oneWeekAgo = new Date(now);
    //     _oneWeekAgo.setDate(_oneWeekAgo.getDate() - 7);
    //     const oneWeekAgo = Timestamp.fromDate(_oneWeekAgo);
    //     console.log('One week', _oneWeekAgo);
  
    //     const _oneMonthAgo = new Date(now);
    //     _oneMonthAgo.setMonth(_oneMonthAgo.getMonth() - 1);
    //     const oneMonthAgo = Timestamp.fromDate(_oneMonthAgo);
        
    //     // const tasksRef = collection(FIRESTORE_DB, "Tasks");
        


    //     // Query for documents one day old
    //     const oneDayOldQuery = await query(collection(FIRESTORE_DB, "Tasks"), 
    //         where('time_completed', '>=', oneDayAgo));

    //     const dayQuerySnapshot = await getDocs(oneDayOldQuery);
    //     const currentDaily = []
    //     console.log('Daily')
    //     dayQuerySnapshot.forEach((doc) => {
    //       // if (get(nameMap, doc.data().uid, -1) === -1) {
    //       //   nameMap[doc.data().uid] = doc.data().username;
    //       // }
    //       // currentDaily.push({

    //       // });
    //       const findUser = currentDaily.find((user) => user.uid === doc.data().uid);
    //       console.log(findUser);
    //       if ( findUser === undefined) {
    //         currentDaily.push({
    //           uid: doc.data().uid, 
    //           username: doc.data().username, 
    //           count: 1
    //         })
    //       }
    //       else {
    //         findUser["count"] += 1;
    //       }
    //       // console.log(doc.id, " => ", doc.data());
    //       console.log(doc.data().uid);
    //       console.log(currentDaily);

    //       // console.log(doc.uid);
    //         // if (doc.uid in currentDaily) {
    //         //     currentDaily[doc.uid] += 1;
    //         // }
    //         // else {
    //         //     currentDaily[doc.uid] = 1;
    //         // }
    //     });

    //     // console.log('Daily');

        
    //     // console.log('One Day Old:', oneDayOldQuery.docs.map(doc => doc.data()));
    //     // const dayQuery = oneDayOldQuery.docs.map(doc => doc.data());

    //     // Query for documents one week old
    //     const oneWeekOldQuery = await query(collection(FIRESTORE_DB, "Tasks"), 
    //         where('completed', '==', true), 
    //         where('time_completed', '>=', oneWeekAgo));

    //     // console.log('One Week Old:', oneWeekOldQuery.docs.map(doc => doc.data()));
    //     // const weekQuery = oneWeekOldQuery.docs.map(doc => doc.data());
    //     const weekQuerySnapshot = await getDocs(oneWeekOldQuery);
    //     const currentWeekly = []
    //     console.log('Weekly')
    //     weekQuerySnapshot.forEach((doc) => {
    //       const findUser = currentWeekly.find((user) => user.uid === doc.data().uid);
    //       if ( findUser === undefined) {
    //         currentWeekly.push({
    //           uid: doc.data().uid, 
    //           username: doc.data().username, 
    //           count: 1
    //         })
    //       }
    //       else {
    //         findUser["count"] += 1;
    //       }
    //       // console.log(doc.id, " => ", doc.data());
    //       console.log(doc.data().uid);
    //       console.log(currentWeekly);
    //       // if (get(nameMap, doc.data().uid, -1) === -1) {
    //       //   nameMap[doc.data().uid] = doc.data().username;
    //       // }
    //       // currentWeekly.push(doc.data().uid);
    //       // console.log(doc.data().uid);
    //       // console.log(doc.id, " => ", doc.data());
    //       // if (doc.uid in currentWeekly) {
    //         //     currentWeekly[doc.uid] += 1;
    //         // }
    //         // else {
    //         //     currentWeekly[doc.uid] = 1;
    //         // }
    //     });
    //     // console.log("Weekly", currentWeekly);

    //     // Query for documents one month old
    //     const oneMonthOldQuery = await query(collection(FIRESTORE_DB, "Tasks"), 
    //         where('completed', '==', true), 
    //         where('time_completed', '>=', oneMonthAgo));
    //     // console.log('One Month Old:', oneMonthOldQuery.docs.map(doc => doc.data()));
    //     // const monthQuery = oneMonthOldQuery.docs.map(doc => doc.data());

    //     const monthQuerySnapshot = await getDocs(oneMonthOldQuery);
    //     const currentMonthly = []
    //     console.log('Monthly')
    //     monthQuerySnapshot.forEach((doc) => {
    //       const findUser = currentMonthly.find((user) => user.uid === doc.data().uid);
    //       if ( findUser === undefined) {
    //         currentMonthly.push({
    //           uid: doc.data().uid, 
    //           username: doc.data().username, 
    //           count: 1
    //         })
    //       }
    //       else {
    //         findUser["count"] += 1;
    //       }
    //       // console.log(doc.id, " => ", doc.data());
    //       console.log(doc.data().uid);
    //       console.log(currentMonthly);
    //       // if (get(nameMap, doc.data().uid, -1) === -1) {
    //       //   nameMap[doc.data().uid] = doc.data().username;
    //       // }
    //       // currentMonthly.push(doc.data().uid);
    //       // console.log(doc.data().uid);
    //       // console.log(doc.id, " => ", doc.data());
    //       // if (doc.uid in currentMonthly) {
    //         //     currentMonthly[doc.uid] += 1;
    //         // }
    //         // else {
    //         //     currentMonthly[doc.uid] = 1;
    //         // }
    //     });

    //     currentDaily.sort((a, b) => b.count - a.count);
    //     currentWeekly.sort((a, b) => b.count - a.count);
    //     currentMonthly.sort((a, b) => b.count - a.count);

    //     dataSets["daily"] = currentDaily;
    //     dataSets["weekly"] = currentWeekly;
    //     dataSets["monthly"] = currentMonthly;
    //     console.log(dataSets);
    //     // console.log(dataSets);
    //     // console.log(nameMap);
    //     setTasks(dataSets);
    // };


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

