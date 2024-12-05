import styled from 'styled-components';
import tw from 'twin.macro';
import Checkbox from '@/components/elements/Checkbox';
import React from 'react';
import { useStoreState } from 'easy-peasy';
import Label from '@/components/elements/Label';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import { Description } from '@/medusa/components/Description';

const Container = styled.label`
    ${tw`flex items-center rounded-xl md:p-2 transition-colors duration-200`};
    text-transform: none;
    background: linear-gradient(
        to bottom right,
        ${hexToRGB(medusaColors.permissionRow.bg1, 1)},
        ${hexToRGB(medusaColors.permissionRow.bg2, 0.5)}
    );
    border: 1px solid ${hexToRGB(medusaColors.permissionRow.border, 0.1)};

    &:not(.disabled) {
        ${tw`cursor-pointer`};

        &:hover {
            background: linear-gradient(
                to bottom right,
                transparent,
                ${hexToRGB(medusaColors.permissionRow.border, 0.2)}
            );
            border: 1px solid ${hexToRGB(medusaColors.permissionRow.border, 0.15)};
        }
    }

    &:not(:first-of-type) {
        ${tw`mt-4 sm:mt-2`};
    }

    &.disabled {
        ${tw`opacity-50`};

        & input[type='checkbox']:not(:checked) {
            ${tw`border-0`};
        }
    }
`;

interface Props {
    permission: string;
    disabled: boolean;
}

const PermissionRow = ({ permission, disabled }: Props) => {
    const [key, pkey] = permission.split('.', 2);
    const permissions = useStoreState((state) => state.permissions.data);

    return (
        <Container htmlFor={`permission_${permission}`} className={disabled ? 'disabled' : undefined}>
            <div css={tw`p-2`}>
                <Checkbox
                    id={`permission_${permission}`}
                    name={'permissions'}
                    value={permission}
                    css={tw`w-5 h-5 mr-2`}
                    disabled={disabled}
                />
            </div>
            <div css={tw`flex-1`}>
                <Label as={'p'} css={tw`font-medium`}>
                    {pkey}
                </Label>
                {permissions[key].keys[pkey].length > 0 && (
                    <Description size='xsmall'>{permissions[key].keys[pkey]}</Description>
                )}
            </div>
        </Container>
    );
};

export default PermissionRow;
