import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Spinner from '@/components/elements/Spinner';
import { bytesToString } from '@/lib/formatters';
import Can from '@/components/elements/Can';
import useWebsocketEvent from '@/plugins/useWebsocketEvent';
import BackupContextMenu from '@/components/server/backups/BackupContextMenu';
import tw from 'twin.macro';
import getServerBackups from '@/api/swr/getServerBackups';
import { ServerBackup } from '@/api/server/types';
import { SocketEvent } from '@/components/server/events';
import { Box } from '@/medusa/components/Box';
import { Title } from '@/medusa/components/Title';
import CopyOnClick from '@/components/elements/CopyOnClick';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { AiFillLock } from 'react-icons/ai';
import { LuArchive } from 'react-icons/lu';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';

interface Props {
    backup: ServerBackup;
}

export default ({ backup }: Props) => {
    const { mutate } = getServerBackups();

    useWebsocketEvent(`${SocketEvent.BACKUP_COMPLETED}:${backup.uuid}` as SocketEvent, (data) => {
        try {
            const parsed = JSON.parse(data);

            mutate(
                (data) => ({
                    ...data,
                    items: data.items.map((b) =>
                        b.uuid !== backup.uuid
                            ? b
                            : {
                                  ...b,
                                  isSuccessful: parsed.is_successful || true,
                                  checksum: (parsed.checksum_type || '') + ':' + (parsed.checksum || ''),
                                  bytes: parsed.file_size || 0,
                                  completedAt: new Date(),
                              }
                    ),
                }),
                false
            );
        } catch (e) {
            console.warn(e);
        }
    });

    return (
        <Box>
            {backup.completedAt !== null ? (
                <>
                    <div css={tw`flex items-center justify-between w-full`}>
                        <Title isSmall haveBg className='flex items-center'>
                            <LuArchive size={22} className='mr-1' color={hexToRGB(medusaColors.white2, 0.7)} />
                            {backup.name.length > 15 ? backup.name.substring(0, 15) + '...' : backup.name}
                        </Title>
                        {backup.completedAt !== null && !backup.isSuccessful ? (
                            <span className='backup-failed'>
                                <IoMdClose size={16} />
                                Failed
                            </span>
                        ) : backup.isLocked ? (
                            <span className='backup-locked'>
                                <AiFillLock size={16} />
                                Locked
                            </span>
                        ) : (
                            <span className='backup-success'>
                                <BsCheckLg size={16} />
                            </span>
                        )}
                    </div>
                    <div className='pt-3'>
                        <div className='box-details'>
                            <ul className='backup-details'>
                                <li>
                                    <span>
                                        <strong>Name:</strong> {backup.name}
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <strong>Created:</strong>{' '}
                                        {formatDistanceToNow(backup.createdAt, {
                                            includeSeconds: true,
                                            addSuffix: true,
                                        })}
                                    </span>
                                </li>
                                {backup.completedAt !== null && backup.isSuccessful ? (
                                    <>
                                        <li>
                                            <CopyOnClick text={backup.checksum}>
                                                <span>
                                                    <strong>Hash:</strong>{' '}
                                                    {backup.checksum.length > 38
                                                        ? backup.checksum.substring(0, 38) + '...'
                                                        : backup.checksum}
                                                </span>
                                            </CopyOnClick>
                                        </li>

                                        <li>
                                            <span>
                                                <strong>Size:</strong> {bytesToString(backup.bytes)}
                                            </span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <CopyOnClick text={backup.checksum}>
                                                <span>
                                                    <strong>Hash:</strong> Failed
                                                </span>
                                            </CopyOnClick>
                                        </li>

                                        <li>
                                            <span>
                                                <strong>Size:</strong> 0 bytes
                                            </span>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <Can action={['backup.download', 'backup.restore', 'backup.delete']} matchAny>
                            <div className='mt-2'>{backup.completedAt && <BackupContextMenu backup={backup} />}</div>
                        </Can>
                    </div>
                </>
            ) : (
                <div className='flex items-center justify-center'>
                    <Spinner size='base' />
                </div>
            )}
        </Box>
    );
};
