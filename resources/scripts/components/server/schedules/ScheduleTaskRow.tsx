import React, { useState } from 'react';
import { Schedule, Task } from '@/api/server/schedules/getServerSchedules';
import deleteScheduleTask from '@/api/server/schedules/deleteScheduleTask';
import { httpErrorToHuman } from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import TaskDetailsModal from '@/components/server/schedules/TaskDetailsModal';
import Can from '@/components/elements/Can';
import useFlash from '@/plugins/useFlash';
import { ServerContext } from '@/state/server';
import ConfirmationModal from '@/components/elements/ConfirmationModal';
import { Box } from '@/medusa/components/Box';
import { IconType } from 'react-icons';
import { HiCode } from 'react-icons/hi';
import { FaToggleOn } from 'react-icons/fa6';
import { LuArchive, LuPencil } from 'react-icons/lu';
import { GoTrash } from 'react-icons/go';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import { Title } from '@/medusa/components/Title';
import Button from '@/medusa/components/Button';
import Code from '@/components/elements/Code';
import { DescriptionP } from '@/medusa/components/DescriptionP';
import { Badge } from '@/medusa/components/Badge';

interface Props {
    schedule: Schedule;
    task: Task;
}

const getActionDetails = (action: string): [string, IconType] => {
    switch (action) {
        case 'command':
            return ['Send Command', HiCode];
        case 'power':
            return ['Send Power Action', FaToggleOn];
        case 'backup':
            return ['Create Backup', LuArchive];
        default:
            return ['Unknown Action', HiCode];
    }
};

export default ({ schedule, task }: Props) => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const { clearFlashes, addError } = useFlash();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const appendSchedule = ServerContext.useStoreActions((actions) => actions.schedules.appendSchedule);

    const onConfirmDeletion = () => {
        setIsLoading(true);
        clearFlashes('schedules');
        deleteScheduleTask(uuid, schedule.id, task.id)
            .then(() =>
                appendSchedule({
                    ...schedule,
                    tasks: schedule.tasks.filter((t) => t.id !== task.id),
                })
            )
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
                addError({ message: httpErrorToHuman(error), key: 'schedules' });
            });
    };

    const [title, Icon] = getActionDetails(task.action);

    return (
        <Box v2 light>
            <SpinnerOverlay visible={isLoading} fixed size={'large'} />
            <TaskDetailsModal
                schedule={schedule}
                task={task}
                visible={isEditing}
                onModalDismissed={() => setIsEditing(false)}
            />
            <ConfirmationModal
                title={'Confirm task deletion'}
                buttonText={'Delete Task'}
                onConfirmed={onConfirmDeletion}
                visible={visible}
                onModalDismissed={() => setVisible(false)}
            >
                Are you sure you want to delete this task? This action cannot be undone.
            </ConfirmationModal>
            <div className='flex justify-between items-center'>
                <Title isSmall haveBg className='flex items-center'>
                    <Icon size={22} className='mr-1' color={hexToRGB(medusaColors.white2, 0.7)} />
                    {title}
                </Title>

                <div className='flex flex-row items-center gap-x-3'>
                    <Can action={'schedule.update'}>
                        <Button onClick={() => setIsEditing(true)} isIcon iconType='purple'>
                            <LuPencil />
                        </Button>
                        <Button onClick={() => setVisible(true)} isTrash>
                            <GoTrash />
                        </Button>
                    </Can>
                </div>
            </div>
            <div className='my-5'>
                {task.payload && (
                    <>
                        {task.action === 'backup' ? (
                            <>
                                <DescriptionP className='mb-1'>Ignoring files & folders:</DescriptionP>
                                <Code tagType='p' className='!h-8 overflow-x-auto'>
                                    {task.payload.replace(/\s+/g, ', ')}
                                </Code>
                            </>
                        ) : (
                            <Code tagType='p'>{task.payload}</Code>
                        )}
                    </>
                )}
            </div>
            <div className='flex items-center justify-end gap-x-3'>
                {task.continueOnFailure && <Badge badgeType='warning'>Continues on Failure</Badge>}
                {task.sequenceId > 1 && task.timeOffset > 0 && (
                    <Badge badgeType='normal'>{task.timeOffset}s later</Badge>
                )}
            </div>
        </Box>
    );
};
