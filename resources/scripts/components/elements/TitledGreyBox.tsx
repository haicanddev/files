import React, { memo } from 'react';
import tw from 'twin.macro';
import isEqual from 'react-fast-compare';
import styled from 'styled-components';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import { Title } from '@/medusa/components/Title';

interface Props {
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const TitledContainer = styled.div`
    ${tw`rounded-xl shadow-md p-5 relative overflow-hidden`};
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.contentBox.background, 0.8)},
        ${hexToRGB(medusaColors.contentBox.background2, 0.8)}
    );
    backdrop-filter: blur(20px);
    border: 1px solid ${hexToRGB(medusaColors.contentBox.borderColor, 0.6)};

    & .reinstall-desc {
        ${tw`text-sm`};
        color: ${hexToRGB(medusaColors.white, 1)};

        & strong {
            color: ${hexToRGB(medusaColors.white2, 0.6)};
        }
    }

    & .redonly {
        ${tw`absolute top-0 left-0 w-full h-full z-20 cursor-not-allowed`};
    }
`;

const TitledGreyBox = ({ title, children, className }: Props) => (
    <TitledContainer className={className}>
        <Title>{title}</Title>
        <div css={tw`pt-3`}>{children}</div>
    </TitledContainer>
);

export default memo(TitledGreyBox, isEqual);
