import React from 'react';
import FlashMessageRender from '@/components/FlashMessageRender';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import tw from 'twin.macro';
import { MedusaContentBody, MedusaContentBox } from '@/medusa/components/MedusaContentBox';

type Props = Readonly<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        title?: string;
        showFlashes?: string | boolean;
        showLoadingOverlay?: boolean;
    }
>;

const ContentBox = ({ title, showFlashes, showLoadingOverlay, children }: Props) => (
    <MedusaContentBox>
        <div className='color1'></div>
        <div className='color2'></div>
        <div className='color3'></div>
        <div className='color4'></div>
        <MedusaContentBody>
            {title && <h2 className='title'>{title}</h2>}
            {showFlashes && (
                <FlashMessageRender byKey={typeof showFlashes === 'string' ? showFlashes : undefined} css={tw`mb-4`} />
            )}
            <div>
                <SpinnerOverlay visible={showLoadingOverlay || false} />
                {children}
            </div>
        </MedusaContentBody>
    </MedusaContentBox>
);

export default ContentBox;
