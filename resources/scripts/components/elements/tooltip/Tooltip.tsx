import React, { cloneElement, useRef, useState } from 'react';
import {
    arrow,
    autoUpdate,
    flip,
    offset,
    Placement,
    shift,
    Side,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import styled from 'styled-components';
import tw from 'twin.macro';
import { medusaColors } from '@/medusa/medusaColors';
import hexToRGB from '@/medusa/functions/hexToRGB';

type Interaction = 'hover' | 'click' | 'focus';

interface Props {
    rest?: number;
    delay?: number | Partial<{ open: number; close: number }>;
    content: string | React.ReactChild;
    disabled?: boolean;
    arrow?: boolean;
    interactions?: Interaction[];
    placement?: Placement;
    className?: string;
    children: React.ReactElement;
}

const arrowSides: Record<Side, string> = {
    top: 'bottom-[-6px] left-0',
    bottom: 'top-[-6px] left-0',
    right: 'top-0 left-[-6px]',
    left: 'top-0 right-[-6px]',
};

export default ({ children, ...props }: Props) => {
    const arrowEl = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const { x, y, reference, floating, middlewareData, strategy, context } = useFloating({
        open,
        strategy: 'absolute',
        placement: props.placement || 'top',
        middleware: [
            offset(props.arrow ? 10 : 6),
            flip(),
            shift({ padding: 6 }),
            arrow({ element: arrowEl, padding: 6 }),
        ],
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
    });

    const interactions = props.interactions || ['hover', 'focus'];
    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, {
            restMs: props.rest ?? 30,
            delay: props.delay ?? 0,
            enabled: interactions.includes('hover'),
        }),
        useFocus(context, { enabled: interactions.includes('focus') }),
        useClick(context, { enabled: interactions.includes('click') }),
        useRole(context, { role: 'tooltip' }),
        useDismiss(context),
    ]);

    const side = arrowSides[(props.placement || 'top').split('-')[0] as Side];
    const { x: ax, y: ay } = middlewareData.arrow || {};

    if (props.disabled) {
        return children;
    }

    const StyledToolTip = styled.div`
        ${tw`text-sm px-3 py-2 rounded-xl pointer-events-none max-w-[24rem]`};
        background: linear-gradient(
            to bottom right,
            ${hexToRGB(medusaColors.tooltip.bg1, 1)},
            ${hexToRGB(medusaColors.tooltip.bg2, 0.2)}
        );
        border: 1px solid ${hexToRGB(medusaColors.tooltip.border, 0.1)};
        color: ${hexToRGB(medusaColors.tooltip.text, 1)};
        box-shadow: 0 0 15px ${hexToRGB(medusaColors.tooltip.border, 0.1)};
        backdrop-filter: blur(20px);
    `;

    return (
        <>
            {cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.075 }}
                        {...getFloatingProps({
                            ref: floating,
                            style: {
                                position: strategy,
                                top: `${y || 0}px`,
                                left: `${x || 0}px`,
                            },
                        })}
                    >
                        <StyledToolTip>
                            {props.content}
                            {props.arrow && (
                                <div
                                    ref={arrowEl}
                                    style={{
                                        transform: `translate(${Math.round(ax || 0)}px, ${Math.round(
                                            ay || 0
                                        )}px) rotate(45deg)`,
                                    }}
                                    className={classNames('absolute bg-gray-900 w-3 h-3', side)}
                                />
                            )}
                        </StyledToolTip>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
