import {View, Text, TextInput, Button, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../config/firebase';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth'

import styles from '../../styles/task.style';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Successfully signed in! ');
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async() => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
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
            <Button title='Log In' onPress={signIn}></Button> 

            <Button title='Create account' onPress={signUp}></Button> 
        </View>
        }
        </View>
    );
};

export default Login;
