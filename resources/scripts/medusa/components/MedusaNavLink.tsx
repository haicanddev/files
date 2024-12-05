import styled from 'styled-components';
import { medusaColors } from '../medusaColors';
import hexToRGB from '../functions/hexToRGB';
import tw from 'twin.macro';

const MedusaNavLink = styled.span`
    ${tw`w-14 h-14 my-1 flex flex-col items-center justify-center text-xs font-bold cursor-pointer rounded-lg duration-300`};
    color: ${medusaColors.nav.link.text};

    &:hover {
        background: ${hexToRGB(medusaColors.nav.link.background, 0.2)};
        color: ${hexToRGB(medusaColors.nav.link.background, 1)}!important;
    }

    & .active {
        ${tw`w-14 py-2 my-1 text-xs font-bold cursor-pointer rounded-lg duration-300`};
        background: ${hexToRGB(medusaColors.nav.link.background, 0.2)};
        color: ${hexToRGB(medusaColors.nav.link.background, 1)}!important;
    }
`;

export default MedusaNavLink;
