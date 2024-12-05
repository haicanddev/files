import React from 'react';
import MessageBox from '@/components/MessageBox';
import { useStoreState } from 'easy-peasy';

type Props = Readonly<{
    byKey?: string;
    className?: string;
}>;

const FlashMessageRender = ({ byKey, className }: Props) => {
    const flashes = useStoreState((state) =>
        state.flashes.items.filter((flash) => (byKey ? flash.key === byKey : true))
    );

    return flashes.length ? (
        <div className={className}>
            {flashes.map((flash) => (
                <React.Fragment key={flash.id || flash.type + flash.message}>
                    <MessageBox type={flash.type}>{flash.message}</MessageBox>
                </React.Fragment>
            ))}
        </div>
    ) : null;
};

export default FlashMessageRender;
