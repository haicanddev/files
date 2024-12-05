import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import styled from 'styled-components';
import tw from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`w-48 h-screen`};
    background: ${medusaColors.subnav.background};

    & > div {
        ${tw`h-screen flex flex-col justify-center text-sm`};

        & > a,
        & > div {
            ${tw`inline-block py-3 px-4 text-neutral-300 no-underline whitespace-nowrap transition-all duration-200 border-l-[3px] border-transparent`};

            &:hover {
                ${tw`text-neutral-100 font-semibold`};
                border-left: 3px solid ${medusaColors.subnav.borderColor};
                background: linear-gradient(to right, ${hexToRGB(medusaColors.subnav.borderColor, 0.5)}, transparent);
            }

            &:active,
            &.active {
                ${tw`text-neutral-100 font-semibold`};
                border-left: 3px solid ${medusaColors.subnav.borderColor};
                background: linear-gradient(to right, ${hexToRGB(medusaColors.subnav.borderColor, 0.5)}, transparent);
            }
        }
    }
`;

export default SubNavigation;
