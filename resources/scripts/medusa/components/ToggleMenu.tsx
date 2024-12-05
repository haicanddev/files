import styled from 'styled-components';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';
import tw from 'twin.macro';

const ToggleButton = styled.button`
    ${tw`block lg:hidden absolute top-5 right-5 rounded-lg p-1 z-40`};
    background: ${hexToRGB(medusaColors.nav.bars.background, 0.2)};
`;

export default ToggleButton;
