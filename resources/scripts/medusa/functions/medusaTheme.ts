import get from 'lodash/get';
import { medusaColors } from '../medusaColors';
import hexToRGB from './hexToRGB';

function medusaTheme(path: string, opacity?: number): string {
    const color = get(medusaColors, path);

    if (opacity !== undefined && color) {
        return hexToRGB(color, opacity);
    }

    return color;
}

export default medusaTheme;
