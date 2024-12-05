import styled from 'styled-components';
import hexToRGB from '../functions/hexToRGB';
import tw from 'twin.macro';
import { medusaColors } from '../medusaColors';

export const StyledPre = styled.pre`
    ${tw`text-sm rounded-xl py-2 px-4 font-mono leading-relaxed overflow-x-scroll whitespace-pre-wrap`};
    background: linear-gradient(
        to bottom,
        ${hexToRGB(medusaColors.code.bg, 1)},
        ${hexToRGB(medusaColors.code.bg, 0.5)}
    ) !important;
    border-top: 1px solid ${hexToRGB(medusaColors.code.border, 0.3)}!important;
`;
