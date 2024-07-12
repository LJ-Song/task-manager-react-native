class LeaderboardStats {
    constructor (daily, weekly, monthly) {
        this.daily = daily;
        this.weekly = weekly;
        this.monthly = monthly;

    }
    toString() {
        return '';
    }
}

// Firestore data converter
const leaderboardStatsConverter = {
    toFireStore: (leaderboardStats) => {
        return {
                daily: leaderboardStats.daily, 
                weekly: leaderboardStats.weekly,
                monthly: leaderboardStats.monthly        
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new LeaderboardStats(data.daily, data.weekly, data.monthly);
    }
};

export { LeaderboardStats, leaderboardStatsConverter };