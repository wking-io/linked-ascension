import { CSSProperties } from 'react';

export function elementCssVars(element: string): CSSProperties {
    switch (element) {
        case 'fire':
            return {
                '--color-foreground': 'var(--foreground-fire)',
                '--color-background': 'var(--background-fire)',
            } as CSSProperties;
        case 'water':
            return {
                '--color-foreground': 'var(--foreground-water)',
                '--color-background': 'var(--background-water)',
            } as CSSProperties;
        case 'earth':
            return {
                '--color-foreground': 'var(--foreground-earth)',
                '--color-background': 'var(--background-earth)',
            } as CSSProperties;
        case 'air':
            return {
                '--color-foreground': 'var(--foreground-air)',
                '--color-background': 'var(--background-air)',
            } as CSSProperties;
        case 'lightning':
            return {
                '--color-foreground': 'var(--foreground-lightning)',
                '--color-background': 'var(--background-lightning)',
            } as CSSProperties;
        case 'ice':
            return {
                '--color-foreground': 'var(--foreground-ice)',
                '--color-background': 'var(--background-ice)',
            } as CSSProperties;
        case 'metal':
            return {
                '--color-foreground': 'var(--foreground-metal)',
                '--color-background': 'var(--background-metal)',
            } as CSSProperties;
        case 'nature':
            return {
                '--color-foreground': 'var(--foreground-nature)',
                '--color-background': 'var(--background-nature)',
            } as CSSProperties;
        default:
            return {};
    }
}
