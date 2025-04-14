export function elementClass(element: string) {
    switch (element) {
        case 'fire':
            return 'text-primary-fire';
        case 'water':
            return 'text-primary-water';
        case 'earth':
            return 'text-primary-earth';
        case 'air':
            return 'text-primary-air';
        case 'lightning':
            return 'text-primary-lightning';
        case 'ice':
            return 'text-primary-ice';
        case 'metal':
            return 'text-primary-metal';
        case 'nature':
            return 'text-primary-nature';
        default:
            return '';
    }
}
