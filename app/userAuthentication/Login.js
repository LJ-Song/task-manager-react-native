import {View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../config/firebase';

import styles from '../../styles/task.style';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    return (
        <View style={styles.loginContainer}>
            <TextInput value= {email} style={styles.loginInput} placeholder="Email" autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value= {password} style={styles.loginInput} placeholder="Password" autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}></TextInput>
        </View>
    );
};

export default Login
