import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';
import { LuLoader } from 'react-icons/lu';
import { BiSolidCircle } from 'react-icons/bi';
import ProgressCircle from './ProgressCircle';
import mbToGb from '../functions/mbToGb';
import { bytesToString, mbToBytes } from '@/lib/formatters';
import { Link } from 'react-router-dom';
import { ServerPowerState } from '@/api/server/getServerResourceUsage';

interface StatusIndicatorBoxProps {
    status: ServerPowerState;
    serverName: string;
    eggName: string;
    eggImage: string;
    memoryUsage: number;
    memoryLimit: number;
    cpuUsage: number;
    cpuLimit: number;
    diskUsage: number;
    diskLimit: number;
    serverId: string;
    isSuspended: boolean;
    serverIp: JSX.Element[];
    isTransferring: boolean;
    serverStatus: string;
}

interface BoxWrapperProps {
    eggImage: string;
}

const ManageButton = styled(Link)`
    ${tw`p-5 w-full mt-5 rounded-xl font-semibold shadow-sm`};
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.button.bg1, 0.6)},
        ${hexToRGB(medusaColors.bblack2, 1)}
    );

    &:hover {
        background: linear-gradient(
            to bottom right,
            ${hexToRGB(medusaColors.button.bg1, 0.9)},
            ${hexToRGB(medusaColors.bblack2, 1)}
        );
    }
`;

const SuspendedWrapper = styled.div`
    ${tw`absolute top-0 left-0 w-full h-full flex justify-center items-center`};
    background: linear-gradient(
        to right top,
        ${hexToRGB(medusaColors.danger, 0.7)},
        ${hexToRGB(medusaColors.white2, 0.3)}
    );
    z-index: 999;
    cursor: not-allowed;

    & .suspended {
        ${tw`px-5 py-2 rounded-xl text-lg font-bold`};
        background: linear-gradient(
            to right top,
            ${hexToRGB(medusaColors.lightBlue, 0.5)},
            ${hexToRGB(medusaColors.lightBlue, 1)}
        );
    }
`;

const BoxWrapper = styled.div<BoxWrapperProps>`
    ${tw`rounded-lg overflow-hidden relative`};
    z-index: 10;

    background: linear-gradient(to top, ${hexToRGB(medusaColors.bblack2, 1)}, ${hexToRGB(medusaColors.white2, 0.4)});
    border-top: 3px solid ${hexToRGB(medusaColors.white2, 0.3)};

    & .head {
        ${tw`p-5`};
        background: linear-gradient(
                to bottom,
                ${hexToRGB(medusaColors.white2, 0.3)} -100%,
                ${hexToRGB(medusaColors.bblack2, 1)} 100%
            ),
            url('${(props) => props.eggImage}') no-repeat center center;

        & .game-type {
            ${tw`text-sm px-2 py-px rounded-lg shadow-md`};
            background: linear-gradient(
                to top left,
                ${hexToRGB(medusaColors.bblack2, 1)},
                ${hexToRGB(medusaColors.white2, 0.8)}
            );
        }

        & .game-status {
            ${tw`text-sm px-2 py-px rounded-lg shadow-md flex items-center`};
            background: linear-gradient(
                to top left,
                ${hexToRGB(medusaColors.bblack2, 1)},
                ${hexToRGB(medusaColors.white2, 0.8)}
            );
        }

        & .title {
            ${tw`mt-10 text-xs px-5 py-2 rounded-t-lg font-normal`};
            background: linear-gradient(
                to top,
                ${hexToRGB(medusaColors.bblack2, 0)} -100%,
                ${hexToRGB(medusaColors.bblack2, 1)} 100%
            );
            border-top: 1px solid ${hexToRGB(medusaColors.white2, 0.2)};
            color: ${hexToRGB(medusaColors.white, 1)};
        }

        & .server-ip {
            ${tw`pt-2 text-xs text-center font-normal`};
        }
    }

    & .body {
        ${tw`px-5 py-5 relative`};

        & .limit {
            ${tw`text-2xs font-bold`};
            color: ${hexToRGB(medusaColors.white, 0.4)};
        }
    }
`;

const StatusIndicatorBox = ({
    status,
    serverName,
    eggName,
    eggImage,
    memoryUsage,
    memoryLimit,
    cpuLimit,
    cpuUsage,
    diskLimit,
    diskUsage,
    serverId,
    isSuspended,
    serverIp,
    isTransferring,
    serverStatus,
}: StatusIndicatorBoxProps) => {
    return (
        <BoxWrapper
            eggImage={eggImage}
            style={{
                filter: isSuspended ? 'grayscale(80%)' : 'filter: grayscale(0%)',
                cursor: isSuspended ? 'not-allowed' : 'auto',
            }}
        >
            {isSuspended && (
                <SuspendedWrapper>
                    <div className='suspended'>Suspended</div>
                </SuspendedWrapper>
            )}
            <div className='head'>
                <div className='flex items-center justify-between'>
                    <span className='game-type'>
                        <strong>Server type:</strong> {eggName}
                    </span>
                    <span className='game-status'>
                        {isTransferring ? (
                            'Transferring'
                        ) : serverStatus === 'installing' ? (
                            'Installing'
                        ) : serverStatus === 'restoring_backup' ? (
                            'Restoring Backup'
                        ) : (
                            <>
                                {status === 'starting' ? (
                                    <LuLoader className='animate-spin mr-1' />
                                ) : status === 'running' ? (
                                    <BiSolidCircle size={8} color={medusaColors.lime} className='mr-1' />
                                ) : (
                                    <BiSolidCircle size={8} color={medusaColors.danger} className='mr-1' />
                                )}
                                {status === 'starting' ? 'Starting' : status === 'running' ? 'Running' : 'Offline'}
                            </>
                        )}
                    </span>
                </div>

                <p className='title'>{serverName.length > 70 ? serverName.substring(0, 70) + '...' : serverName}</p>

                <p className='server-ip'>{serverIp}</p>
            </div>

            <div className='body'>
                <div className='flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 -mt-4'>
                    <div className='flex flex-row items-center justify-center lg:justify-start'>
                        <div className='flex justify-center items-center flex-col'>
                            <ProgressCircle
                                size={40}
                                value={
                                    status === 'offline'
                                        ? Math.ceil(memoryUsage) === 0
                                            ? 0
                                            : Math.ceil(memoryUsage)
                                        : Math.ceil(memoryUsage) === 0
                                        ? Infinity
                                        : Math.ceil(memoryUsage)
                                }
                                maxValue={
                                    status === 'offline'
                                        ? Math.ceil(memoryLimit === 0 ? 0 : memoryLimit)
                                        : Math.ceil(memoryLimit === 0 ? Infinity : memoryLimit)
                                }
                                unusedBg={hexToRGB(medusaColors.bblack2, 1)}
                                gradientStart={hexToRGB(medusaColors.lightBlue, 1)}
                                gradientEnd={hexToRGB(medusaColors.lightBlue, 0.1)}
                                textColor={hexToRGB(medusaColors.white, 1)}
                                textValue={status === 'offline' ? '-' : mbToGb(Math.ceil(memoryUsage))}
                            />
                            <p className='font-bold text-xs -mt-3'>RAM usage</p>
                            <span className='limit'>
                                (Max: {isSuspended ? '-' : memoryLimit === 0 ? '∞' : mbToGb(memoryLimit)})
                            </span>
                        </div>

                        <div className='flex justify-center items-center flex-col'>
                            <ProgressCircle
                                size={40}
                                value={
                                    status === 'offline'
                                        ? Math.ceil(diskUsage) === 0
                                            ? 0
                                            : Math.ceil(diskUsage)
                                        : Math.ceil(diskUsage) === 0
                                        ? Infinity
                                        : Math.ceil(diskUsage)
                                }
                                maxValue={
                                    status === 'offline'
                                        ? Math.ceil(diskLimit === 0 ? 0 : diskLimit)
                                        : Math.ceil(diskLimit === 0 ? Infinity : diskLimit)
                                }
                                unusedBg={hexToRGB(medusaColors.bblack2, 1)}
                                gradientStart={hexToRGB(medusaColors.cyan, 1)}
                                gradientEnd={hexToRGB(medusaColors.cyan, 0.1)}
                                textColor={hexToRGB(medusaColors.white, 1)}
                                textValue={!isSuspended ? bytesToString(mbToBytes(diskUsage)) : '-'}
                            />
                            <p className='font-bold text-xs -mt-3'>Disk usage</p>
                            <span className='limit'>
                                (Max: {isSuspended ? '-' : diskLimit === 0 ? '∞' : mbToGb(diskLimit)})
                            </span>
                        </div>

                        <div className='flex justify-center items-center flex-col'>
                            <ProgressCircle
                                size={40}
                                value={
                                    status === 'offline'
                                        ? Math.ceil(cpuUsage) === 0
                                            ? 0
                                            : Math.ceil(Number(cpuUsage))
                                        : Math.ceil(cpuUsage) === 0
                                        ? Infinity
                                        : Math.ceil(Number(cpuUsage))
                                }
                                maxValue={
                                    status === 'offline'
                                        ? Math.ceil(cpuLimit === 0 ? 0 : cpuLimit)
                                        : Math.ceil(cpuLimit === 0 ? Infinity : cpuLimit)
                                }
                                unusedBg={hexToRGB(medusaColors.bblack2, 1)}
                                gradientStart={hexToRGB(medusaColors.white2, 1)}
                                gradientEnd={hexToRGB(medusaColors.white2, 0.1)}
                                textColor={hexToRGB(medusaColors.white, 1)}
                                textValue={`${Math.ceil(Number(cpuUsage))} %`}
                            />
                            <p className='font-bold text-xs -mt-3'>CPU usage</p>
                            <span className='limit'>(Max: {isSuspended ? '-' : cpuLimit === 0 ? '∞' : cpuLimit}%)</span>
                        </div>
                    </div>

                    <div className='mb-5 lg:mt-0'>
                        <ManageButton to={!isSuspended ? `/server/${serverId}` : ``}>Manage</ManageButton>
                    </div>
                </div>
            </div>
        </BoxWrapper>
    );
};

export default StatusIndicatorBox;
