import React, { useEffect, useRef, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServerResourceUsage, { ServerStats } from '@/api/server/getServerResourceUsage';
import { eggsList } from '@/medusa/medusaColors';
import StatusIndicatorBox from '@/medusa/components/StatusIndicatorBox';
import { ip } from '@/lib/formatters';

// Determines if the current value is in an alarm threshold so we can show it in red rather
// than the more faded default style.
type Timer = ReturnType<typeof setInterval>;

export default ({ server }: { server: Server }) => {
    const interval = useRef<Timer>(null) as React.MutableRefObject<Timer>;
    const [isSuspended, setIsSuspended] = useState(server.status === 'suspended');
    const [stats, setStats] = useState<ServerStats | null>(null);

    const getStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => setStats(data))
            .catch((error) => console.error(error));

    useEffect(() => {
        setIsSuspended(stats?.isSuspended || server.status === 'suspended');
    }, [stats?.isSuspended, server.status]);

    useEffect(() => {
        // Don't waste a HTTP request if there is nothing important to show to the user because
        // the server is suspended.
        if (isSuspended) return;

        getStats().then(() => {
            interval.current = setInterval(() => getStats(), 30000);
        });

        return () => {
            interval.current && clearInterval(interval.current);
        };
    }, [isSuspended]);

    const memoryUsage = stats ? stats.memoryUsageInBytes / (1024 * 1024) : 0;
    const diskUsage = stats ? stats.diskUsageInBytes / (1024 * 1024) : 0;

    const eggId = server.eggId;
    let egg = eggsList.eggs[eggId];

    if (!egg) {
        egg = eggsList.defaultEgg;
    }

    return isSuspended ? (
        <StatusIndicatorBox
            serverId={server.id}
            status={'offline'}
            serverName={server.name.length > 70 ? server.name.substring(0, 70) + '...' : server.name}
            eggName={egg[0]}
            eggImage={egg[1]}
            memoryUsage={0}
            memoryLimit={100}
            diskUsage={0}
            diskLimit={100}
            cpuUsage={0}
            cpuLimit={100}
            isSuspended={true}
            serverIp={server.allocations
                .filter((alloc) => alloc.isDefault)
                .map((allocation) => (
                    <React.Fragment key={allocation.ip + allocation.port.toString()}>
                        {allocation.alias || ip(allocation.ip)}:{allocation.port}
                    </React.Fragment>
                ))}
            isTransferring={server.isTransferring}
            serverStatus={server.status || 'unavailable'}
        />
    ) : (
        <StatusIndicatorBox
            serverId={server.id}
            status={stats?.status || 'offline'}
            serverName={server.name.length > 70 ? server.name.substring(0, 70) + '...' : server.name}
            eggName={egg[0]}
            eggImage={egg[1]}
            memoryUsage={memoryUsage}
            memoryLimit={server.limits.memory}
            diskUsage={diskUsage}
            diskLimit={server.limits.disk}
            cpuUsage={stats?.cpuUsagePercent ?? 0}
            cpuLimit={server.limits.cpu}
            isSuspended={isSuspended}
            serverIp={server.allocations
                .filter((alloc) => alloc.isDefault)
                .map((allocation) => (
                    <React.Fragment key={allocation.ip + allocation.port.toString()}>
                        {allocation.alias || ip(allocation.ip)}:{allocation.port}
                    </React.Fragment>
                ))}
            isTransferring={server.isTransferring}
            serverStatus={server.status || 'unavailable'}
        />
    );
};
