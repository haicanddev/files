import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface MedusaDetailsProps {
    isOffline: boolean;
    inbound?: boolean;
}

export const MedusaDetailsBlock = styled.div`
    ${tw`mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5`};

    .res_usage {
        ${tw`flex justify-around rounded-xl p-5 w-full lg:w-auto`};

        background: linear-gradient(
            to right bottom,
            ${hexToRGB(medusaColors.detailBlock.bg1, 0.2)},
            ${hexToRGB(medusaColors.detailBlock.bg2, 1)}
        );
        border-top: 3px solid ${hexToRGB(medusaColors.detailBlock.border, 0.25)}!important;

        & span {
            ${tw`text-2xs`};
            color: ${hexToRGB(medusaColors.white, 0.5)};
        }
    }

    .network_in_out {
        ${tw`flex flex-col px-10 lg:px-0 gap-y-10 lg:gap-y-0 items-start lg:items-center lg:flex-row rounded-xl justify-around py-5 lg:py-10`};

        background: linear-gradient(
            to right bottom,
            ${hexToRGB(medusaColors.detailBlock.bg1, 0.2)},
            ${hexToRGB(medusaColors.detailBlock.bg2, 1)}
        );
        border-top: 3px solid ${hexToRGB(medusaColors.detailBlock.border, 0.25)}!important;

        & .idk {
            ${tw`font-bold text-lg leading-3 `};

            & .allocation {
                ${tw`duration-300`};
                color: ${hexToRGB(medusaColors.lightBlue2, 1)};

                &:hover {
                    color: ${hexToRGB(medusaColors.lightBlue, 1)};
                }
            }

            & .only-port {
                color: ${hexToRGB(medusaColors.white, 1)};
            }
        }

        & .uptime {
            ${tw`font-bold text-lg leading-3 duration-300`};
            color: ${hexToRGB(medusaColors.white2, 0.7)};

            &:hover {
                color: ${hexToRGB(medusaColors.white2, 1)};
            }
        }

        & h1 {
            ${tw`pb-3 lg:pb-5`};
        }
    }
`;

export const MedusaNetwork = styled.p<MedusaDetailsProps>`
    ${tw`text-lg leading-3`};

    ${(props) =>
        props.inbound
            ? css`
                  ${(props: MedusaDetailsProps) =>
                      props.isOffline
                          ? css`
                                ${tw`font-semibold`};
                                color: ${hexToRGB(medusaColors.danger, 0.45)};
                            `
                          : css`
                                ${tw`font-bold`};
                                color: ${hexToRGB(medusaColors.yellow, 0.7)};
                            `}
              `
            : css`
                  ${(props: MedusaDetailsProps) =>
                      props.isOffline
                          ? css`
                                ${tw`font-semibold`};
                                color: ${hexToRGB(medusaColors.danger, 0.45)};
                            `
                          : css`
                                ${tw`font-bold`};
                                color: ${hexToRGB(medusaColors.cyan, 0.7)};
                            `}
              `}
`;
