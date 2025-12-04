//Relative Time Utility
export function formatTimeAgo(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - parseInt(timestamp)) / 1000);

    //To define time intervals in seconds
    const intervals = [
        { name: 'y', seconds: 31536000 },
        { name: 'mo', seconds: 2592000 },
        { name: 'd', seconds: 86400 },
        { name: 'h', seconds: 3600 },
        { name: 'm', seconds: 60 },
        { name: 's', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return count === 0 ? 'just now' : `${count}${interval.name} ago`;
        }
    }

    //The default for very recent posts
    return 'just now';
}