import React, { useEffect, useState } from 'react';
import { ActivityLogFilters, useActivityLogs } from '@/api/account/activity';
import { useFlashKey } from '@/plugins/useFlash';
import PageContentBlock from '@/components/elements/PageContentBlock';
import FlashMessageRender from '@/components/FlashMessageRender';
import { Link } from 'react-router-dom';
import PaginationFooter from '@/components/elements/table/PaginationFooter';
import { DesktopComputerIcon, XCircleIcon } from '@heroicons/react/solid';
import Spinner from '@/components/elements/Spinner';
import { styles as btnStyles } from '@/components/elements/button/index';
import classNames from 'classnames';
import ActivityLogEntry from '@/components/elements/activity/ActivityLogEntry';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import useLocationHash from '@/plugins/useLocationHash';
import { categorizeActivities } from '@/medusa/functions/categorizeActivity';
import { ActivityLog } from '@/api/definitions/user';
import { ActivityContainer } from '@/medusa/components/ActivityContainer';
import { Title } from '@/medusa/components/Title';

export default () => {
    const { hash } = useLocationHash();
    const { clearAndAddHttpError } = useFlashKey('account');
    const [filters, setFilters] = useState<ActivityLogFilters>({ page: 1, sorts: { timestamp: -1 } });
    const { data, isValidating, error } = useActivityLogs(filters, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        setFilters((value) => ({ ...value, filters: { ip: hash.ip, event: hash.event } }));
    }, [hash]);

    useEffect(() => {
        clearAndAddHttpError(error);
    }, [error]);

    const categorizedActivities = data ? categorizeActivities(data.items) : {};

    return (
        <PageContentBlock title={'Account Activity Log'}>
            <FlashMessageRender byKey={'account'} />
            {(filters.filters?.event || filters.filters?.ip) && (
                <div className={'flex justify-end mb-2'}>
                    <Link
                        to={'#'}
                        className={classNames(btnStyles.button, btnStyles.text, 'w-full sm:w-auto')}
                        onClick={() => setFilters((value) => ({ ...value, filters: {} }))}
                    >
                        Clear Filters <XCircleIcon className={'w-4 h-4 ml-2'} />
                    </Link>
                </div>
            )}
            {!data && isValidating ? (
                <Spinner centered />
            ) : (
                <ActivityContainer>
                    {categorizedActivities &&
                        Object.keys(categorizedActivities).map((date) => (
                            <div key={date} className='pb-8 activity-line'>
                                <Title className='!text-lg !mb-0 title'>{date}</Title>
                                {categorizedActivities[date].map((activity) => (
                                    <ActivityLogEntry key={activity.id} activity={activity as ActivityLog}>
                                        {typeof activity.properties.useragent === 'string' && (
                                            <Tooltip content={activity.properties.useragent} placement={'top'}>
                                                <span>
                                                    <DesktopComputerIcon />
                                                </span>
                                            </Tooltip>
                                        )}
                                    </ActivityLogEntry>
                                ))}
                            </div>
                        ))}
                </ActivityContainer>
            )}
            {data && (
                <PaginationFooter
                    pagination={data.pagination}
                    onPageSelect={(page) => setFilters((value) => ({ ...value, page }))}
                />
            )}
        </PageContentBlock>
    );
};
