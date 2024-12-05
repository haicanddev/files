function mbToGb(mb: number): string {
    if (mb === 0) return '∞';

    if (mb < 1000) {
        return `${mb} MB`;
    } else {
        return `${(mb / 1024).toFixed(2)} GB`;
    }
}

export default mbToGb;
