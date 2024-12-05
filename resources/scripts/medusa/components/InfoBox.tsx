import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface InfoProps {
    textWhite?: boolean;
}

export const InfoBox = styled.div<InfoProps>`
    ${tw`mt-6 flex items-center rounded-lg relative`};
    background: linear-gradient(to right, ${hexToRGB(medusaColors.infobox.bg, 0.2)}, transparent);
    border-left: 1px solid ${hexToRGB(medusaColors.infobox.border, 0.8)};

    ${(props) =>
        props.textWhite
            ? css`
                  color: ${hexToRGB(medusaColors.infobox.textWhite, 0.8)};
              `
            : css`
                  color: ${hexToRGB(medusaColors.infobox.text, 1)};
              `};

    &::before {
        content: '';
        ${tw`absolute top-0 h-[1px] left-[4px]`};
        width: 80%;
        background: linear-gradient(to right, ${hexToRGB(medusaColors.infobox.border, 0.3)}, transparent);
    }

    &::after {
        content: '';
        ${tw`absolute bottom-0 h-[1px] left-[4px]`};
        width: 80%;
        background: linear-gradient(to right, ${hexToRGB(medusaColors.infobox.border, 0.3)}, transparent);
    }

    & .infobox-desc {
        ${tw`text-xs`};
        color: ${hexToRGB(medusaColors.infobox.textDesc, 0.7)};
    }

    & .box-icon {
        ${tw`w-8 h-8 p-1 px-3 lg:px-0 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200`};
        background: linear-gradient(to bottom, ${hexToRGB(medusaColors.box.icon.bg, 0.8)}, transparent);
        border-top: 1px solid ${hexToRGB(medusaColors.box.icon.border, 0.7)};
        color: ${hexToRGB(medusaColors.white, 0.8)};
    }
`;
