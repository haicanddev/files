import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import styled from 'styled-components';
import tw from 'twin.macro';

const Label = styled.label<{ isLight?: boolean }>`
    ${tw`block text-xs uppercase mb-1 sm:mb-2`};
    color: ${hexToRGB(medusaColors.label.darkText, 1)}!important;

    ${(props) => props.isLight && `color: ${hexToRGB(medusaColors.label.lightText, 0.8)}!important;`};
`;

export default Label;
