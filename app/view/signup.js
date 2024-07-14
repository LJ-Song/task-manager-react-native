import {View, Text, Alert, TextInput, Button, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth'

import styles from '../../styles/task.style';


const Signup = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const signIn = () => {
        navigation.navigate('Login');
    }

    const signUp = async() => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password); 
            const user = auth.currentUser;
            const data = {
                completed_task_count: 0, 
                email: user.email
            }
            const register = await setDoc(doc(FIRESTORE_DB, "Users", user.uid), data)
            .then(() => {
                navigation.navigate('TaskPage');
                });
            console.log(response);
            alert('Successfully registered! ');
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.loginContainer}>
            <TextInput value= {email} style={styles.loginInput} placeholder="Email" autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value= {password} style={styles.loginInput} placeholder="Password" autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}></TextInput>

        { loading ? <ActivityIndicator size="large" color="#0000ff"/> : 
        <View style={{flex: 1}}> 
            <Button title='Already has account? log in' onPress={signIn}></Button> 

            <Button title='Create account' onPress={signUp}></Button> 
        </View>
        }
        </View>
    );
};

export default Signup;