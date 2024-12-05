import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface ProgressCircleProps {
    size?: number;
    value: number;
    maxValue: number;
    unusedBg: string;
    gradientStart: string;
    gradientEnd: string;
    textColor: string;
    textValue: string;
}

const Container = styled.div`
    ${tw`flex items-center justify-center w-[100px] h-[100px] md:w-[128px] md:h-[128px]`};
    position: relative;
`;

const Circle = styled.circle`
    transition: stroke-dashoffset 0.55s ease-in-out;
    transform-origin: center;
`;

const ProgressCircle = ({
    size,
    value,
    maxValue,
    unusedBg,
    gradientStart,
    gradientEnd,
    textColor,
    textValue,
}: ProgressCircleProps) => {
    const radius = size || 58;
    const circumference = 2 * Math.PI * radius;

    let progress = circumference - (value / maxValue) * circumference;
    if (value > maxValue) {
        progress = 0;
    }

    const gradientId = `progress-gradient-${value}-${maxValue}`;

    return (
        <Container>
            <svg width='128' height='128' viewBox='0 0 128 128'>
                <defs>
                    <linearGradient id={gradientId} x1='0' y1='0' x2='1' y2='1'>
                        <stop offset='0%' stopColor={gradientStart} />
                        <stop offset='100%' stopColor={gradientEnd} />
                    </linearGradient>
                </defs>
                <Circle
                    cx='64'
                    cy='64'
                    r={radius}
                    fill='none'
                    stroke={unusedBg}
                    strokeWidth='12'
                    strokeDasharray={circumference}
                />
                <Circle
                    cx='64'
                    cy='64'
                    r={radius}
                    fill='none'
                    stroke={`url(#${gradientId})`}
                    strokeWidth='12'
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    strokeLinecap='round'
                />
                <text x='64' y='70' textAnchor='middle' fontSize='14px' fontWeight='bold' fill={textColor}>
                    {textValue}
                </text>
            </svg>
        </Container>
    );
};

export default ProgressCircle;
