import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const SwitcherContainer = styled.div`
    ${tw`p-4 rounded-xl`};
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.box.bg1, 0.8)},
        ${hexToRGB(medusaColors.box.bg2, 0.8)}
    );
    border: 1px solid ${hexToRGB(medusaColors.box.border, 0.1)};
`;
