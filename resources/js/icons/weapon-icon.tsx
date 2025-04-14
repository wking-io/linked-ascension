import { cn } from '@/lib/utils';

export function WeaponIcon({ status }: { status: boolean }) {
    return (
        <svg width="28" height="28" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(status ? '' : 'opacity-40')}>
            <g className="fill-foreground/20">
                <path d="M14 12H13V13H12V14H14V12Z" />
                <path d="M12 6H11V7H10V9H9V10H7V11H6V12H9V11H10V10H11V9H12V6Z" />
            </g>
            <g className="fill-foreground/50">
                <path d="M1 0H3V1H4V2H5V3H6V4H7V5H8V6H9V8H8V7H7V6H6V5H5V4H4V3H3V2H2V1H1V0Z" />
                <path d="M9 8V9H10V8H9Z" />
            </g>
            <g className="fill-foreground/60">
                <path d="M1 0H0V3H1V4H2V5H3V6H4V7H5V8H6V9H8V10H9V9H8V8H7V7H6V6H5V5H4V4H3V3H2V2H1V0Z" />
            </g>
            <g className="fill-foreground/70">
                <path d="M1 1H2V2H1V1Z" />
                <path d="M3 3H2V2H3V3Z" />
                <path d="M4 4H3V3H4V4Z" />
                <path d="M5 5H4V4H5V5Z" />
                <path d="M6 6H5V5H6V6Z" />
                <path d="M7 7H6V6H7V7Z" />
                <path d="M8 8H7V7H8V8Z" />
                <path d="M8 8H9V9H8V8Z" />
                <path d="M12 10H11V11H12V12H13V11H12V10Z" />
            </g>
            <g className="fill-foreground/80">
                <path d="M11 10H10V11H11V12H12V13H13V12H12V11H11V10Z" />
            </g>
            <g className="fill-foreground">
                <path d="M10 11H11V12H10V11Z" />
                <path d="M11 12V13H12V12H11Z" />
            </g>
        </svg>
    );
}
