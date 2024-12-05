import DialogComponent from './Dialog';
import DialogFooter from './DialogFooter';
import DialogIcon from './DialogIcon';
import ConfirmationDialog from './ConfirmationDialog';
import styled from 'styled-components';
import tw from 'twin.macro';
import { medusaColors } from '@/medusa/medusaColors';
import hexToRGB from '@/medusa/functions/hexToRGB';

const Dialog = Object.assign(DialogComponent, {
    Confirm: ConfirmationDialog,
    Footer: DialogFooter,
    Icon: DialogIcon,
});

export { Dialog };
export * from './types.d';
export * from './context';
export const Container = styled.div`
    ${tw`flex h-full w-full items-center justify-center p-4 text-center`};

    & .panel {
        ${tw`relative !rounded-xl max-w-xl w-full mx-auto shadow-lg text-left`};
        background: linear-gradient(
            to bottom right,
            ${hexToRGB(medusaColors.contentBox.background, 1)},
            ${hexToRGB(medusaColors.contentBox.background2, 1)}
        );
        border: 1px solid ${hexToRGB(medusaColors.contentBox.borderColor, 0.6)};
    }

    & .title {
        ${tw`mb-4 text-2xl font-extrabold`};

        background: linear-gradient(
            to right,
            ${hexToRGB(medusaColors.title.c1, 1)},
            ${hexToRGB(medusaColors.title.c2, 0.7)},
            ${hexToRGB(medusaColors.title.c3, 1)},
            ${hexToRGB(medusaColors.title.c1, 1)}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    & .close_icon {
        ${tw`w-6 h-6 p-1 group-hover:rotate-90 transition-transform duration-200 cursor-pointer rounded-full`};
        background: linear-gradient(
            to bottom,
            ${hexToRGB(medusaColors.dialog.close.bg, 0.6)},
            ${hexToRGB(medusaColors.dialog.close.bg, 0.08)}
        );
        color: ${hexToRGB(medusaColors.dialog.close.text, 0.8)};
        border-top: 1px solid ${hexToRGB(medusaColors.dialog.close.border, 0.8)};

        &:hover {
            background: linear-gradient(
                to bottom,
                ${hexToRGB(medusaColors.dialog.close.bg, 0.7)},
                ${hexToRGB(medusaColors.dialog.close.bg, 0.1)}
            );
            color: ${hexToRGB(medusaColors.dialog.close.text, 1)};
            border-top: 1px solid ${hexToRGB(medusaColors.dialog.close.border, 1)};
        }
    }

    & .dialog_icon {
        ${tw`flex items-center justify-center w-10 h-10 rounded-full mr-4`};

        &.danger {
            ${tw`bg-red-500 text-red-50`};
        }

        &.warning {
            ${tw`bg-yellow-600 text-yellow-50`};
        }

        &.success {
            ${tw`bg-green-600 text-green-50`};
        }

        &.info {
            ${tw`bg-primary-500 text-primary-50`};
        }
    }

    & .footer {
        ${tw`px-6 py-3 flex items-center justify-end space-x-3 rounded-b-xl`};
        background: linear-gradient(
            to bottom right,
            ${hexToRGB(medusaColors.dialog.background, 1)},
            ${hexToRGB(medusaColors.dialog.background2, 1)}
        );
    }
`;
