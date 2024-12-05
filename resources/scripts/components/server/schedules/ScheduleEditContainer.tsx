import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import getServerSchedule from '@/api/server/schedules/getServerSchedule';
import Spinner from '@/components/elements/Spinner';
import FlashMessageRender from '@/components/FlashMessageRender';
import EditScheduleModal from '@/components/server/schedules/EditScheduleModal';
import NewTaskButton from '@/components/server/schedules/NewTaskButton';
import DeleteScheduleButton from '@/components/server/schedules/DeleteScheduleButton';
import Can from '@/components/elements/Can';
import useFlash from '@/plugins/useFlash';
import { ServerContext } from '@/state/server';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import Button from '@/medusa/components/Button';
import ScheduleTaskRow from '@/components/server/schedules/ScheduleTaskRow';
import isEqual from 'react-fast-compare';
import { format } from 'date-fns';
import ScheduleCronRow from '@/components/server/schedules/ScheduleCronRow';
import RunScheduleButton from '@/components/server/schedules/RunScheduleButton';
import { Box } from '@/medusa/components/Box';
import { Title } from '@/medusa/components/Title';
import { LuPencil } from 'react-icons/lu';

interface Params {
    id: string;
}

export default () => {
    const history = useHistory();
    const { id: scheduleId } = useParams<Params>();

    const id = ServerContext.useStoreState((state) => state.server.data!.id);
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);

    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    const schedule = ServerContext.useStoreState(
        (st) => st.schedules.data.find((s) => s.id === Number(scheduleId)),
        isEqual
    );
    const appendSchedule = ServerContext.useStoreActions((actions) => actions.schedules.appendSchedule);

    useEffect(() => {
        if (schedule?.id === Number(scheduleId)) {
            setIsLoading(false);
            return;
        }

        clearFlashes('schedules');
        getServerSchedule(uuid, Number(scheduleId))
            .then((schedule) => appendSchedule(schedule))
            .catch((error) => {
                console.error(error);
                clearAndAddHttpError({ error, key: 'schedules' });
            })
            .then(() => setIsLoading(false));
    }, [scheduleId]);

    const toggleEditModal = useCallback(() => {
        setShowEditModal((s) => !s);
    }, []);

    return (
        <PageContentBlock title={'Schedules'}>
            <Box v2>
                <FlashMessageRender byKey={'schedules'} css={tw`mb-4`} />
                {!schedule || isLoading ? (
                    <Spinner size={'large'} centered />
                ) : (
                    <>
                        <div>
                            <div css={tw`flex justify-between items-center mb-5`}>
                                <Title isSmall>{schedule.name}</Title>
                                <div className='flex flex-row gap-3'>
                                    <Can action={'schedule.update'}>
                                        {schedule.tasks.length > 0 && <RunScheduleButton schedule={schedule} />}
                                        <Button isIcon iconType='purple' onClick={toggleEditModal}>
                                            <LuPencil />
                                        </Button>
                                        <NewTaskButton schedule={schedule} />
                                    </Can>
                                    <Can action={'schedule.delete'}>
                                        <DeleteScheduleButton
                                            scheduleId={schedule.id}
                                            onDeleted={() => history.push(`/server/${id}/schedules`)}
                                        />
                                    </Can>
                                </div>
                            </div>
                            <div className='box-details w-full lg:w-1/3 mb-5'>
                                <ul className='backup-details'>
                                    <li>
                                        <span>
                                            <strong>Status:</strong>{' '}
                                            {schedule.isProcessing
                                                ? 'Processing...'
                                                : schedule.isActive
                                                ? 'Active'
                                                : 'Inactive'}
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
                                            {schedule.lastRunAt ? (
                                                format(schedule.lastRunAt, "MMM do 'at' h:mma")
                                            ) : (
                                                <span css={tw`text-neutral-300`}>n/a</span>
                                            )}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <strong>Next run at:</strong>{' '}
                                            {schedule.nextRunAt ? (
                                                format(schedule.nextRunAt, "MMM do 'at' h:mma")
                                            ) : (
                                                <span css={tw`text-neutral-300`}>n/a</span>
                                            )}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            {schedule.tasks.length > 0
                                ? schedule.tasks
                                      .sort((a, b) =>
                                          a.sequenceId === b.sequenceId ? 0 : a.sequenceId > b.sequenceId ? 1 : -1
                                      )
                                      .map((task) => (
                                          <ScheduleTaskRow
                                              key={`${schedule.id}_${task.id}`}
                                              task={task}
                                              schedule={schedule}
                                          />
                                      ))
                                : null}
                        </div>
                        <EditScheduleModal
                            visible={showEditModal}
                            schedule={schedule}
                            onModalDismissed={toggleEditModal}
                        />
                    </>
                )}
            </Box>
        </PageContentBlock>
    );
};
