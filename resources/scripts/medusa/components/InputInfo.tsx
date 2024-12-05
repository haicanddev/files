import React from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

const InputInfo = ({ children, isError }: { children: React.ReactNode; isError?: boolean }) => {
    const InputInfoWrapper = styled.p`
        ${tw`text-xs px-1 pt-px pb-2`};

        ${isError
            ? css`
                  color: ${hexToRGB(medusaColors.danger, 0.5)}!important;
              `
            : css`
                  color: ${hexToRGB(medusaColors.white, 0.8)}!important;
              `};
    `;

    return <InputInfoWrapper>{children}</InputInfoWrapper>;
};

export default InputInfo;
