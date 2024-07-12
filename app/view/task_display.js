import React, { useState } from "react"; 
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
import { doc, setDoc, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";

import styles  from '../../styles/task.style'
  
const TaskPage = ( {navigation} ) => { 
    const [title, setTitle] = useState(""); 
    const [titles, setTitles] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1); 

    const [description, setDescription] = useState(""); 
    const [descriptions, setDescriptions] = useState([]); 

    const user = FIREBASE_AUTH.currentUser;

    const router = useRouter();

    const addTaskToDB = async ({title, description, uid}) => {
        try {
            const taskRef = await addDoc(collection(FIRESTORE_DB, 'Tasks'), {
                uid: uid,
                title: title, 
                description: description, 
                completed: false,
                time_completed: null
            });
            const userRef = doc(FIRESTORE_DB, "Users", user.uid);
            
            // Atomically add a new region to the "regions" array field.
            await updateDoc(userRef, {
                tasks: arrayUnion(taskRef.id)
            });
            setTitle(""); 
            setDescription("")
            console.log('Document written with ID: ', taskRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    const handleLeaderboard = () => {
        navigation.navigate('Leaderboard');
    }
  
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
  
    const handleEditTask = (index) => { 
        const taskToEdit = titles[index]; 
        setTitle(taskToEdit); 
        const descriptionToEdit = descriptions[index]; 
        setDescription(descriptionToEdit); 
        setEditIndex(index); 
    }; 
  
    const handleDeleteTask = (index) => { 
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
            const updatedTitles = [...titles]; 
            updatedTitles.splice(index, 1); 
            const updatedDescriptions = [...descriptions]; 
            updatedDescriptions.splice(index, 1); 
            setTitles(updatedTitles);
            setDescriptions(updatedDescriptions); 
        }
        
    }; 

    const handleCheckedTask = (index) => { 
        // TODO: Need to update to completed task. 
        // If someone changes their mind, they can't reverse it. 
        const timeoutId = setTimeout(() => {
                handleDeleteTask(index);
            }, 1000);
    }
    
    const handleDetail = (index) => { 
        const taskToDisplay = titles[index]; 
        const descriptionToDisplay = descriptions[index]; 
        Alert.alert(
            taskToDisplay, 
            descriptionToDisplay, 
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

  
    const renderItem = ({ item, index }) => ( 
        
        <View style={styles.title} borderBottomWidth='thick'> 
        <View style={styles.checkbox}>
        <BouncyCheckbox 
            onPress={(isChecked) => {}}
        />
        <Text style={styles.itemList}>{item}</Text> 
        </View>
            
            <View 
                style={styles.taskButtons}> 
                <TouchableOpacity 
                    onPress={() => handleDetail(index)}> 
                    <Text 
                        style={styles.detailButton}>Details</Text> 
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress={() => handleEditTask(index)}> 
                    <Text 
                        style={styles.editButton}>Edit</Text> 
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress={() => handleDeleteTask(index)}> 
                    <Text 
                        style={styles.deleteButton}>Delete</Text> 
                </TouchableOpacity> 
            </View> 
        </View> 
    ); 
  
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
                data={titles} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()} 
            /> 
        </View> 
    ); 
}; 

  
export default TaskPage;