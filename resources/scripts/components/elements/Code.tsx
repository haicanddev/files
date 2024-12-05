import React from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';

interface CodeProps {
    isLight?: boolean | undefined;
    className?: string;
    children: React.ReactChild | React.ReactFragment | React.ReactPortal;
    tagType?: 'p';
}

const StyledCode = styled.code`
    ${tw`font-mono py-1 px-2 rounded-xl`};
    background: linear-gradient(
        to bottom,
        ${hexToRGB(medusaColors.code.bg, 1)},
        ${hexToRGB(medusaColors.code.bg, 0.5)}
    ) !important;
    border-top: 1px solid ${hexToRGB(medusaColors.code.border, 0.3)}!important;

    ${(props: CodeProps) =>
        props.isLight &&
        css`
            border-top: 1px solid ${hexToRGB(medusaColors.code.border, 0.5)}!important;
            background: linear-gradient(
                to bottom,
                ${hexToRGB(medusaColors.code.bgLight, 0.3)},
                ${hexToRGB(medusaColors.code.bgLight, 0.12)}
            ) !important;
        `};
`;

const StyledCodeP = styled.p`
    ${tw`font-mono py-1 px-2 rounded-xl`};
    background: linear-gradient(
        to bottom,
        ${hexToRGB(medusaColors.code.bg, 1)},
        ${hexToRGB(medusaColors.code.bg, 0.5)}
    ) !important;
    border-top: 1px solid ${hexToRGB(medusaColors.code.border, 0.3)}!important;

    ${(props: CodeProps) =>
        props.isLight &&
        css`
            border-top: 1px solid ${hexToRGB(medusaColors.code.border, 0.5)}!important;
            background: linear-gradient(
                to bottom,
                ${hexToRGB(medusaColors.code.bgLight, 0.3)},
                ${hexToRGB(medusaColors.code.bgLight, 0.12)}
            ) !important;
        `};
`;

export default ({ children, isLight, tagType }: CodeProps) => {
    return tagType === 'p' ? (
        <StyledCodeP {...(isLight !== undefined && { isLight: isLight })}>{children}</StyledCodeP>
    ) : (
        <StyledCode {...(isLight !== undefined && { isLight: isLight })}>{children}</StyledCode>
    );
};
