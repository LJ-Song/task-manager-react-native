import { collection, query, where } from "firebase/firestore"; 
import { FIREBASE_APP, FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";


import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const LeaderboardQueries = () => {
    useEffect(() => {
    const getDocuments = async () => {
        const now = new Date();

        // Calculate the timestamps for one day, one week, and one month ago
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        const tasksRef = await collection(FIRESTORE_DB, "Tasks");

        // Query for documents one day old
        const oneDayOldQuery = await tasksRef
            .where('time_completed', '<=', oneDayAgo)
            .get();
        console.log('One Day Old:', oneDayOldQuery.docs.map(doc => doc.data()));

        // Query for documents one week old
        const oneWeekOldQuery = await tasksRef
            .where('time_completed', '<=', oneWeekAgo)
            .get();
        console.log('One Week Old:', oneWeekOldQuery.docs.map(doc => doc.data()));

        // Query for documents one month old
        const oneMonthOldQuery = await tasksRef
            .where('time_completed', '<=', oneMonthAgo)
            .get();
        console.log('One Month Old:', oneMonthOldQuery.docs.map(doc => doc.data()));
    };

    getDocuments();
  }, []);

  return null;
};

export default LeaderboardQueries;
