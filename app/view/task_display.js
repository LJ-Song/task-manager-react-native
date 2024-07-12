import React, { useState, useEffect } from "react"; 
import { Stack, useRouter, Redirect } from 'expo-router';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    Alert, 
} from "react-native"; 
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { doc, setDoc, collection, addDoc, deleteDoc, updateDoc, increment, onSnapshot } from "firebase/firestore"; 
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";

import styles  from '../../styles/task.style'
import { 
    addTaskToDB, 
    readTasksFromDB, 
    deleteTaskFromDB, 
    readOneTaskFromDB, 
    updateTaskFromDB 
} from '../../utils/firestore_setup'
  
const TaskPage = ( {navigation} ) => { 
    const user = FIREBASE_AUTH.currentUser;
    const [title, setTitle] = useState(""); 
    // const [titles, setTitles] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1); 

    const [description, setDescription] = useState(""); 
    // const [descriptions, setDescriptions] = useState([]); 

    const [tasks, setTasks] = useState([]);
    // Real time update to fectch data
    useEffect(() => {
        if (user != null) {
            const tasksRef = collection(doc(FIRESTORE_DB, 'Users', user.uid), "tasks");
    
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
            }
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
    // Handles add task related operation. 
    const handleAddTask = () => { 
        if (! (title)) {
            alert('Please fill in a title');
            return;
        }
        if (! (description)) {
            alert('Please fill in a description');
            return;
        }
        if ((title) && (description)) { 
            if (editIndex !== -1) { 
                // Edit existing title 
                const updatedTitles = [...titles]; 
                updatedTitles[editIndex] = title; 
                setTitles(updatedTitles); 
                const updatedDescriptions = [...descriptions]; 
                updatedDescriptions[editIndex] = description; 
                setDescriptions(updatedDescriptions); 
                setEditIndex(-1); 
            } else { 
                // Add new title 
                try {
                    if (user != null) {
                        const uid = user.uid;
                        addTaskToDB({title, description, uid});
                        setTitle(""); 
                        setDescription("")
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
  
    const handleEditTask = (ref) => { 
        setTitle(ref.title);
        setDescription(ref.description);
        // const taskToEdit = titles[index]; 
        // setTitle(taskToEdit); 
        // const descriptionToEdit = descriptions[index]; 
        // setDescription(descriptionToEdit); 
        // setEditIndex(index); 
    }; 
  
    const handleDeleteTask = async (taskId) => { 
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
            // const updatedTitles = [...titles]; 
            // updatedTitles.splice(index, 1); 
            // const updatedDescriptions = [...descriptions]; 
            // updatedDescriptions.splice(index, 1); 
            // setTitles(updatedTitles);
            // setDescriptions(updatedDescriptions); 
            try {
                await deleteDoc(doc(FIRESTORE_DB, `Tasks/${taskId}`));
                await deleteDoc(doc(FIRESTORE_DB, `Users/${user.uid}/tasks/${taskId}`));
            } catch (e) {
                console.log('Cannot delete' + e);
            }
            // await deleteDoc(ref);
        }
        
    }; 

    const handleCheckedTask = (index) => { 
        // TODO: Need to update to completed task. 
        // If someone changes their mind, they can't reverse it. 
        const timeoutId = setTimeout(() => {
                handleDeleteTask(index);
            }, 1000);
    }
    
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
        console.log('item: ', item);
        console.log('itemid ', item.id)
        const toggleTrue = async (isChecked) => {
            if (isChecked) {
                await updateDoc(doc(FIRESTORE_DB, `Users/${user.uid}`), {
                    completed_task_count: increment(1)
                });
            } else {
                await updateDoc(doc(FIRESTORE_DB, `Users/${user.uid}`), {
                    completed_task_count: increment(-1)
                });
            }
            const ref = await doc(FIRESTORE_DB, `Tasks/${item.id}`);
            await updateDoc(ref, {completed: !item.completed});
            await updateDoc(doc(FIRESTORE_DB, `Users/${user.uid}/tasks/${item.id}`), {
                completed: !item.completed
            });
        };

        // const deleteItem = async () => {
        //     await deleteDoc(ref);
        // };

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
                        onPress={() => handleEditTask(item.title, item.description)}> 
                        <Text 
                            style={styles.editButton}>Edit</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        onPress={() => handleDeleteTask(item.id)}> 
                        <Text 
                            style={styles.deleteButton}>Delete</Text> 
                    </TouchableOpacity> 
                </View> 
            </View> 
        );
    }  
  
    return ( 
        <View style={styles.container}> 
            <Text style={styles.heading}>Task Manager</Text> 
            <Text style={styles.headTitle}>Completed: 0</Text> 
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
            <FlatList 
                data={tasks} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()} 
            /> 
        </View> 
    ); 
}; 

  
export default TaskPage;