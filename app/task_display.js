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

import styles  from '../styles/task.style'
  
const TaskPage = ( {navigation} ) => { 
    const [title, setTitle] = useState(""); 
    const [titles, setTitles] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1); 

    const [description, setDescription] = useState(""); 
    const [descriptions, setDescriptions] = useState([]); 

    const router = useRouter();

    const handleLeaderboard = () => {
        navigation.navigate('Leaderboard');
    }
  
    const handleAddTask = () => { 
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
                setTitles([...titles, title]); 
                setDescriptions([...descriptions, description]); 
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
            onPress={(isChecked) => {console.log(isChecked)}}
        />
        </View>
            <Text 
                style={styles.itemList}>{item}</Text> 
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
            <Text style={styles.heading}>Welcome, User</Text> 
            <Text style={styles.headTitle}>Task Manager</Text> 
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