import styled from 'styled-components';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const DescriptionP = styled.p`
    color: ${hexToRGB(medusaColors.desc.textP, 0.5)};
`;
