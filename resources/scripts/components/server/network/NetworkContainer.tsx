import React, { useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import { useFlashKey } from '@/plugins/useFlash';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import { ServerContext } from '@/state/server';
import AllocationRow from '@/components/server/network/AllocationRow';
import createServerAllocation from '@/api/server/network/createServerAllocation';
import Can from '@/components/elements/Can';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import getServerAllocations from '@/api/swr/getServerAllocations';
import isEqual from 'react-fast-compare';
import { useDeepCompareEffect } from '@/plugins/useDeepCompareEffect';
import { Description } from '@/medusa/components/Description';
import { AddBox } from '@/medusa/components/AddBox';
import { CiCirclePlus } from 'react-icons/ci';
import { InfoBox } from '@/medusa/components/InfoBox';
import { IoGitNetworkOutline } from 'react-icons/io5';

const NetworkContainer = () => {
    const [loading, setLoading] = useState(false);
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const allocationLimit = ServerContext.useStoreState((state) => state.server.data!.featureLimits.allocations);
    const allocations = ServerContext.useStoreState((state) => state.server.data!.allocations, isEqual);
    const setServerFromState = ServerContext.useStoreActions((actions) => actions.server.setServerFromState);

    const { clearFlashes, clearAndAddHttpError } = useFlashKey('server:network');
    const { data, error, mutate } = getServerAllocations();

    useEffect(() => {
        mutate(allocations);
    }, []);

    useEffect(() => {
        clearAndAddHttpError(error);
    }, [error]);

    useDeepCompareEffect(() => {
        if (!data) return;

        setServerFromState((state) => ({ ...state, allocations: data }));
    }, [data]);

    const onCreateAllocation = () => {
        clearFlashes();

        setLoading(true);
        createServerAllocation(uuid)
            .then((allocation) => {
                setServerFromState((s) => ({ ...s, allocations: s.allocations.concat(allocation) }));
                return mutate(data?.concat(allocation), false);
            })
            .catch((error) => clearAndAddHttpError(error))
            .then(() => setLoading(false));
    };

    return (
        <ServerContentBlock showFlashKey={'server:network'} title={'Network'}>
            {!data ? (
                <Spinner size={'large'} centered />
            ) : (
                <>
                    <Description size='small' className='mb-3'>
                        You are currently using {data.length} of {allocationLimit} allowed allocations for this server.
                    </Description>
                    <div className='mb-5'>
                        <InfoBox className='py-2 px-5 text-sm inline-flex' textWhite>
                            <div className='box-icon'>
                                <IoGitNetworkOutline className='inline-flex' />
                            </div>{' '}
                            if you press this button, you will be able to change the port priority.
                        </InfoBox>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-5'>
                        {data.map((allocation) => (
                            <AllocationRow key={`${allocation.ip}:${allocation.port}`} allocation={allocation} />
                        ))}
                        {allocationLimit > 0 && allocationLimit > data.length && (
                            <AddBox className='row-span-1' onClick={onCreateAllocation}>
                                <Can action={'allocation.create'}>
                                    <SpinnerOverlay visible={loading} />
                                    <CiCirclePlus size={50} />
                                </Can>
                            </AddBox>
                        )}
                    </div>
                </>
            )}
        </ServerContentBlock>
    );
};

export default NetworkContainer;
