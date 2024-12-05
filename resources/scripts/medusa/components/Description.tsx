import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface DescProps {
    size?: 'xsmall' | 'small';
    isBold?: boolean;
}

export const Description = styled.span<DescProps>`
    color: ${hexToRGB(medusaColors.desc.text, 0.8)};

    ${(props) => (props.isBold ? tw`!font-bold` : tw`!font-light`)};

    ${(props) =>
        props.size === 'xsmall' &&
        css`
            font-size: 0.8rem;
        `}

    ${(props) =>
        props.size === 'small' &&
        css`
            font-size: 0.95rem;
        `}
`;
