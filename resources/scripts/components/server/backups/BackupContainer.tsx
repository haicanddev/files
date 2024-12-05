import React, { useContext, useEffect, useState } from 'react';
import Spinner from '@/components/elements/Spinner';
import useFlash from '@/plugins/useFlash';
import Can from '@/components/elements/Can';
import CreateBackupButton from '@/components/server/backups/CreateBackupButton';
import FlashMessageRender from '@/components/FlashMessageRender';
import BackupRow from '@/components/server/backups/BackupRow';
import tw from 'twin.macro';
import getServerBackups, { Context as ServerBackupContext } from '@/api/swr/getServerBackups';
import { ServerContext } from '@/state/server';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import Pagination from '@/components/elements/Pagination';
import { Description } from '@/medusa/components/Description';

const BackupContainer = () => {
    const { page, setPage } = useContext(ServerBackupContext);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const { data: backups, error, isValidating } = getServerBackups();

    const backupLimit = ServerContext.useStoreState((state) => state.server.data!.featureLimits.backups);

    useEffect(() => {
        if (!error) {
            clearFlashes('backups');

            return;
        }

        clearAndAddHttpError({ error, key: 'backups' });
    }, [error]);

    if (!backups || (error && isValidating)) {
        return <Spinner size={'large'} centered />;
    }

    return (
        <ServerContentBlock title={'Backups'}>
            <FlashMessageRender byKey={'backups'} css={tw`mb-4`} />
            <Description size='small' className={backupLimit === 0 ? 'text-center' : 'text'}>
                {backupLimit === 0
                    ? 'Backups cannot be created for this server because the backup limit is set to 0.'
                    : `${backups.backupCount} of ${backupLimit} backups have been created for this server.`}
            </Description>
            <div className='grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-5 mt-5'>
                <Pagination data={backups} onPageSelect={setPage}>
                    {({ items }) =>
                        !backupLimit ? (
                            <Description size='small'>
                                {page > 1
                                    ? "Looks like we've run out of backups to show you, try going back a page."
                                    : 'It looks like there are no backups currently stored for this server.'}
                            </Description>
                        ) : (
                            items.length > 0 &&
                            items.map((backup, index) => (
                                <BackupRow key={backup.uuid} backup={backup} css={index > 0 ? tw`mt-2` : undefined} />
                            ))
                        )
                    }
                </Pagination>
                <Can action={'backup.create'}>
                    {backupLimit > 0 && backupLimit > backups.backupCount && <CreateBackupButton />}
                </Can>
            </div>
        </ServerContentBlock>
    );
};

export default () => {
    const [page, setPage] = useState<number>(1);
    return (
        <ServerBackupContext.Provider value={{ page, setPage }}>
            <BackupContainer />
        </ServerBackupContext.Provider>
    );
};
