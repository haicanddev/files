import styled from 'styled-components';
import tw, { css } from 'twin.macro';
import hexToRGB from '../functions/hexToRGB';
import { medusaColors } from '../medusaColors';

interface BadgeProps {
    badgeType?: 'warning' | 'normal';
}

export const Badge = styled.div<BadgeProps>`
    ${tw`px-2 py-px text-xs rounded-xl`};

    ${(props) =>
        props.badgeType === 'normal'
            ? css`
                  background: linear-gradient(
                      to right,
                      ${hexToRGB(medusaColors.badge.normal.bg, 0.24)},
                      ${hexToRGB(medusaColors.badge.normal.bg, 0.02)}
                  );
                  color: ${hexToRGB(medusaColors.badge.normal.text, 0.9)};
                  border: 1px solid ${hexToRGB(medusaColors.badge.normal.border, 0.3)};
              `
            : null}

    ${(props) =>
        props.badgeType === 'warning'
            ? css`
                  background: linear-gradient(
                      to right,
                      ${hexToRGB(medusaColors.badge.warning.bg, 0.24)},
                      ${hexToRGB(medusaColors.badge.warning.bg, 0.02)}
                  );
                  color: ${hexToRGB(medusaColors.badge.warning.text, 0.9)};
                  border: 1px solid ${hexToRGB(medusaColors.badge.warning.border, 0.3)};
              `
            : null}
`;
