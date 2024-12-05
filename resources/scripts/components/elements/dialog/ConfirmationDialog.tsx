import React from 'react';
import { Dialog, RenderDialogProps } from './';
import Button from '@/medusa/components/Button';

type ConfirmationProps = Omit<RenderDialogProps, 'description' | 'children'> & {
    children: React.ReactNode;
    confirm?: string | undefined;
    onConfirmed: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default ({ confirm = 'Okay', children, onConfirmed, ...props }: ConfirmationProps) => {
    return (
        <Dialog {...props} description={typeof children === 'string' ? children : undefined}>
            {typeof children !== 'string' && children}
            <Dialog.Footer>
                <Button onClick={props.onClose} isText>
                    Cancel
                </Button>
                <Button onClick={onConfirmed}>{confirm}</Button>
            </Dialog.Footer>
        </Dialog>
    );
};
