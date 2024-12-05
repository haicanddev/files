import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-xl no-underline items-center p-4 transition-all duration-200 overflow-hidden`};
    color: ${medusaColors.white}!important;
    background: ${hexToRGB(medusaColors.rowbox.background, 0.2)}!important;
    border-top: 2px solid ${hexToRGB(medusaColors.rowbox.borderColor, 0.05)};

    ${(props) =>
        props.$hoverable !== false &&
        css`
            &:hover {
                border-top: 2px solid ${hexToRGB(medusaColors.rowbox.borderColor, 0.1)};
            }
        `};

    & .icon {
        ${tw`flex items-center justify-center p-3 w-12 h-12 rounded-full`};
        background: linear-gradient(
            to bottom,
            ${hexToRGB(medusaColors.rowbox.icon.bg, 0.8)},
            ${hexToRGB(medusaColors.rowbox.icon.bg, 0)}
        );
        border-top: 2px solid ${hexToRGB(medusaColors.rowbox.icon.border, 0.5)};
    }

    & .trash {
        ${tw`p-1 w-8 h-8 rounded-full`};
        background: linear-gradient(
            to bottom,
            ${hexToRGB(medusaColors.rowbox.icon.bgTrash, 0.6)},
            ${hexToRGB(medusaColors.rowbox.icon.bgTrash, 0.1)}
        );
        border-top: 2px solid ${hexToRGB(medusaColors.rowbox.icon.borderTrash, 0.8)};

        &:hover {
            background: linear-gradient(
                to bottom,
                ${hexToRGB(medusaColors.rowbox.icon.bgTrash, 0.8)},
                ${hexToRGB(medusaColors.rowbox.icon.bgTrash, 0.3)}
            );
            border-top: 2px solid ${hexToRGB(medusaColors.rowbox.icon.borderTrash, 0.9)};
        }
    }

    & .code {
        ${tw`font-mono py-1 px-2 rounded-xl`};
        background: linear-gradient(
            to bottom,
            ${hexToRGB(medusaColors.rowbox.codeBg, 1)},
            ${hexToRGB(medusaColors.rowbox.codeBg, 0.5)}
        ) !important;
        border-top: 1px solid ${hexToRGB(medusaColors.rowbox.codeBorder, 0.3)}!important;
    }
`;
