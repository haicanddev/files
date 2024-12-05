import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const CheatseetCard = styled.div`
    ${tw`flex w-full mt-5`};

    & .cheatseet-1 {
        ${tw`md:w-1/2 h-full`};
        background-color: ${hexToRGB(medusaColors.cheatseet.bg1, 0.09)};
        color: ${hexToRGB(medusaColors.cheatseet.textColor, 0.8)};
    }

    & .cheatseet-2 {
        ${tw`md:w-1/2 h-full`};
        background-color: ${hexToRGB(medusaColors.cheatseet.bg1, 0.2)};
        color: ${hexToRGB(medusaColors.cheatseet.textColor, 0.8)};
    }
`;

const CheatCol1 = styled.div`
    ${tw`flex py-4 px-6`};
    background-color: ${hexToRGB(medusaColors.cheatseet.col1Bg, 0.2)};
    color: ${hexToRGB(medusaColors.cheatseet.textColor, 0.8)};
`;

const CheatCol2 = styled.div`
    ${tw`flex py-4 px-6`};
    background-color: ${hexToRGB(medusaColors.cheatseet.col1Bg, 0.5)};
    color: ${hexToRGB(medusaColors.cheatseet.textColor, 0.8)};
`;

export default () => {
    return (
        <CheatseetCard>
            <div className='cheatseet-1'>
                <div css={tw`flex flex-col`}>
                    <h2 css={tw`py-4 px-6 font-bold`}>Examples</h2>
                    <CheatCol1>
                        <div css={tw`w-1/2`}>*/5 * * * *</div>
                        <div css={tw`w-1/2`}>every 5 minutes</div>
                    </CheatCol1>
                    <CheatCol2>
                        <div css={tw`w-1/2`}>0 */1 * * *</div>
                        <div css={tw`w-1/2`}>every hour</div>
                    </CheatCol2>
                    <CheatCol1>
                        <div css={tw`w-1/2`}>0 8-12 * * *</div>
                        <div css={tw`w-1/2`}>hour range</div>
                    </CheatCol1>
                    <CheatCol2>
                        <div css={tw`w-1/2`}>0 0 * * *</div>
                        <div css={tw`w-1/2`}>once a day</div>
                    </CheatCol2>
                    <CheatCol1>
                        <div css={tw`w-1/2`}>0 0 * * MON</div>
                        <div css={tw`w-1/2`}>every Monday</div>
                    </CheatCol1>
                </div>
            </div>
            <div className='cheatseet-2'>
                <h2 css={tw`py-4 px-6 font-bold`}>Special Characters</h2>
                <div css={tw`flex flex-col`}>
                    <CheatCol1>
                        <div css={tw`w-1/2`}>*</div>
                        <div css={tw`w-1/2`}>any value</div>
                    </CheatCol1>
                    <CheatCol2>
                        <div css={tw`w-1/2`}>,</div>
                        <div css={tw`w-1/2`}>value list separator</div>
                    </CheatCol2>
                    <CheatCol1>
                        <div css={tw`w-1/2`}>-</div>
                        <div css={tw`w-1/2`}>range values</div>
                    </CheatCol1>
                    <CheatCol2>
                        <div css={tw`w-1/2`}>/</div>
                        <div css={tw`w-1/2`}>step values</div>
                    </CheatCol2>
                </div>
            </div>
        </CheatseetCard>
    );
};
