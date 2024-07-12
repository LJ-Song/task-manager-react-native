class User {
    constructor (completed_task_count, tasks) {
        this.completed_task_count = completed_task_count;
        this.tasks = tasks
    }
    toString() {
        return '';
    }
}

// Firestore data converter
const userConverter = {
    toFireStore: (user) => {
        return {
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

