import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';

interface Props {
    hideDropdownArrow?: boolean;
}

const Select = styled.select<Props>`
    ${tw`shadow-none block p-3 pr-8 rounded-xl border w-full text-sm transition-colors duration-150 ease-linear`};

    &,
    &:hover:not(:disabled),
    &:focus {
        ${tw`outline-none`};
    }

    -webkit-appearance: none;
    -moz-appearance: none;
    background-size: 1rem;
    background-repeat: no-repeat;
    background-position-x: calc(100% - 0.75rem);
    background-position-y: center;

    &::-ms-expand {
        display: none;
    }

    ${(props) =>
        !props.hideDropdownArrow &&
        css`
            background-color: ${hexToRGB(medusaColors.select.bg, 1)};
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='%23C3D1DF' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3e%3c/svg%3e ");
            border: 1px solid ${hexToRGB(medusaColors.select.border, 0.1)};

            &:hover:not(:disabled),
            &:focus {
                border: 1px solid ${hexToRGB(medusaColors.select.border, 0.3)};
            }
        `};

    & option {
        ${tw`rounded-xl`};
        background-color: ${hexToRGB(medusaColors.select.bg, 1)};
        border: 1px solid ${hexToRGB(medusaColors.select.border, 0.1)};
    }
`;

export default Select;
