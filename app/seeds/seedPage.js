import React, {useState} from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";
import {Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';

import { 
  addTaskToDB, 
  updateTaskFromDB 
} from '../../utils/task_firestore'

import { signOut, deleteUser, signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc, collection, addDoc, deleteDoc, updateDoc, increment, onSnapshot, Timestamp } from "firebase/firestore"; 


const userData = [
    {
      email: 'testmaristrange@gmail.com',
      password: 'seed_password_1',
    },
    {
      email: 'testgfran@gmail.com',
      password: 'seed_password_2',
    },
  ]


for (i = 0; i < 50; i++) {
    var currentEmail = "testaccount" + i.toString() + '@gmail.com';
    var currentPassword = 'testaccount' + i.toString();
 
    userData.push({email: currentEmail, password: currentPassword});
}

const taskData = []
const date = Date.now()
for (j = 0; j<50; j++) {
    var current_title = "Task " + j.toString();
    var current_description = "Description " + j.toString();
    var current_completed = (j % 2 !== 0);
    var ctimeStamp = null;
    if (current_completed) {
        ctimeStamp = date - (25000 * j * j * j);
    }
    taskData.push({title: current_title, description: current_description, completed: current_completed, time_completed: ctimeStamp});
}

const auth = FIREBASE_AUTH;

const userSeeding = (userData) => {
    var index = 0;
    const interval = setInterval(async () => {
        const fakeUser = userData[index];
        const {
            email, 
            password
        } = fakeUser;
            // const response = await createUserWithEmailAndPassword(auth, email, password); 
            await createUserWithEmailAndPassword(auth, email, password).then(async () => {
              const user = auth.currentUser;
              const data = {
                completed_task_count: 0, 
                email: user.email  
            }; 
            
            console.log('successfully registered', user.uid);
            const register = await setDoc(doc(FIRESTORE_DB, "Users", user.uid), data)
            console.log('successfully store to Firestore', user.uid);
            
            }).catch((error) => console.log(error));
            

          await signOut(FIREBASE_AUTH).then(() => console.log('Sign out successful!'))
          .catch((error) => console.log(error));
          
        index += 1;
        if (index === userData.length) clearInterval(interval);
    }, 2000);
    
}

const taskSeed = (taskData, userData) => {
  var index = 0;
  var userIndex = 1;
  const interval = setInterval(async () => {
      const fakeTask = taskData[index];
      const fakeUser = userData[userIndex];
      const {
          title,
          description, 
          completed,
          time_completed
      } = fakeTask;
      const new_time_completed = null;
      if (time_completed != null) {
        new_time_completed = Timestamp.fromDate(time_completed);
      }
      
      const {
        email, 
        password
      } = fakeUser;
          // const response = await createUserWithEmailAndPassword(auth, email, password); 
          await signInWithEmailAndPassword(auth, email, password).then(async () => {
            const user = auth.currentUser;
            console.log('Current User: ', user.email);
            try {
              const uid = user.uid;
              const current_email = FIREBASE_AUTH.currentUser.email;
              const username = email ? email.split("@")[0] : " ";
              // Add new task to the Firestore DB
              const taskRef = await addDoc(collection(FIRESTORE_DB, 'Tasks'), {
                  uid: uid,
                  email: current_email,
                  username: username,
                  title: title, 
                  description: description, 
                  completed: completed,
                  time_completed: new_time_completed
              });
              // Create sub collections in usernode to store their tasks
              const userRef = doc(FIRESTORE_DB, "Users", uid, "tasks", taskRef.id);
              
              // Atomically add a new region to the "regions" array field.
              const subtaskRef = await setDoc(userRef, {
                  title: title, 
                  description: description,
                  completed: false
              })
              console.log('Document written with ID: ', taskRef.id);

              if (completed) {
                await updateDoc(doc(FIRESTORE_DB, `Users/${user.uid}`), {
                  completed_task_count: increment(1)
              });
              await updateDoc(doc(FIRESTORE_DB, `Users/${user.uid}/tasks/${taskRef.id}`), {
                  completed: completed
              });
              }
            } catch (e) {
              console.log(e);
            }
          
          }).catch((error) => console.log(error));
          

        await signOut(FIREBASE_AUTH).then(() => console.log('Sign out successful!'))
        .catch((error) => console.log(error));
        
      index += 1;
      if (index === 5) {
        console.log('Added tasks: ', index);
        clearInterval(interval);
      }
  }, 2000);
}


const Seed = () => {
  const [value, setValue] = useState(0);
  return (
    <View>
      <TouchableOpacity onPress={() => {taskSeed(taskData, userData)}}
      >
        <Text>Seed Me</Text>
      </TouchableOpacity>


    </View>
  );
};
export default Seed;