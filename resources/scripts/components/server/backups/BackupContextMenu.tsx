import React, { useState } from 'react';
import { faBoxOpen, faCloudDownloadAlt, faLock, faTrashAlt, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getBackupDownloadUrl from '@/api/server/backups/getBackupDownloadUrl';
import useFlash from '@/plugins/useFlash';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import deleteBackup from '@/api/server/backups/deleteBackup';
import Can from '@/components/elements/Can';
import tw from 'twin.macro';
import getServerBackups from '@/api/swr/getServerBackups';
import { ServerBackup } from '@/api/server/types';
import { ServerContext } from '@/state/server';
import Input from '@/components/elements/Input';
import { restoreServerBackup } from '@/api/server/backups';
import http, { httpErrorToHuman } from '@/api/http';
import { Dialog } from '@/components/elements/dialog';
import { Description } from '@/medusa/components/Description';
import { SwitcherContainer } from '@/medusa/components/SwitcherContainer';

interface Props {
    backup: ServerBackup;
}

export default ({ backup }: Props) => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const setServerFromState = ServerContext.useStoreActions((actions) => actions.server.setServerFromState);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(false);
    const [truncate, setTruncate] = useState(false);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const { mutate } = getServerBackups();

    const doDownload = () => {
        setLoading(true);
        clearFlashes('backups');
        getBackupDownloadUrl(uuid, backup.uuid)
            .then((url) => {
                // @ts-expect-error this is valid
                window.location = url;
            })
            .catch((error) => {
                console.error(error);
                clearAndAddHttpError({ key: 'backups', error });
            })
            .then(() => setLoading(false));
    };

    const doDeletion = () => {
        setLoading(true);
        clearFlashes('backups');
        deleteBackup(uuid, backup.uuid)
            .then(() =>
                mutate(
                    (data) => ({
                        ...data,
                        items: data.items.filter((b) => b.uuid !== backup.uuid),
                        backupCount: data.backupCount - 1,
                    }),
                    false
                )
            )
            .catch((error) => {
                console.error(error);
                clearAndAddHttpError({ key: 'backups', error });
                setLoading(false);
                setModal('');
            });
    };

    const doRestorationAction = () => {
        setLoading(true);
        clearFlashes('backups');
        restoreServerBackup(uuid, backup.uuid, truncate)
            .then(() =>
                setServerFromState((s) => ({
                    ...s,
                    status: 'restoring_backup',
                }))
            )
            .catch((error) => {
                console.error(error);
                clearAndAddHttpError({ key: 'backups', error });
            })
            .then(() => setLoading(false))
            .then(() => setModal(''));
    };

    const onLockToggle = () => {
        if (backup.isLocked && modal !== 'unlock') {
            return setModal('unlock');
        }

        http.post(`/api/client/servers/${uuid}/backups/${backup.uuid}/lock`)
            .then(() =>
                mutate(
                    (data) => ({
                        ...data,
                        items: data.items.map((b) =>
                            b.uuid !== backup.uuid
                                ? b
                                : {
                                      ...b,
                                      isLocked: !b.isLocked,
                                  }
                        ),
                    }),
                    false
                )
            )
            .catch((error) => alert(httpErrorToHuman(error)))
            .then(() => setModal(''));
    };

    return (
        <>
            <Dialog.Confirm
                open={modal === 'unlock'}
                onClose={() => setModal('')}
                title={`Unlock "${backup.name}"`}
                onConfirmed={onLockToggle}
            >
                This backup will no longer be protected from automated or accidental deletions.
            </Dialog.Confirm>
            <Dialog.Confirm
                open={modal === 'restore'}
                onClose={() => setModal('')}
                confirm={'Restore'}
                title={`Restore "${backup.name}"`}
                onConfirmed={() => doRestorationAction()}
            >
                <Description size='small'>
                    Your server will be stopped. You will not be able to control the power state, access the file
                    manager, or create additional backups until completed.
                </Description>
                <SwitcherContainer className='mt-5'>
                    <label htmlFor={'restore_truncate'} css={tw`text-base flex items-center cursor-pointer`}>
                        <Input
                            type={'checkbox'}
                            css={tw`w-5! h-5! mr-2`}
                            id={'restore_truncate'}
                            value={'true'}
                            checked={truncate}
                            onChange={() => setTruncate((s) => !s)}
                        />
                        Delete all files before restoring backup.
                    </label>
                </SwitcherContainer>
            </Dialog.Confirm>
            <Dialog.Confirm
                title={`Delete "${backup.name}"`}
                confirm={'Continue'}
                open={modal === 'delete'}
                onClose={() => setModal('')}
                onConfirmed={doDeletion}
            >
                This is a permanent operation. The backup cannot be recovered once deleted.
            </Dialog.Confirm>
            <SpinnerOverlay visible={loading} fixed />
            {backup.isSuccessful ? (
                <div className='btn-menu'>
                    <Can action={'backup.download'}>
                        <div className='flex flex-col items-center justify-center menu-element' onClick={doDownload}>
                            <FontAwesomeIcon fixedWidth icon={faCloudDownloadAlt} css={tw`text-xs`} />
                            <span className='text-xs'>Download</span>
                        </div>
                    </Can>
                    <Can action={'backup.restore'}>
                        <div
                            className='flex flex-col items-center justify-center menu-element'
                            onClick={() => setModal('restore')}
                        >
                            <FontAwesomeIcon fixedWidth icon={faBoxOpen} css={tw`text-xs`} />
                            <span className='text-xs'>Restore</span>
                        </div>
                    </Can>
                    <Can action={'backup.delete'}>
                        <>
                            <div
                                className='flex flex-col items-center justify-center menu-element'
                                onClick={onLockToggle}
                            >
                                <FontAwesomeIcon fixedWidth icon={backup.isLocked ? faUnlock : faLock} />
                                <span className='text-xs'>{backup.isLocked ? 'Unlock' : 'Lock'}</span>
                            </div>
                            {!backup.isLocked ? (
                                <div
                                    className='flex flex-col items-center justify-center menu-element'
                                    onClick={() => setModal('delete')}
                                >
                                    <FontAwesomeIcon fixedWidth icon={faTrashAlt} css={tw`text-xs`} />
                                    <span className='text-xs'>Delete</span>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center menu-element2 opacity-30'>
                                    <FontAwesomeIcon fixedWidth icon={faTrashAlt} css={tw`text-xs`} />
                                    <span className='text-xs'>Delete</span>
                                </div>
                            )}
                        </>
                    </Can>
                </div>
            ) : (
                <div className='btn-menu'>
                    <Can action={'backup.download'}>
                        <div className='flex flex-col items-center justify-center menu-element2 opacity-30'>
                            <FontAwesomeIcon fixedWidth icon={faCloudDownloadAlt} css={tw`text-xs`} />
                            <span className='text-xs'>Download</span>
                        </div>
                    </Can>
                    <Can action={'backup.restore'}>
                        <div className='flex flex-col items-center justify-center menu-element2 opacity-30'>
                            <FontAwesomeIcon fixedWidth icon={faBoxOpen} css={tw`text-xs`} />
                            <span className='text-xs'>Restore</span>
                        </div>
                    </Can>
                    <Can action={'backup.delete'}>
                        <>
                            <div className='flex flex-col items-center justify-center menu-element2 opacity-30'>
                                <FontAwesomeIcon fixedWidth icon={backup.isLocked ? faUnlock : faLock} />
                                <span className='text-xs'>{backup.isLocked ? 'Unlock' : 'Lock'}</span>
                            </div>
                            <div
                                className='flex flex-col items-center justify-center menu-element'
                                onClick={() => setModal('delete')}
                            >
                                <FontAwesomeIcon fixedWidth icon={faTrashAlt} css={tw`text-xs`} />
                                <span className='text-xs'>Delete</span>
                            </div>
                        </>
                    </Can>
                </div>
            )}
        </>
    );
};
