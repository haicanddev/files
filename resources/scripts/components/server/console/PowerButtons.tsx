import React, { useEffect, useState } from 'react';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';
import { PowerAction } from '@/components/server/console/ServerConsoleContainer';
import { Dialog } from '@/components/elements/dialog';
import { PowerWrapper, PowerButton } from '@/medusa/components/PowerWrapper';
import { BiSolidCircle } from 'react-icons/bi';
import { LuLoader } from 'react-icons/lu';
import { medusaColors } from '@/medusa/medusaColors';

export default () => {
    const [open, setOpen] = useState(false);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const instance = ServerContext.useStoreState((state) => state.socket.instance);

    const killable = status === 'stopping';
    const onButtonClick = (
        action: PowerAction | 'kill-confirmed',
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        if (action === 'kill') {
            return setOpen(true);
        }

        if (instance) {
            setOpen(false);
            instance.send('set state', action === 'kill-confirmed' ? 'kill' : action);
        }
    };

    useEffect(() => {
        if (status === 'offline') {
            setOpen(false);
        }
    }, [status]);

    return (
        <PowerWrapper>
            <Dialog.Confirm
                open={open}
                hideCloseIcon
                onClose={() => setOpen(false)}
                title={'Forcibly Stop Process'}
                confirm={'Continue'}
                onConfirmed={onButtonClick.bind(this, 'kill-confirmed')}
            >
                Forcibly stopping a server can lead to data corruption.
            </Dialog.Confirm>
            <Can action={'control.start'}>
                <PowerButton
                    btnType='normal'
                    status={status ?? ''}
                    disabled={status !== 'offline'}
                    onClick={onButtonClick.bind(this, 'start')}
                >
                    {status === 'starting' ? (
                        <LuLoader className='animate-spin mr-1' />
                    ) : status === 'running' ? (
                        <BiSolidCircle size={8} color={medusaColors.lime} className='mr-1' />
                    ) : null}
                    {status === 'starting' ? 'Starting' : status === 'running' ? 'Running' : 'Start'}
                </PowerButton>
            </Can>
            <Can action={'control.restart'}>
                <PowerButton btnType='warning' disabled={!status} onClick={onButtonClick.bind(this, 'restart')}>
                    Restart
                </PowerButton>
            </Can>
            <Can action={'control.stop'}>
                <PowerButton
                    btnType='danger'
                    disabled={status === 'offline'}
                    onClick={onButtonClick.bind(this, killable ? 'kill' : 'stop')}
                >
                    {killable ? 'Kill' : 'Stop'}
                </PowerButton>
            </Can>
        </PowerWrapper>
    );
};
