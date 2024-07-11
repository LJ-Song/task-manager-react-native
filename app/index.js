import { NavigationContainer } from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../app/userAuthentication/Login';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouterName='Login'>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}