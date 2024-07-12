// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import Leaderboard from './leaderboard';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Leaderboard />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import { NavigationContainer } from "@react-navigation/native";
import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './view/login';
import TaskPage from './view/task_display';
import Leaderboard from "./view/leaderboard";

const Stack = createNativeStackNavigator();

// const InsideStack = createNativeStackNavigator();

// const InsideLayout = () => {
//     return (
//         <InsideStack.Navigator>
//             <InsideStack.Screen name="task_display" component={TaskPage}/>
//         </InsideStack.Navigator>
//     )
// }

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouterName='Login'>
                <Stack.Screen 
                name='Login' 
                component={Login} 
                options={{ 
                    headerShown: false,
                    }}/>
                <Stack.Screen name='TaskPage' component={TaskPage} options={{ headerShown: false}}/>
                <Stack.Screen name='Leaderboard' component={Leaderboard} options={{ headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


// useEffect(() => {
//     onAuthStateChanged(FIREBASE_AUTH, (user) => {
//         console.log('user', user);
//         setUser(user);
//     });
// }, [])
// {user ? (<Stack.screen name='Inside' component={InsideLayout} options={{ headerShown: false}}/>)
//                     :
//                     (<Stack.screen name='Login' component={Login} options={{ headerShown: false}}/>)};