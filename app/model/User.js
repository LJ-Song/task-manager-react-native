class User {
    constructor (completed_task_count, tasks) {
        this.email = email,
        this.completed_task_count = completed_task_count;
        this.tasks = tasks // A collection. 
    }
    toString() {
        return `Email: ${email}, Completed tasks: ${this.completed_task_count}`;
    }
}

// Firestore data converter
const userConverter = {
    toFireStore: (user) => {
        return {
            email: email,
            completed_task_count: user.completed_task_count,
            tasks: user.tasks
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.completed_task_count, data.tasks);
    }
};

export { User, userConverter };

