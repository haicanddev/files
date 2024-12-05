import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface TitleProps {
    hasLine?: boolean;
    isSmall?: boolean;
    haveBg?: boolean;
}

export const Title = styled.h3<TitleProps>`
    ${(props) => (props.isSmall ? tw`text-lg font-bold` : tw`text-2xl font-extrabold mb-4`)};

    background: linear-gradient(
        to right,
        ${hexToRGB(medusaColors.title.c1, 1)},
        ${hexToRGB(medusaColors.title.c2, 0.7)},
        ${hexToRGB(medusaColors.title.c3, 1)},
        ${hexToRGB(medusaColors.title.c1, 1)}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    ${(props) =>
        props.haveBg &&
        css`
            ${tw`rounded-xl px-3 py-px !font-normal`};
            background: linear-gradient(
                to right,
                ${hexToRGB(medusaColors.white2, 0.2)},
                ${hexToRGB(medusaColors.bblack2, 1)}
            );
            -webkit-text-fill-color: ${hexToRGB(medusaColors.white, 0.8)};
            border: 1px solid ${hexToRGB(medusaColors.white, 0.05)};
        `}

    ${(props) =>
        props.hasLine &&
        css`
            ${tw`mt-8 mb-2 text-2xl flex items-center`};

            &::before {
                content: '';
                ${tw`w-3 h-3 rounded-full block mr-3`};
                background: ${hexToRGB(medusaColors.title.hasLine.bg, 1)};
                box-shadow: 0 0 15px ${hexToRGB(medusaColors.title.hasLine.bg, 0.7)};
            }
        `}
`;
