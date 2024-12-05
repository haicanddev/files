import * as React from 'react';
import { TwStyle } from 'twin.macro';
import toast from 'react-hot-toast';

export type FlashMessageType = 'success' | 'info' | 'warning' | 'error';

interface Props {
    children: string;
    type?: FlashMessageType;
}

const getToasterType = (type?: FlashMessageType, text = ''): TwStyle | string => {
    switch (type) {
        case 'error':
            return toast.error(text);
        case 'info':
            return toast(text);
        case 'success':
            return toast.success(text);
        case 'warning':
            return toast(text);
        default:
            return '';
    }
};

const MessageBox = ({ children, type }: Props) => {
    React.useEffect(() => {
        const toasterType = getToasterType(type, children);

        return () => {
            if (typeof toasterType === 'string') {
                toast.dismiss(toasterType);
            }
        };
    }, [children, type]);

    return null;
};
MessageBox.displayName = 'MessageBox';

export default MessageBox;
