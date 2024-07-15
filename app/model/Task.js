class Task {
    constructor (user_uid, title, description, completed, time_completed) {
        this.user_uid = user_uid;
        this.username = username;
        this.title = title;
        this.description = description; 
        this.completed = completed;
        this.time_completed = time_completed;
    }
    toString() {
        return `username: ${username}, task: title: ${title}, description: ${description}, completed: ${true}, at ${time_completed}`;
    }
}

// Firestore data converter
const taskConverter = {
    toFireStore: (task) => {
        return {
                user_uid: task.user_uid,
                username: username,
                title: task.title, 
                description: task.description, 
                completed: task.completed, 
                time_completed: task.time_completed
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Task(data.user_uid, data.username, data.title, data.description, data.completed, data.time_completed);
    }
};

export { Task, taskConverter };