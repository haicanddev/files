import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const MedusaContentBox = styled.div`
    ${tw`rounded-xl relative z-30 overflow-hidden`};
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.contentBox.background, 0.8)},
        ${hexToRGB(medusaColors.contentBox.background2, 0.8)}
    );
    border: 1px solid ${hexToRGB(medusaColors.contentBox.borderColor, 0.6)};

    & .color1 {
        ${tw`w-48 h-48 absolute -top-10 -left-10 z-10 rounded-full opacity-10`};
        background: radial-gradient(circle, ${hexToRGB(medusaColors.contentBox.bubble.color1, 0.2)}, transparent 70%);
        pointer-events: none;
    }

    & .color2 {
        ${tw`w-48 h-48 absolute -top-5 -left-3 z-10 rounded-full opacity-20`};
        background: radial-gradient(circle, ${hexToRGB(medusaColors.contentBox.bubble.color2, 0.6)}, transparent 70%);
        pointer-events: none;
    }

    & .color3 {
        ${tw`w-72 h-72 absolute -bottom-20 -right-20 z-10 rounded-full opacity-40`};
        background: radial-gradient(circle, ${hexToRGB(medusaColors.contentBox.bubble.color1, 0.2)}, transparent 70%);
        pointer-events: none;
    }

    & .color4 {
        ${tw`w-72 h-72 absolute -bottom-16 -right-16 z-10 rounded-full opacity-20`};
        background: radial-gradient(circle, ${hexToRGB(medusaColors.contentBox.bubble.color2, 0.6)}, transparent 70%);
        pointer-events: none;
    }
`;

export const MedusaContentBody = styled.div`
    ${tw`p-8 z-40 relative`};

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
`;
