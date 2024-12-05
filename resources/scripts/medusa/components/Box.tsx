import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface BoxProps {
    isPrimary?: boolean;
    v2?: boolean;
    light?: boolean;
}

export const Box = styled.div<BoxProps>`
    ${(props) =>
        props.v2 ? tw`rounded-xl max-w-none w-full p-5` : tw`rounded-xl max-w-none lg:max-w-[400px] w-full p-5`}

    ${(props) =>
        props.light
            ? css`
                  background: linear-gradient(
                      to right bottom,
                      ${hexToRGB(medusaColors.box.bg3, 0.07)},
                      ${hexToRGB(medusaColors.box.bg4, 0.8)}
                  );
                  border: 1px solid ${hexToRGB(medusaColors.box.border, 0.05)}!important;
              `
            : css`
                  background: linear-gradient(
                      to right bottom,
                      ${hexToRGB(medusaColors.box.bg1, 0.8)},
                      ${hexToRGB(medusaColors.box.bg2, 0.5)}
                  );
              `}
    backdrop-filter: blur(10px);
    ${(props) =>
        props.isPrimary
            ? css`
                  border-top: 2px solid ${hexToRGB(medusaColors.box.border, 0.4)};
              `
            : css`
                  border-top: 2px solid ${hexToRGB(medusaColors.box.border, 0.1)};
              `}

    & .box-icon {
        ${tw`w-10 h-10 p-1 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200`};
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.icon.bg, 0.2)}, transparent);
        border-top: 1px solid ${hexToRGB(medusaColors.box.icon.border, 0.2)};
        color: ${hexToRGB(medusaColors.box.icon.text, 0.6)};

        &:hover {
            background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.icon.bg, 0.4)}, transparent);
            border-top: 1px solid ${hexToRGB(medusaColors.box.icon.border, 0.3)};
            color: ${hexToRGB(medusaColors.box.icon.text, 1)};
        }
    }

    & .box-icon-primary {
        ${tw`w-10 h-10 p-1 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200 cursor-not-allowed`};
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.icon.bg, 0.7)}, transparent);
        border-top: 1px solid ${hexToRGB(medusaColors.box.icon.border, 0.8)};
        color: ${hexToRGB(medusaColors.box.icon.textPrimary, 0.8)};
    }

    & .backup-failed,
    & .backup-success,
    & .backup-locked {
        ${tw`py-px px-2 rounded-lg text-xs`};
    }

    & .backup-success {
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.status.success, 0.5)}, transparent);
        border: 1px solid ${hexToRGB(medusaColors.box.status.success, 0.3)};
        color: ${hexToRGB(medusaColors.box.status.textSucces, 1)};
    }

    & .backup-locked {
        ${tw`flex items-center`};
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.status.locked, 0.2)}, transparent);
        border: 1px solid ${hexToRGB(medusaColors.box.status.locked, 0.1)};
        color: ${hexToRGB(medusaColors.box.status.textLocked, 0.6)};
    }

    & .backup-failed {
        ${tw`flex items-center`};
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.status.failed, 0.3)}, transparent);
        border: 1px solid ${hexToRGB(medusaColors.box.status.failed, 0.3)};
        color: ${hexToRGB(medusaColors.box.status.textFailed, 1)};
    }

    & .box-details {
        ${tw`p-3 rounded-xl`};
        background: linear-gradient(
            to right bottom,
            ${hexToRGB(medusaColors.contentBox.background, 1)},
            ${hexToRGB(medusaColors.contentBox.background2, 1)}
        );
        border: 1px solid ${hexToRGB(medusaColors.contentBox.borderColor, 0.3)};
    }

    & .backup-details {
        ${tw`text-sm`};

        & li > span {
            ${tw`text-xs`};
            color: ${hexToRGB(medusaColors.white, 0.9)};
        }

        & li > span > strong {
            ${tw`text-xs font-semibold`};
            color: ${hexToRGB(medusaColors.box.details.textStrong, 1)};
        }
    }

    & .btn-menu {
        ${tw`flex items-center justify-center justify-around mt-5 rounded-xl py-2`};
        background: linear-gradient(
            to right bottom,
            ${hexToRGB(medusaColors.contentBox.background, 1)},
            ${hexToRGB(medusaColors.contentBox.background2, 1)}
        );
        border: 1px solid ${hexToRGB(medusaColors.contentBox.borderColor, 0.3)};

        & .menu-element {
            ${tw`w-[72px] h-10 rounded-xl p-1 cursor-pointer transition-colors duration-200 ease-out`};
            background: linear-gradient(
                to right bottom,
                ${hexToRGB(medusaColors.box.menuElement.bg1, 0.1)},
                ${hexToRGB(medusaColors.box.menuElement.bg2, 0.07)}
            );
            border: 1px solid ${hexToRGB(medusaColors.box.menuElement.border, 0.1)};
            color: ${hexToRGB(medusaColors.box.menuElement.text, 0.8)};

            &:hover {
                background: linear-gradient(
                    to right bottom,
                    ${hexToRGB(medusaColors.box.menuElement.bg1, 0.3)},
                    ${hexToRGB(medusaColors.box.menuElement.bg2, 0.2)}
                );
                border: 1px solid ${hexToRGB(medusaColors.box.menuElement.border, 0.2)};
                color: ${hexToRGB(medusaColors.box.menuElement.text, 0.9)};
            }
        }

        & .menu-element2 {
            ${tw`w-[72px] h-10 rounded-xl p-1 cursor-pointer transition-colors duration-200 ease-out cursor-not-allowed`};
            background: linear-gradient(
                to right bottom,
                ${hexToRGB(medusaColors.box.menuElement.bg1, 0.1)},
                ${hexToRGB(medusaColors.box.menuElement.bg2, 0.07)}
            );
            border: 1px solid ${hexToRGB(medusaColors.box.menuElement.border, 0.1)};
            color: ${hexToRGB(medusaColors.box.menuElement.text, 0.8)};
        }
    }

    & .user-avatar {
        ${tw`w-10 h-10 rounded-full overflow-hidden hidden md:block uppercase text-center text-3xl font-extrabold mr-3`};
        color: ${hexToRGB(medusaColors.user.avatar.text, 0.7)};
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.user.avatar.bg, 0.4)}, transparent);
        border-top: 1px solid ${hexToRGB(medusaColors.user.avatar.bg, 0.7)};
    }

    & .user-desc {
        ${tw`flex items-center justify-between lg:justify-around rounded-xl mt-8 py-1 px-2 lg:px-0`};
        background: linear-gradient(
            to bottom right,
            ${hexToRGB(medusaColors.user.box.bg1, 1)},
            ${hexToRGB(medusaColors.user.box.bg2, 1)}
        );
        border: 1px solid ${hexToRGB(medusaColors.user.box.border, 0.1)};

        & .menu-element {
            ${tw`w-12 lg:w-[72px] h-10 rounded-xl p-1 cursor-pointer transition-colors duration-200 ease-out`};
            background: linear-gradient(
                to right bottom,
                ${hexToRGB(medusaColors.box.menuElement.bg1, 0.1)},
                ${hexToRGB(medusaColors.box.menuElement.bg2, 0.07)}
            );
            border: 1px solid ${hexToRGB(medusaColors.box.menuElement.border, 0.1)};
            color: ${hexToRGB(medusaColors.box.menuElement.text, 0.8)};

            &:hover {
                background: linear-gradient(
                    to right bottom,
                    ${hexToRGB(medusaColors.box.menuElement.bg1, 0.3)},
                    ${hexToRGB(medusaColors.box.menuElement.bg2, 0.2)}
                );
                border: 1px solid ${hexToRGB(medusaColors.box.menuElement.border, 0.2)};
                color: ${hexToRGB(medusaColors.box.menuElement.text, 0.9)};
            }
        }

        & .user-desc-title {
            ${tw`text-2xs uppercase`};
            color: ${hexToRGB(medusaColors.user.text, 0.8)};
        }

        & .fa-disabled,
        & .fa-enabled {
            ${tw`text-2xs uppercase`};
        }

        & .fa-disabled {
            color: ${hexToRGB(medusaColors.danger, 0.7)};
        }

        & .fa-enabled {
            color: ${hexToRGB(medusaColors.white2, 0.7)};
        }
    }

    & .schedule-status-active {
        ${tw`text-xs rounded-xl px-2 py-px`};
        color: ${hexToRGB(medusaColors.lime, 0.8)};
        background: linear-gradient(
            to right,
            ${hexToRGB(medusaColors.lime, 0.2)},
            ${hexToRGB(medusaColors.bblack2, 1)}
        );
        border: 1px solid ${hexToRGB(medusaColors.white, 0.08)};
        box-shadow: 0 0 15px ${hexToRGB(medusaColors.lime, 0.35)};
    }

    & .schedule-status-inactive {
        ${tw`text-xs rounded-xl px-2 py-px`};
        color: ${hexToRGB(medusaColors.danger, 0.6)};
        background: linear-gradient(
            to right,
            ${hexToRGB(medusaColors.danger, 0.3)},
            ${hexToRGB(medusaColors.bblack2, 0.6)}
        );
        border: 1px solid ${hexToRGB(medusaColors.white, 0.08)};
        box-shadow: 0 0 15px ${hexToRGB(medusaColors.danger, 0.35)};
    }

    & .schedule-status-processing {
        ${tw`text-xs rounded-xl px-2 py-px`};
        color: ${hexToRGB(medusaColors.yellow, 0.6)};
        background: linear-gradient(
            to right,
            ${hexToRGB(medusaColors.yellow, 0.3)},
            ${hexToRGB(medusaColors.bblack2, 0.6)}
        );
        border: 1px solid ${hexToRGB(medusaColors.white, 0.08)};
        box-shadow: 0 0 15px ${hexToRGB(medusaColors.yellow, 0.35)};
    }

    & .file_row {
        ${tw`flex items-center cursor-pointer rounded-xl mb-1 text-sm no-underline z-[-1]`};
        background: linear-gradient(
            to right,
            ${hexToRGB(medusaColors.rowFile.bg1, 0.07)},
            ${hexToRGB(medusaColors.rowFile.bg2, 0.5)}
        );
        border: 1px solid ${hexToRGB(medusaColors.rowFile.border, 0.06)};

        & > .details {
            ${tw`flex flex-1 items-center no-underline px-4 py-2 overflow-hidden truncate`};
            color: ${hexToRGB(medusaColors.rowFile.text, 0.8)};

            &:not(a) {
                ${tw`cursor-default`};
            }
        }
    }
`;
