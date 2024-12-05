import React, { MouseEventHandler } from 'react';
import { Schedule } from '@/api/server/schedules/getServerSchedules';
import { format } from 'date-fns';
import ScheduleCronRow from '@/components/server/schedules/ScheduleCronRow';
import { Box } from '@/medusa/components/Box';
import { Title } from '@/medusa/components/Title';
import { LuCalendarDays } from 'react-icons/lu';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';

export default ({
    schedule,
    onClick,
}: {
    schedule: Schedule;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
    <Box onClick={onClick as unknown as MouseEventHandler<HTMLDivElement>} className='cursor-pointer schedule-box'>
        <div className='flex justify-between items-center'>
            <Title isSmall haveBg className='flex items-center'>
                <LuCalendarDays size={22} className='mr-1' color={hexToRGB(medusaColors.white2, 0.7)} />
                {schedule.name.length > 15 ? schedule.name.substring(0, 15) + '...' : schedule.name}
            </Title>
            <div
                className={
                    schedule.isProcessing
                        ? 'schedule-status-processing'
                        : schedule.isActive
                        ? 'schedule-status-active'
                        : 'schedule-status-inactive'
                }
            >
                {schedule.isProcessing ? 'Processing' : schedule.isActive ? 'Active' : 'Inactive'}
            </div>
        </div>

        <div className='box-details mt-5'>
            <ul className='backup-details'>
                <li>
                    <span>
                        <strong>Schedule name:</strong> {schedule.name}
                    </span>
                </li>
                <li>
                    <span>
                        <strong>Trigger program:</strong> <ScheduleCronRow cron={schedule.cron} />
                    </span>
                </li>
                <li>
                    <span>
                        <strong>Last run at:</strong>{' '}
                        {schedule.lastRunAt ? format(schedule.lastRunAt, "MMM do 'at' h:mma") : 'never'}
                    </span>
                </li>
            </ul>
        </div>
    </Box>
);
