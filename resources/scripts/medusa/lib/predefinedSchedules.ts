import { Schedule } from '@/api/server/schedules/getServerSchedules';

export const predefinedSchedules = {
    '5 minutes': { minute: '*/5', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    '30 minutes': { minute: '*/30', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    '1 hour': { minute: '0', hour: '*/1', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    '8 hours': { minute: '0', hour: '*/8', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    daily: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '*' },
    weekly: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '1' },
    monthly: { minute: '0', hour: '0', dayOfMonth: '1', month: '*', dayOfWeek: '*' },
};

export const findScheduleNameByCron = (cron: Schedule['cron']): string | undefined => {
    const sortedCronString = JSON.stringify(cron, Object.keys(cron).sort());

    for (const [key, value] of Object.entries(predefinedSchedules)) {
        const sortedPredefinedCronString = JSON.stringify(value, Object.keys(value).sort());

        if (sortedCronString === sortedPredefinedCronString) {
            return key;
        }
    }

    return undefined;
};
