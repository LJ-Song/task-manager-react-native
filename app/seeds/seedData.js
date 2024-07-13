import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";
import { signOut } from "firebase/auth";

// Populated data. Seeded user. 
const userData = [
    {
      email: 'testmaristrange@gmail.com',
      password: 'seed_password_1',
    },
    {
      email: 'testgfran@gmail.com',
      password: 'seed_password_2',
    },
    {
        email: 'testaccount0@gmail.com',
        password: 'testaccount0'
    },
    {
        email: 'testaccount1@gmail.com',
        password: 'testaccount1'
    },
    {
        email: 'testaccount2@gmail.com',
        password: 'testaccount2'
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
    var index = 5;
    const interval = setInterval(async () => {
        const fakeUser = userData[index];
        const {
            email, 
            password
        } = fakeUser;
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password); 
            const user = auth.currentUser;
            console.log('successfully registered', user.uid);
            const data = {
                completed_task_count: 0, 
                email: user.email
            }
            const register = await setDoc(doc(FIRESTORE_DB, "Users", user.uid), data)
            console.log('successfully store to Firestore', user.uid);

            await signOut(FIREBASE_AUTH);
            
        } catch (error) {
            console.log(error);
        }
        index += 1;
        if (index === userData.length) clearInterval(interval);
    }, 2000);
    
}

export default { userSeeding };
