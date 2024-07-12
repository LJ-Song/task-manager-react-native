// Set up the documents for firebase
import { doc, setDoc } from "firebase/firestore"; 
import { FIRESTORE_DB } from "../config/firebase";

// Add a new document in collection "cities"
await setDoc(doc(FIRESTORE_DB, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});