import React, { useState, useEffect } from "react"; 
import { Stack, useRouter, Redirect } from 'expo-router';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    ActivityIndicator,
    Alert, 
} from "react-native"; 
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { doc, serverTimestamp, setDoc, collection, addDoc, deleteDoc, updateDoc, increment, onSnapshot } from "firebase/firestore"; 
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import styles  from '../../styles/task.style'
import { 
    addTaskToDB, 
    updateTaskFromDB 
} from '../../utils/task_firestore'



const TaskPage = ( {navigation} ) => { 
    const currentUser = FIREBASE_AUTH.currentUser;
    const [title, setTitle] = useState(""); 
    // const [titles, setTitles] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1); 
    const [loading, setLoading] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);

    const [description, setDescription] = useState(""); 
    // const [descriptions, setDescriptions] = useState([]); 

    const [tasks, setTasks] = useState([]);

    //   // Set an initializing state whilst Firebase connects
    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();

    // // Handle user state changes
    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    // Real time update to fectch data
    useEffect(() => {
        if (currentUser != null) {
            setLoading(true);
            const tasksRef = collection(doc(FIRESTORE_DB, 'Users', currentUser.uid), "tasks");
    
            const subscriber = onSnapshot(tasksRef, {
            next: (snapshot) => {
                const tasks = [];
                snapshot.docs.forEach((doc) => {
                    tasks.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setTasks(tasks);
                setLoading(false);
            }
        });
        // // Unsubscribe from events when no longer in use
        return () => subscriber();
        }
    }, []);

    useEffect(() => {
        if (currentUser != null) {
            setLoading(true);
            const userRef = doc(FIRESTORE_DB, 'Users', currentUser.uid);
    
            const subscriber = onSnapshot(userRef, (doc) => {
            
                // console.log('Completed list of users', doc.data());
            setCompletedCount(doc.data()["completed_task_count"]);
            setLoading(false);
            });
        // // Unsubscribe from events when no longer in use
        return () => subscriber();
        }
    }, []);
    

    const router = useRouter();
    
    // Redirect to leaderboard
    const handleLeaderboard = () => {
        navigation.navigate('Leaderboard');
    }

    const handleSignOut = async () => {
        signOut(FIREBASE_AUTH).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            console.log('Sign out successful');
            alert('Sign out successful');
          }).catch((error) => {
            console.log('Cannot sign out, ' + e);
          });
    }
    // Handles add task related operation. 
    const handleAddTask = async () => { 
        if (! (title)) {
            alert('Please fill in a title');
            return;
        }
        if (! (description)) {
            alert('Please fill in a description');
            return;
        }
        if ((title) && (description)) { 
            if (editIndex != -1) { 
                const updatedTasks = [...tasks];
                const task = updatedTasks[editIndex]["id"];
                setLoading(true);
                // console.log('WOrking id', task["id"]);
                updateTaskFromDB(title, description, task);
                setEditIndex(-1);
                setLoading(false);
            } else { 
                // Add new title 
                try {
                    if (currentUser != null) {
                        setLoading(true);
                        const uid = currentUser.uid;
                        addTaskToDB({title, description, uid});
                        setTitle(""); 
                        setDescription("")
                        setLoading(false);
                    }
                } catch (e) {
                    console.log(e);
                }
                // setTitles([...titles, title]); 
                // setDescriptions([...descriptions, description]); 
            } 
            setTitle(""); 
            setDescription("")
        } 
    }; 
  
    const handleEditTask = (title, description, index) => { 
        setTitle(title);
        setDescription(description);
        // const taskToEdit = titles[index]; 
        // setTitle(taskToEdit); 
        // const descriptionToEdit = descriptions[index]; 
        // setDescription(descriptionToEdit); 
        setEditIndex(index); 
        console.log("Edit Index", editIndex);
    }; 
  
    const handleDeleteTask = async (taskId, completed) => { 
        if ((title) || (description)){
            Alert.alert(
                "Cannot Delete", 
                "Can't delete while editing", 
                [
                    {
                        text:"Back", 
                        style: 'cancel',
                    },
                ], 
                {
                    cancelable: true
                });
        }
        else {
            try {
                if (!completed) {
                    await deleteDoc(doc(FIRESTORE_DB, `Tasks/${taskId}`));
                }
                await deleteDoc(doc(FIRESTORE_DB, `Users/${currentUser.uid}/tasks/${taskId}`));
            } catch (e) {
                console.log('Cannot delete' + e);
            }
        }
        
    }; 
    
    const handleDetail = (title, description) => { 
        // const taskToDisplay = titles[index]; 
        // const descriptionToDisplay = descriptions[index]; 
        Alert.alert(
            title,
            description, 
            [
                {
                    text:"Back", 
                    style: 'cancel',
                },
            ], 
            {
                cancelable: true
            });
    }; 

  
    const renderItem = ({ item, index }) => {
        // console.log('item: ', item);
        // console.log('itemid ', item.id)
        const toggleTrue = async (isChecked) => {
            if (isChecked) {
                await updateDoc(doc(FIRESTORE_DB, `Users/${currentUser.uid}`), {
                    completed_task_count: increment(1)
                });
                await updateDoc(doc(FIRESTORE_DB, `Tasks/${item.id}`), {
                    completed: !item.completed, 
                    time_completed: serverTimestamp()
                });
                await updateDoc(doc(FIRESTORE_DB, `Users/${currentUser.uid}/tasks/${item.id}`), {
                    completed: !item.completed
                });

            } else {
                await updateDoc(doc(FIRESTORE_DB, `Users/${currentUser.uid}`), {
                    completed_task_count: increment(-1)
                });
                await updateDoc(doc(FIRESTORE_DB, `Tasks/${item.id}`), {
                    completed: !item.completed, 
                    time_completed: null
                });
                await updateDoc(doc(FIRESTORE_DB, `Users/${currentUser.uid}/tasks/${item.id}`), {
                    completed: !item.completed
                });
            }
            
        };

        return ( 
        
            <View style={styles.title} borderBottomWidth='thick'> 
            <View style={styles.checkbox}>
            <BouncyCheckbox 
                isChecked={item.completed}
                onPress={(isChecked) => {toggleTrue(isChecked)}}
            />
            <Text style={styles.itemList}>{item.title}</Text> 
            </View>
                
                <View 
                    style={styles.taskButtons}> 
                    <TouchableOpacity 
                        onPress={() => handleDetail(item.title, item.description)}> 
                        <Text 
                            style={styles.detailButton}>Details</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        onPress={() => handleEditTask(item.title, item.description, index)}> 
                        <Text 
                            style={styles.editButton}>Edit</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        onPress={() => handleDeleteTask(item.id, item.completed)}> 
                        <Text 
                            style={styles.deleteButton}>Delete</Text> 
                    </TouchableOpacity> 
                </View> 
            </View> 
        );
    }  
  
    return ( 
        <View style={styles.container}> 
            <TouchableOpacity style={styles.taskButtons} onPress={handleSignOut}>
                <Text>Sign out</Text>
            </TouchableOpacity>
            
            <Text style={styles.heading}>Task Manager</Text> 
            
            <Text style={styles.headTitle}>Completed: {completedCount}</Text> 
            <TextInput 
                style={styles.input} 
                placeholder="Title"
                value={title} 
                onChangeText={(text) => setTitle(text)} 
            /> 
            <TextInput 
                style={styles.input} 
                placeholder="Description"
                value={description} 
                onChangeText={(text) => setDescription(text)} 
            /> 
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddTask}> 
                <Text style={styles.addButtonText}> 
                    {editIndex !== -1 ? "Update Task" : "Add Task"} 
                </Text> 
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.addButton} 
                // To be implemented
                onPress={handleLeaderboard}> 
                <Text style={styles.addButtonText}> 
                    Leaderboard
                </Text> 
            </TouchableOpacity> 
            { loading ? <ActivityIndicator size="large" color="#0000ff"/> :
            <FlatList 
                data={tasks} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.id} 
            /> }
        </View> 
    ); 
}; 

  
export default TaskPage;