import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';
import { ServerPowerState } from '@/api/server/getServerResourceUsage';

export const TerminalWrapp = styled.div<{ status: ServerPowerState | undefined }>`
    ${tw`flex flex-col w-full relative`};

    & .terminal {
        backdrop-filter: blur(10px);

        & .xterm-search-bar__addon {
            background: ${hexToRGB(medusaColors.terminal.search.bg, 1)};
            box-shadow: 2px 2px 10px ${hexToRGB(medusaColors.terminal.search.shadow, 0.2)};
        }
    }

    & .terminal .xterm-text-layer {
        ${tw`p-0 mx-2 overflow-x-hidden`};
    }

    & .terminal-head {
        ${tw`flex items-center justify-between px-5 rounded-t-xl py-1 font-light text-sm`};
        background: linear-gradient(
            to right bottom,
            ${hexToRGB(medusaColors.terminal.head.bg1, 0.3)},
            ${hexToRGB(medusaColors.terminal.head.bg2, 1)}
        );

        & .terminal_c1,
        & .terminal_c2,
        & .terminal_c3 {
            ${tw`w-3 h-3 rounded-full ease-in duration-300`};
        }

        & .terminal_c1 {
            background: ${hexToRGB(medusaColors.green, 0.2)};
            box-shadow: 0 0 0 ${hexToRGB(medusaColors.green, 1)};
        }

        & .terminal_c2 {
            background: ${hexToRGB(medusaColors.lightBlue2, 0.2)};
            box-shadow: 0 0 0 ${hexToRGB(medusaColors.lightBlue2, 1)};
        }

        & .terminal_c3 {
            background: ${hexToRGB(medusaColors.danger, 0.2)};
            box-shadow: 0 0 0 ${hexToRGB(medusaColors.danger, 1)};
        }

        ${({ status }) =>
            !status || status === 'offline'
                ? css`
                      & .terminal_c3 {
                          background: ${hexToRGB(medusaColors.danger, 1)};
                          box-shadow: 0 0 15px ${hexToRGB(medusaColors.danger, 1)};
                      }
                  `
                : status === 'running'
                ? css`
                      & .terminal_c1 {
                          background: ${hexToRGB(medusaColors.green, 1)};
                          box-shadow: 0 0 15px ${hexToRGB(medusaColors.green, 1)};
                      }
                  `
                : css`
                      & .terminal_c2 {
                          background: ${hexToRGB(medusaColors.lightBlue2, 1)};
                          box-shadow: 0 0 15px ${hexToRGB(medusaColors.lightBlue2, 1)};
                      }
                  `}
    }

    & .cmd_line {
        ${tw`flex mt-1 px-2`};
        background: ${hexToRGB(medusaColors.terminal.cmd.bg, 1)};

        & input {
            ${tw`w-full bg-transparent text-sm pl-1`};
            color: ${hexToRGB(medusaColors.white, 1)};
        }
    }
`;
