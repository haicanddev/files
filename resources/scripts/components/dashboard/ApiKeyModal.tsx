import React, { useContext } from 'react';
import tw from 'twin.macro';
import Button from '@/medusa/components/Button';
import asModal from '@/hoc/asModal';
import ModalContext from '@/context/ModalContext';
import CopyOnClick from '@/components/elements/CopyOnClick';
import { Title } from '@/medusa/components/Title';
import { StyledPre } from '@/medusa/components/StyledPre';

interface Props {
    apiKey: string;
}

const ApiKeyModal = ({ apiKey }: Props) => {
    const { dismiss } = useContext(ModalContext);

    return (
        <>
            <Title className='mb-6 text-2xl'>Your API Key</Title>
            <p css={tw`text-sm mb-6`}>
                The API key you have requested is shown below. Please store this in a safe location, it will not be
                shown again.
            </p>
            <StyledPre>
                <CopyOnClick text={apiKey}>
                    <code css={tw`font-mono`}>{apiKey}</code>
                </CopyOnClick>
            </StyledPre>
            <div css={tw`flex justify-end mt-6`}>
                <Button onClick={() => dismiss()}>Close</Button>
            </div>
        </>
    );
};

ApiKeyModal.displayName = 'ApiKeyModal';

export default asModal<Props>({
    closeOnEscape: false,
    closeOnBackground: false,
})(ApiKeyModal);
