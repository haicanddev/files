import styled from 'styled-components';
import { medusaColors } from '../medusaColors';
import hexToRGB from '../functions/hexToRGB';
import tw, { css } from 'twin.macro';
import { ServerScheduleStore } from '@/state/server/schedules';

interface ButtonProps {
    btnType: 'normal' | 'danger' | 'warning';
    status?: ServerScheduleStore | undefined | string;
}

export const PowerWrapper = styled.span`
    ${tw`mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5 flex-col rounded-xl p-5 relative`};
    background: linear-gradient(
        to right bottom,
        ${hexToRGB(medusaColors.detailBlock.bg1, 0.2)},
        ${hexToRGB(medusaColors.detailBlock.bg2, 1)}
    );
    border-top: 3px solid ${hexToRGB(medusaColors.detailBlock.border, 0.25)}!important;
`;

export const PowerButton = styled.button<ButtonProps>`
    ${tw`w-full rounded-xl py-3 text-base font-semibold duration-300 flex items-center justify-center`};

    ${(props) => {
        if (typeof props.status === 'string' && props.status === 'running') {
            return css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 0.9)},
                    ${hexToRGB(medusaColors.green, 0.6)}
                ) !important;
            `;
        } else {
            return css``;
        }
    }}

    ${(props) =>
        props.btnType === 'normal' &&
        css`
            background: linear-gradient(
                to left top,
                ${hexToRGB(medusaColors.bblack2, 0.9)},
                ${hexToRGB(medusaColors.powerbtn.normalBg, 0.6)}
            );
        `}

    ${(props) =>
        props.btnType === 'warning' &&
        css`
            background: linear-gradient(
                to left top,
                ${hexToRGB(medusaColors.bblack2, 0.9)},
                ${hexToRGB(medusaColors.powerbtn.warningBg, 0.6)}
            );
        `}

    ${(props) =>
        props.btnType === 'danger' &&
        css`
            background: linear-gradient(
                to left top,
                ${hexToRGB(medusaColors.bblack2, 1)},
                ${hexToRGB(medusaColors.powerbtn.dangerBg, 0.6)}
            );
        `}

    &:hover {
        ${(props) =>
            props.btnType === 'normal' &&
            css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 1)},
                    ${hexToRGB(medusaColors.powerbtn.normalBg, 0.8)}
                );
            `}

        ${(props) =>
            props.btnType === 'warning' &&
            css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 1)},
                    ${hexToRGB(medusaColors.powerbtn.warningBg, 0.8)}
                );
            `}

        ${(props) =>
            props.btnType === 'danger' &&
            css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 1)},
                    ${hexToRGB(medusaColors.powerbtn.dangerBg, 0.8)}
                );
            `}
    }

    &:disabled {
        ${tw`cursor-not-allowed`};

        ${(props) =>
            props.btnType === 'normal' &&
            css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 0.6)},
                    ${hexToRGB(medusaColors.powerbtn.normalBg, 0.4)}
                );
            `}

        ${(props) =>
            props.btnType === 'warning' &&
            css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 0.6)},
                    ${hexToRGB(medusaColors.powerbtn.warningBg, 0.4)}
                );
            `}

        ${(props) =>
            props.btnType === 'danger' &&
            css`
                background: linear-gradient(
                    to left top,
                    ${hexToRGB(medusaColors.bblack2, 0.6)},
                    ${hexToRGB(medusaColors.powerbtn.dangerBg, 0.4)}
                );
            `}
    }
`;
