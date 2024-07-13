import { collection, query, where } from "firebase/firestore"; 
import { FIREBASE_APP, FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";


import React, { useEffect } from 'react';
const dataSets = [];
const LeaderboardQueries = () => {
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
        const oneDayOldQuery = await query(tasksRef, 
            where('completed', '==', true), 
            where('time_completed', '<=', oneDayAgo));

        const dayQuerySnapshot = await getDocs(oneDayOldQuery);
        const currentDaily = {}
        dayQuerySnapshot.forEach((doc) => {
            if (doc.uid in currentDaily) {
                currentDaily[doc.uid] += 1;
            }
            else {
                currentDaily[doc.uid] = 1;
            }
        });

        
        // // console.log('One Day Old:', oneDayOldQuery.docs.map(doc => doc.data()));
        // const dayQuery = oneDayOldQuery.docs.map(doc => doc.data());

        // Query for documents one week old
        const oneWeekOldQuery = await query(tasksRef, 
            where('completed', '==', true), 
            where('time_completed', '<=', oneWeekAgo));

        // console.log('One Week Old:', oneWeekOldQuery.docs.map(doc => doc.data()));
        // const weekQuery = oneWeekOldQuery.docs.map(doc => doc.data());
        const weekQuerySnapshot = await getDocs(oneWeekOldQuery);
        const currentWeekly = {}
        weekQuerySnapshot.forEach((doc) => {
            if (doc.uid in currentWeekly) {
                currentWeekly[doc.uid] += 1;
            }
            else {
                currentWeekly[doc.uid] = 1;
            }
        });

        // Query for documents one month old
        const oneMonthOldQuery = await query(tasksRef, 
            where('completed', '==', true), 
            where('time_completed', '<=', oneMonthAgo));
        // console.log('One Month Old:', oneMonthOldQuery.docs.map(doc => doc.data()));
        // const monthQuery = oneMonthOldQuery.docs.map(doc => doc.data());

        const monthQuerySnapshot = await getDocs(oneMonthOldQuery);
        const currentMonthly = {}
        monthQuerySnapshot.forEach((doc) => {
            if (doc.uid in currentMonthly) {
                currentMonthly[doc.uid] += 1;
            }
            else {
                currentMonthly[doc.uid] = 1;
            }
        });
        dataSets.push({ currentDaily, currentWeekly, currentMonthly});
    };
    getDocuments();
};

LeaderboardQueries();

export default {dataSets};
