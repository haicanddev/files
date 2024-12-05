import React from 'react';
import styled from 'styled-components';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';
import tw from 'twin.macro';

const FooterWrapper = styled.div`
    ${tw`text-sm text-center mt-20 duration-300`};
    color: ${hexToRGB(medusaColors.white, 0.7)};

    & a {
        ${tw`no-underline duration-300 font-semibold`};
        color: ${hexToRGB(medusaColors.white2, 0.5)};

        &:hover {
            color: ${hexToRGB(medusaColors.white2, 0.8)};
        }
    }
`;

const Footer = ({ children }: { children: React.ReactNode }) => {
    return <FooterWrapper>{children}</FooterWrapper>;
};

export default Footer;
