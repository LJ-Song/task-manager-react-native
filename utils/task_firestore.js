// Set up the documents for firebase
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"; 
import { FIREBASE_APP, FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import React, { useState } from "react";

// Handles adding task to DB
export const addTaskToDB = async ({title, description, uid}) => {
    try {
        const email = FIREBASE_AUTH.currentUser.email;
        const username = email ? email.split("@")[0] : " ";
        // Add new task to the Firestore DB
        const taskRef = await addDoc(collection(FIRESTORE_DB, 'Tasks'), {
            uid: uid,
            email: email,
            username: username,
            title: title, 
            description: description, 
            completed: false,
            time_completed: null
        });
        // Create sub collections in usernode to store their tasks
        const userRef = doc(FIRESTORE_DB, "Users", uid, "tasks", taskRef.id);
        const refId = taskRef.id;
        // Atomically add a new region to the "regions" array field.
        const subtaskRef = await setDoc(userRef, {
            title: title, 
            description: description,
            completed: false
        })
        console.log('Document written with ID: ', taskRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
    // return refId;
}


export const updateTaskFromDB = async (title, description, id) => {
    console.log('title: ', title);
    console.log('description', description);
    console.log('id' ,id);
    const user = FIREBASE_AUTH.currentUser;
    try {
        const userTaskUpdateRef = doc(FIRESTORE_DB, 'Users', user.uid, 'tasks', id);
        const taskUpdateRef = doc(FIRESTORE_DB, "Tasks", id);
        // Update the user node
        await updateDoc(userTaskUpdateRef, {
            "title": title, 
            "description": description
        });
        // Update the task node. 
        await updateDoc(taskUpdateRef, {
            "title": title, 
            "description": description
        })
        console.log("Update success");
    } catch (e) {
        console.log('Error updating', e);
    }
}
