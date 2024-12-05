import React, { useEffect, useState } from 'react';
import Fade from '@/components/elements/Fade';
import Portal from '@/components/elements/Portal';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import styled from 'styled-components/macro';
import hexToRGB from '@/medusa/functions/hexToRGB';
import tw from 'twin.macro';
import { medusaColors } from '@/medusa/medusaColors';

interface CopyOnClickProps {
    text: string | number | null | undefined;
    showInNotification?: boolean;
    children: React.ReactNode;
}

const StyledCoC = styled.div`
    ${tw`fixed z-50 bottom-0 right-0 m-4`};

    & .coc {
        ${tw`font-mono py-3 px-4 rounded-xl shadow`};
        background: linear-gradient(
            to bottom,
            ${hexToRGB(medusaColors.coc.bg, 1)},
            ${hexToRGB(medusaColors.coc.bg, 0.5)}
        ) !important;
        border-top: 1px solid ${hexToRGB(medusaColors.coc.border, 0.3)}!important;
    }
`;

const CopyOnClick = ({ text, showInNotification = true, children }: CopyOnClickProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => {
            setCopied(false);
        }, 2500);

        return () => {
            clearTimeout(timeout);
        };
    }, [copied]);

    if (!React.isValidElement(children)) {
        throw new Error('Component passed to <CopyOnClick/> must be a valid React element.');
    }

    const childElement = React.Children.only(children) as React.ReactElement;
    const child = !text
        ? childElement
        : React.cloneElement(childElement, {
              className: classNames(children.props.className || '', 'cursor-pointer'),
              onClick: (e: React.MouseEvent<HTMLElement>) => {
                  copy(String(text));
                  setCopied(true);
                  if (typeof children.props.onClick === 'function') {
                      children.props.onClick(e);
                  }
              },
          });

    return (
        <>
            {copied && (
                <Portal>
                    <Fade in appear timeout={250} key={copied ? 'visible' : 'invisible'}>
                        <StyledCoC>
                            <div className='coc'>
                                <p>
                                    {showInNotification
                                        ? `Copied "${String(text)}" to clipboard.`
                                        : 'Copied text to clipboard.'}
                                </p>
                            </div>
                        </StyledCoC>
                    </Fade>
                </Portal>
            )}
            {child}
        </>
    );
};

export default CopyOnClick;
