import { format, isToday, isYesterday } from 'date-fns';

interface ActivityItem {
    id: string;
    timestamp: Date;
    properties: any;
}

interface ActivityProps {
    [key: string]: ActivityItem[];
}

export function categorizeActivities(dataItems: any[]): ActivityProps {
    return dataItems.reduce<ActivityProps>((acc, item) => {
        const date = item.timestamp;
        let key;

        if (isToday(date)) {
            key = 'Today';
        } else if (isYesterday(date)) {
            key = 'Yesterday';
        } else {
            key = format(date, 'MMMM do, yyyy');
        }

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);

        return acc;
    }, {});
}
