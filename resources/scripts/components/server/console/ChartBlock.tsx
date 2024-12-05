import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface ChartBlockProps {
    title: string;
    legend?: React.ReactNode;
    children: React.ReactNode;
}

const ChartContainer = styled.div`
    ${tw`rounded-xl shadow-lg p-5 relative`};
    background: linear-gradient(
        to right bottom,
        ${hexToRGB(medusaColors.detailBlock.bg1, 0.2)},
        ${hexToRGB(medusaColors.detailBlock.bg2, 1)}
    );
    border-top: 3px solid ${hexToRGB(medusaColors.detailBlock.border, 0.25)}!important;
`;

export default ({ title, legend, children }: ChartBlockProps) => (
    <ChartContainer className='group'>
        <div className={'flex items-center justify-between px-4 py-2'}>
            <h3 className={'font-header transition-colors duration-100 group-hover:text-gray-50'}>{title}</h3>
            {legend && <p className={'text-sm flex items-center'}>{legend}</p>}
        </div>
        <div className={'z-10 ml-2'}>{children}</div>
    </ChartContainer>
);
