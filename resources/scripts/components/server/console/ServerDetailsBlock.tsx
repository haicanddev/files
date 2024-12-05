import React, { useEffect, useState } from 'react';
import { bytesToString, ip } from '@/lib/formatters';
import { ServerContext } from '@/state/server';
import { SocketEvent, SocketRequest } from '@/components/server/events';
import UptimeDuration from '@/components/server/UptimeDuration';
import useWebsocketEvent from '@/plugins/useWebsocketEvent';
import { capitalize } from '@/lib/strings';
import ProgressCircle from '@/medusa/components/ProgressCircle';
import { medusaColors } from '@/medusa/medusaColors';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { MedusaDetailsBlock, MedusaNetwork } from '@/medusa/components/MedusaDetailsBlock';
import mbToGb from '@/medusa/functions/mbToGb';
import { HiOutlineCloudDownload, HiOutlineCloudUpload } from 'react-icons/hi';
import CopyOnClick from '@/components/elements/CopyOnClick';
import { MdOutlineAccessTime } from 'react-icons/md';
import { BsGlobe } from 'react-icons/bs';
import PowerButtons from './PowerButtons';

type Stats = Record<'memory' | 'cpu' | 'disk' | 'uptime' | 'rx' | 'tx', number>;

const ServerDetailsBlock = () => {
    const [stats, setStats] = useState<Stats>({ memory: 0, cpu: 0, disk: 0, uptime: 0, tx: 0, rx: 0 });
    const status = ServerContext.useStoreState((state) => state.status.value);
    const connected = ServerContext.useStoreState((state) => state.socket.connected);
    const instance = ServerContext.useStoreState((state) => state.socket.instance);
    const limits = ServerContext.useStoreState((state) => state.server.data!.limits);

    const allocation = ServerContext.useStoreState((state) => {
        const match = state.server.data!.allocations.find((allocation) => allocation.isDefault);

        return !match ? 'n/a' : `${match.alias || ip(match.ip)}:${match.port}`;
    });

    const onlyIP = ServerContext.useStoreState((state) => {
        const match = state.server.data!.allocations.find((allocation) => allocation.isDefault);

        return !match ? 'n/a' : `${match.alias || ip(match.ip)}`;
    });

    const onlyPort = ServerContext.useStoreState((state) => {
        const match = state.server.data!.allocations.find((allocation) => allocation.isDefault);

        return !match ? 'n/a' : `${match.port}`;
    });

    useEffect(() => {
        if (!connected || !instance) {
            return;
        }

        instance.send(SocketRequest.SEND_STATS);
    }, [instance, connected]);

    useWebsocketEvent(SocketEvent.STATS, (data) => {
        let stats: any = {};
        try {
            stats = JSON.parse(data);
        } catch (e) {
            return;
        }

        setStats({
            memory: stats.memory_bytes,
            cpu: stats.cpu_absolute,
            disk: stats.disk_bytes,
            tx: stats.network.tx_bytes,
            rx: stats.network.rx_bytes,
            uptime: stats.uptime || 0,
        });
    });

    return (
        <>
            <PowerButtons />
            <MedusaDetailsBlock>
                <div className='res_usage'>
                    <div className='flex justify-center items-center flex-col'>
                        <ProgressCircle
                            value={Math.ceil(stats.cpu)}
                            maxValue={Math.ceil(limits.cpu === 0 ? Infinity : limits.cpu)}
                            unusedBg={hexToRGB(medusaColors.bblack2, 1)}
                            gradientStart={hexToRGB(medusaColors.white2, 1)}
                            gradientEnd={hexToRGB(medusaColors.white2, 0.1)}
                            textColor={hexToRGB(medusaColors.white, 1)}
                            textValue={`${Math.ceil(stats.cpu)}%`}
                        />
                        <p className='font-bold text-xs pt-2'>CPU usage</p>
                        <span>(Max: {limits.cpu === 0 ? '?��' : limits.cpu}%)</span>
                    </div>

                    <div className='flex justify-center mx-3 items-center flex-col'>
                        <ProgressCircle
                            value={stats.memory / 1024}
                            maxValue={Math.ceil(limits.memory === 0 ? Infinity : limits.memory * 1024)}
                            unusedBg={hexToRGB(medusaColors.bblack2, 1)}
                            gradientStart={hexToRGB(medusaColors.lightBlue, 1)}
                            gradientEnd={hexToRGB(medusaColors.lightBlue, 0.1)}
                            textColor={hexToRGB(medusaColors.white, 1)}
                            textValue={bytesToString(stats.memory)}
                        />
                        <p className='font-bold text-xs pt-2'>RAM usage</p>
                        <span>(Max: {mbToGb(limits.memory)})</span>
                    </div>

                    <div className='flex justify-center items-center flex-col'>
                        <ProgressCircle
                            value={stats.disk / 1024}
                            maxValue={Math.ceil(limits.disk === 0 ? Infinity : limits.disk * 1024)}
                            unusedBg={hexToRGB(medusaColors.bblack2, 1)}
                            gradientStart={hexToRGB(medusaColors.cyan, 1)}
                            gradientEnd={hexToRGB(medusaColors.cyan, 0.1)}
                            textColor={hexToRGB(medusaColors.white, 1)}
                            textValue={bytesToString(stats.disk)}
                        />
                        <p className='font-bold text-xs pt-2'>Disk usage</p>
                        <span>(Max: {mbToGb(limits.disk)})</span>
                    </div>
                </div>

                <div className='network_in_out'>
                    <div className='h-full w-full lg:w-auto'>
                        <h1>Network</h1>
                        <div className={`flex flex-row lg:flex-col items-start w-full justify-between`}>
                            <div className='flex flex-row items-center'>
                                <HiOutlineCloudDownload size={24} color={hexToRGB(medusaColors.yellow, 0.7)} />
                                <div className='ml-3 mb-3'>
                                    <span className='text-xs leading-3'>Inbound</span>
                                    <MedusaNetwork isOffline={status === 'offline' ? true : false} inbound>
                                        {status === 'offline' ? 'Offline' : bytesToString(stats.rx)}
                                    </MedusaNetwork>
                                </div>
                            </div>
                            <div className='flex flex-row items-center'>
                                <HiOutlineCloudUpload size={24} color={hexToRGB(medusaColors.cyan, 0.7)} />
                                <div className='ml-3 mb-3'>
                                    <span className='text-xs leading-3'>Outbound</span>
                                    <MedusaNetwork isOffline={status === 'offline' ? true : false}>
                                        {status === 'offline' ? 'Offline' : bytesToString(stats.tx)}
                                    </MedusaNetwork>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='h-full'>
                        <h1>Server Information</h1>
                        <div className={`flex flex-col lg:flex-row lg:flex-col items-start justify-between`}>
                            <div className='flex flex-row items-center'>
                                <BsGlobe size={24} color={hexToRGB(medusaColors.lightBlue2, 1)} />
                                <div className='ml-3 mb-3'>
                                    <span className='text-xs leading-3'>IP Address</span>
                                    <CopyOnClick text={allocation}>
                                        <p className='idk'>
                                            <span className='allocation'>
                                                {onlyIP.length > 16 ? onlyIP.substring(0, 16) + '...' : onlyIP}
                                            </span>
                                            <span className='only-port'>:{onlyPort}</span>
                                        </p>
                                    </CopyOnClick>
                                </div>
                            </div>
                            <div className='flex flex-row items-center'>
                                <MdOutlineAccessTime size={24} color={hexToRGB(medusaColors.white2, 1)} />
                                <div className='ml-3 mb-3'>
                                    <span className='text-xs leading-3'>Uptime</span>
                                    <p className='uptime'>
                                        {status === null ? (
                                            'Offline'
                                        ) : stats.uptime > 0 ? (
                                            <UptimeDuration uptime={stats.uptime / 1000} />
                                        ) : (
                                            capitalize(status)
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MedusaDetailsBlock>
        </>
    );
};

export default ServerDetailsBlock;
