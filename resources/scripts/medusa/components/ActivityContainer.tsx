import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const ActivityContainer = styled.div`
    ${tw`px-10 py-8 bg-cyan-100/50 rounded-xl`};
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.activity.bg1, 0.65)},
        ${hexToRGB(medusaColors.activity.bg2, 0.65)}
    );
    border: 1px solid ${hexToRGB(medusaColors.activity.border, 0.05)};
    backdrop-filter: blur(10px);

    & .activity-line {
        border-left: 2px solid ${hexToRGB(medusaColors.activity.route.border, 0.5)};
    }

    & .title {
        ${tw`relative pl-5`};

        &::before {
            content: '';
            ${tw`w-3 h-3 absolute top-2 z-10 rounded-full`};
            left: -6.65px;
            background: radial-gradient(
                ${hexToRGB(medusaColors.activity.route.circle, 1)},
                ${hexToRGB(medusaColors.activity.route.circle, 1)}
            );
            box-shadow: 0 0 15px ${hexToRGB(medusaColors.activity.route.circle, 1)};
        }
    }
`;

export const ActivityWrapper = styled.div`
    ${tw`grid grid-cols-10 py-4`};

    & .icons {
        ${tw`flex space-x-1 mx-2 transition-colors duration-100`};
        color: ${hexToRGB(medusaColors.activity.text, 0.7)};

        &:hover {
            color: ${hexToRGB(medusaColors.activity.textHover, 0.4)};
        }

        & svg {
            ${tw`px-1 py-px cursor-pointer hover:text-gray-50 h-5 w-auto`};
        }
    }

    & .activity-title {
        ${tw`flex items-center`};
        color: ${hexToRGB(medusaColors.activity.text, 1)};

        & .sub-title {
            color: ${hexToRGB(medusaColors.activity.text, 0.8)};
        }
    }

    & .description {
        ${tw`mt-1 text-sm break-words line-clamp-2 pr-4`};

        & strong {
            ${tw`text-gray-50 font-semibold break-all`};
        }
    }

    & .link {
        ${tw`transition-colors duration-200`};

        &:hover,
        &:active {
            color: ${medusaColors.activity.textHover};
        }
    }
`;
