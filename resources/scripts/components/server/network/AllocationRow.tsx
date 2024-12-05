import React, { memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';
import InputSpinner from '@/components/elements/InputSpinner';
import { Textarea } from '@/components/elements/Input';
import Can from '@/components/elements/Can';
import { Allocation } from '@/api/server/getServer';
import { debounce } from 'debounce';
import setServerAllocationNotes from '@/api/server/network/setServerAllocationNotes';
import { useFlashKey } from '@/plugins/useFlash';
import { ServerContext } from '@/state/server';
import CopyOnClick from '@/components/elements/CopyOnClick';
import DeleteAllocationButton from '@/components/server/network/DeleteAllocationButton';
import setPrimaryServerAllocation from '@/api/server/network/setPrimaryServerAllocation';
import getServerAllocations from '@/api/swr/getServerAllocations';
import { ip } from '@/lib/formatters';
import Code from '@/components/elements/Code';
import { Box } from '@/medusa/components/Box';
import { IoGitNetwork, IoGitNetworkOutline } from 'react-icons/io5';
import Tooltip from '@/components/elements/tooltip/Tooltip';

interface Props {
    allocation: Allocation;
}

const AllocationRow = ({ allocation }: Props) => {
    const [loading, setLoading] = useState(false);
    const { clearFlashes, clearAndAddHttpError } = useFlashKey('server:network');
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const { mutate } = getServerAllocations();

    const onNotesChanged = useCallback((id: number, notes: string) => {
        mutate((data) => data?.map((a) => (a.id === id ? { ...a, notes } : a)), false);
    }, []);

    const setAllocationNotes = debounce((notes: string) => {
        setLoading(true);
        clearFlashes();

        setServerAllocationNotes(uuid, allocation.id, notes)
            .then(() => onNotesChanged(allocation.id, notes))
            .catch((error) => clearAndAddHttpError(error))
            .then(() => setLoading(false));
    }, 750);

    const setPrimaryAllocation = () => {
        clearFlashes();
        mutate((data) => data?.map((a) => ({ ...a, isDefault: a.id === allocation.id })), false);

        setPrimaryServerAllocation(uuid, allocation.id).catch((error) => {
            clearAndAddHttpError(error);
            mutate();
        });
    };

    return (
        <Box isPrimary={allocation.isDefault ? true : false}>
            <div className='flex justify-between pb-3'>
                <div className='flex items-center'>
                    {allocation.isDefault ? (
                        <>
                            <Tooltip content={'Primary'}>
                                <div className='box-icon-primary'>
                                    <IoGitNetwork size={20} />
                                </div>
                            </Tooltip>
                            <div className={'mr-4 flex-1 md:w-40'}>
                                {allocation.alias ? (
                                    <CopyOnClick text={allocation.alias + ':' + allocation.port}>
                                        <div>
                                            <Code className={'w-40 truncate'}>
                                                {allocation.alias + ':' + allocation.port}
                                            </Code>
                                        </div>
                                    </CopyOnClick>
                                ) : (
                                    <CopyOnClick text={ip(allocation.ip) + ':' + allocation.port}>
                                        <div>
                                            <Code>{ip(allocation.ip) + ':' + allocation.port}</Code>
                                        </div>
                                    </CopyOnClick>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Tooltip content={'Make Primary'}>
                                <div className='box-icon' onClick={setPrimaryAllocation}>
                                    <IoGitNetworkOutline size={20} />
                                </div>
                            </Tooltip>
                            <div className={'mr-4 flex-1 md:w-40 opacity-75'}>
                                {allocation.alias ? (
                                    <CopyOnClick text={allocation.alias + ':' + allocation.port}>
                                        <div>
                                            <Code className='w-40 truncate'>
                                                {allocation.alias + ':' + allocation.port}
                                            </Code>
                                        </div>
                                    </CopyOnClick>
                                ) : (
                                    <CopyOnClick text={ip(allocation.ip) + ':' + allocation.port}>
                                        <div>
                                            <Code className='w-40 truncate'>
                                                {ip(allocation.ip) + ':' + allocation.port}
                                            </Code>
                                        </div>
                                    </CopyOnClick>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {!allocation.isDefault && (
                    <div className='opacity-75'>
                        <Can action={'allocation.delete'}>
                            <DeleteAllocationButton allocation={allocation.id} />
                        </Can>
                    </div>
                )}
            </div>
            <div className={'mt-4 w-full md:mt-0 md:flex-1 md:w-auto'}>
                <InputSpinner visible={loading}>
                    <Textarea
                        className={'bg-neutral-800 hover:border-neutral-600 border-transparent'}
                        placeholder={'Notes'}
                        defaultValue={allocation.notes || undefined}
                        onChange={(e) => setAllocationNotes(e.currentTarget.value)}
                    />
                </InputSpinner>
            </div>
        </Box>
    );
};

export default memo(AllocationRow, isEqual);
