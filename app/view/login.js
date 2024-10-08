import {View, Text, Alert, TextInput, Button, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH} from '../../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { signInWithEmailAndPassword} from 'firebase/auth'

import styles from '../../styles/task.style';


const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('TaskPage');
            });
            console.log(response);
            Alert.alert('Success', 'Successfully signed in! ');
        } catch (error) {
            if (error.code == '(auth/invalid-credential)') {
                alert('Sign in failed. Invalid email or password');
            }
            else if (password.length < 7) {
                alert('Sign up failed. Password must be longer than 7 characters');    
            }
            else if (error.code == 'auth/invalid-email') {
                alert('Sign up failed. Invalid email')
            }
            else {
                console.log(error);
                alert('Sign in failed: ' + error.message);
            }
            
        } finally {
            setLoading(false);
        }
    }

    const signUp = () => {
        navigation.navigate('Signup');
    }

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.heading}>Task Manager</Text>
            <TextInput value= {email} style={styles.loginInput} placeholder="Email" autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value= {password} style={styles.loginInput} placeholder="Password" autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}></TextInput>

        { loading ? <ActivityIndicator size="large" color="#0000ff"/> : 
        <View style={{flex: 1}}> 
            <Button title='Log In' onPress={signIn}></Button> 

            <Button title='New user? create account' onPress={signUp}></Button> 
        </View>
        }
        </View>
    );
};

export default Login;
