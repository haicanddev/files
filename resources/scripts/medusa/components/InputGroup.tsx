import styled from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

export const InputGroup = styled.div`
    ${tw`flex items-center rounded-xl`};
    background: ${hexToRGB(medusaColors.input.group.bg, 1)};

    & .icon {
        ${tw`h-full w-10 h-10 px-3`};
    }
`;
