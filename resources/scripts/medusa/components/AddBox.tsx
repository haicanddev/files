import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const AddBox = styled.div`
    ${tw`flex items-center justify-center w-full h-full max-h-[400px] rounded-xl my-auto cursor-pointer transition-all duration-200`};
    border: 2px dashed ${hexToRGB(medusaColors.addbox.border, 0.1)};
    color: ${hexToRGB(medusaColors.addbox.text, 0.3)};
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.addbox.bg, 0.06)},
        ${hexToRGB(medusaColors.addbox.bg, 0.05)}
    );
    backdrop-filter: blur(10px);

    &:hover {
        border: 2px dashed ${hexToRGB(medusaColors.addbox.border, 0.3)};
        color: ${hexToRGB(medusaColors.addbox.text, 0.5)};
        background: linear-gradient(
            to bottom right,
            ${hexToRGB(medusaColors.addbox.bg, 0.1)},
            ${hexToRGB(medusaColors.addbox.bg, 0.1)}
        );
    }
`;
