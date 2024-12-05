import React, { useMemo } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import tw from 'twin.macro';
import Label from '@/components/elements/Label';
import Input from '@/components/elements/Input';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import { Description } from '@/medusa/components/Description';

const ToggleContainer = styled.div`
    ${tw`relative select-none w-12 leading-normal`};

    & > input[type='checkbox'] {
        ${tw`hidden`};

        &:checked + label {
            ${tw`shadow-none`};
            background: ${hexToRGB(medusaColors.input.switch.bg, 0.5)};
            border: 1px solid ${hexToRGB(medusaColors.input.switch.border, 0.5)};
        }

        &:checked + label:before {
            right: 0.125rem;
        }
    }

    & > label {
        ${tw`mb-0 block overflow-hidden cursor-pointer rounded-full h-6 shadow-inner`};
        transition: all 75ms linear;
        background: ${hexToRGB(medusaColors.input.switch.bg, 0.15)};
        border: 1px solid ${hexToRGB(medusaColors.input.switch.border, 0.1)};

        &::before {
            ${tw`absolute block h-5 w-5 rounded-full`};
            background: ${hexToRGB(medusaColors.input.switch.bg, 0.8)};
            top: 0.125rem;
            right: calc(50% + 0.125rem);
            //width: 1.25rem;
            //height: 1.25rem;
            content: '';
            transition: all 75ms ease-in;
        }
    }
`;

export interface SwitchProps {
    name: string;
    label?: string;
    boldLabel?: boolean;
    description?: string;
    defaultChecked?: boolean;
    readOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const Switch = ({ name, label, boldLabel, description, defaultChecked, readOnly, onChange, children }: SwitchProps) => {
    const uuid = useMemo(() => v4(), []);

    return (
        <div css={tw`flex items-center`}>
            <ToggleContainer css={tw`flex-none`}>
                {children || (
                    <Input
                        id={uuid}
                        name={name}
                        type={'checkbox'}
                        onChange={(e) => onChange && onChange(e)}
                        defaultChecked={defaultChecked}
                        disabled={readOnly}
                    />
                )}
                <Label htmlFor={uuid} />
            </ToggleContainer>
            {(label || description) && (
                <div css={tw`ml-4 w-full`}>
                    {label && boldLabel && (
                        <Label
                            css={[
                                boldLabel ? tw`cursor-pointer font-bold` : tw`cursor-pointer`,
                                !!description && tw`mb-0`,
                            ]}
                            htmlFor={uuid}
                        >
                            {label}
                        </Label>
                    )}
                    {description && <Description size='xsmall'>{description}</Description>}
                </div>
            )}
        </div>
    );
};

export default Switch;
