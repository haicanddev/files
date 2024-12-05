import React, { forwardRef } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface MedusaButtonProps {
    children: React.ReactNode;
    isDanger?: boolean;
    isText?: boolean;
    isTrash?: boolean;
    isIcon?: boolean;
    iconType?: 'green' | 'purple';
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, MedusaButtonProps>(
    ({ children, isDanger, isText, isTrash, isIcon, iconType, disabled, onClick, type }, ref) => {
        const StyledButton = styled.button`
            ${(props: MedusaButtonProps) =>
                props.isIcon || props.isTrash
                    ? null
                    : css`
                          ${tw`px-4 py-2 inline-flex items-center justify-center opacity-90`};
                          ${tw`rounded-xl text-base font-semibold transition-all duration-200`};
                          border: 1px solid ${hexToRGB(medusaColors.button.border, 0.6)};
                          background: radial-gradient(
                              ${hexToRGB(medusaColors.button.bg1, 0.35)},
                              ${hexToRGB(medusaColors.button.bg1, 0.8)}
                          );
                          box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.bg1, 0.6)};

                          &:hover {
                              ${tw`opacity-100`};
                              box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.bg1, 0.8)};
                          }
                      `};

            ${(props: MedusaButtonProps) =>
                props.isTrash &&
                css`
                    ${tw`p-1 w-8 h-8 rounded-full flex items-center justify-center`};
                    background: linear-gradient(
                        to bottom,
                        ${hexToRGB(medusaColors.button.bgTrash, 0.4)},
                        ${hexToRGB(medusaColors.button.bgTrash, 0.1)}
                    );
                    border-top: 2px solid ${hexToRGB(medusaColors.button.borderTrash, 0.6)};
                    box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.borderTrash, 0.6)}!important;

                    &:hover {
                        background: linear-gradient(
                            to bottom,
                            ${hexToRGB(medusaColors.button.bgTrash, 0.8)},
                            ${hexToRGB(medusaColors.button.bgTrash, 0.3)}
                        );
                        border-top: 2px solid ${hexToRGB(medusaColors.button.borderTrash, 0.9)};
                        box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.borderTrash, 0.6)}!important;
                    }
                `};

            ${(props: MedusaButtonProps) =>
                props.isIcon &&
                css`
                    ${tw`p-1 w-8 h-8 rounded-full flex items-center justify-center`};

                    ${(props: MedusaButtonProps) =>
                        props.iconType === 'green' &&
                        css`
                            background: linear-gradient(
                                to bottom,
                                ${hexToRGB(medusaColors.green, 0.8)},
                                ${hexToRGB(medusaColors.bblack2, 1)}
                            );
                            border-top: 2px solid ${hexToRGB(medusaColors.green, 1)}!important;
                            box-shadow: 0 0 15px ${hexToRGB(medusaColors.green, 0.6)};

                            &:hover {
                                background: linear-gradient(
                                    to bottom,
                                    ${hexToRGB(medusaColors.green, 0.8)},
                                    ${hexToRGB(medusaColors.green, 0.3)}
                                );
                                border-top: 2px solid ${hexToRGB(medusaColors.green, 0.9)};
                                box-shadow: 0 0 15px ${hexToRGB(medusaColors.green, 0.6)};
                            }
                        `};

                    ${(props: MedusaButtonProps) =>
                        props.iconType === 'purple' &&
                        css`
                            background: linear-gradient(
                                to bottom,
                                ${hexToRGB(medusaColors.white2, 0.8)},
                                ${hexToRGB(medusaColors.bblack2, 1)}
                            );
                            border-top: 2px solid ${hexToRGB(medusaColors.white2, 1)}!important;
                            box-shadow: 0 0 15px ${hexToRGB(medusaColors.white2, 0.6)};

                            &:hover {
                                background: linear-gradient(
                                    to bottom,
                                    ${hexToRGB(medusaColors.white2, 0.8)},
                                    ${hexToRGB(medusaColors.white2, 0.3)}
                                );
                                border-top: 2px solid ${hexToRGB(medusaColors.white2, 0.9)};
                                box-shadow: 0 0 15px ${hexToRGB(medusaColors.white2, 0.6)};
                            }
                        `};
                `};

            ${(props) =>
                props.disabled &&
                css`
                    ${tw`opacity-50 cursor-not-allowed`};
                    box-shadow: 0 0 0 ${hexToRGB(medusaColors.button.bg1, 0.0)};

                    &:hover {
                        ${tw`opacity-50`};
                        box-shadow: 0 0 0 ${hexToRGB(medusaColors.button.bg1, 0.0)};
                    }
                `};

            ${(props: MedusaButtonProps) =>
                props.isDanger &&
                css`
                    border: 1px solid ${hexToRGB(medusaColors.button.borderDanger, 0.6)};
                    background: radial-gradient(
                        ${hexToRGB(medusaColors.button.bgDanger, 0.35)},
                        ${hexToRGB(medusaColors.button.bgDanger, 0.6)}
                    );
                    box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.bgDanger, 0.6)};

                    &:hover {
                        ${tw`opacity-100`};
                        box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.bgDanger, 0.6)};
                    }
                `};

            ${(props: MedusaButtonProps) =>
                props.isText &&
                css`
                    border: 1px solid ${hexToRGB(medusaColors.button.borderText, 0.6)}!important;
                    background: radial-gradient(
                        ${hexToRGB(medusaColors.button.bgText, 0.15)},
                        ${hexToRGB(medusaColors.button.bgText, 0.05)}
                    ) !important;
                    box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.bgText, 0.6)}!important;

                    &:hover {
                        ${tw`opacity-100`};
                        background: radial-gradient(
                            ${hexToRGB(medusaColors.button.bgText, 0.25)},
                            ${hexToRGB(medusaColors.button.bgText, 0.15)}
                        ) !important;
                        box-shadow: 0 0 15px ${hexToRGB(medusaColors.button.bgText, 0.8)}!important;
                    }
                `};
        `;

        return (
            <StyledButton
                ref={ref}
                disabled={disabled}
                onClick={onClick}
                type={type}
                {...(isDanger !== undefined && { isDanger })}
                {...(isText !== undefined && { isText })}
                {...(isTrash !== undefined && { isTrash })}
                {...(isIcon !== undefined && { isIcon })}
                {...(iconType !== undefined && { iconType })}
            >
                {children}
            </StyledButton>
        );
    }
);

export default Button;
