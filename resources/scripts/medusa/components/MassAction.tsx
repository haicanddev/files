import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const MassAction = styled.div`
    ${tw`flex items-center space-x-4 pointer-events-auto rounded-xl p-4`};
    background: linear-gradient(
        to right bottom,
        ${hexToRGB(medusaColors.rowFile.bg1, 0.2)},
        ${hexToRGB(medusaColors.rowFile.bg2, 0.8)}
    );
    border: 1px solid ${hexToRGB(medusaColors.rowFile.border, 0.1)};
    backdrop-filter: blur(10px);
`;
