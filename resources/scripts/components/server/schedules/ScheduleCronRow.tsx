import React from 'react';
import { Schedule } from '@/api/server/schedules/getServerSchedules';
import { findScheduleNameByCron } from '@/medusa/lib/predefinedSchedules';

interface Props {
    cron: Schedule['cron'];
}

const ScheduleCronRow = ({ cron }: Props) => {
    const scheduleName = findScheduleNameByCron(cron);

    return <>{scheduleName}</>;
};

export default ScheduleCronRow;
