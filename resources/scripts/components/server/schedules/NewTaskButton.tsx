import React, { useState } from 'react';
import { Schedule } from '@/api/server/schedules/getServerSchedules';
import TaskDetailsModal from '@/components/server/schedules/TaskDetailsModal';
import Button from '@/medusa/components/Button';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
    schedule: Schedule;
}

export default ({ schedule }: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TaskDetailsModal schedule={schedule} visible={visible} onModalDismissed={() => setVisible(false)} />
            <Button isIcon iconType='purple' onClick={() => setVisible(true)}>
                <AiOutlinePlus />
            </Button>
        </>
    );
};
