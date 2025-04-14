import { cn } from '@/lib/utils';

export function ArmorIcon({ status }: { status: boolean }) {
    return (
        <svg width="20" height="24" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(status ? '' : 'opacity-40')}>
            <g className="fill-foreground/20">
                <path d="M1 1H3V2H2V3H1V1Z" />
                <path d="M5 1H4V2H5V1Z" />
            </g>
            <g className="fill-foreground/30">
                <path d="M0 0H2V1H1V2H0V0Z" />
                <path d="M3 1H4V2H3V1Z" />
                <path d="M5 1V2H8V6H9V1H5Z" />
                <path d="M1 3H2V8H3V9H4V10H2V9H1V3Z" />
                <path d="M4 10V11H5V10H4Z" />
            </g>
            <g className="fill-foreground/40">
                <path d="M2 0V1H9V5H10V0H2Z" />
                <path d="M1 2H0V9H1V10H2V9H1V2Z" />
                <path d="M9 6H8V8H7V9H6V10H5V11H7V10H8V9H9V6Z" />
                <path d="M3 10H4V11H3V10Z" />
            </g>
            <g className="fill-foreground/70">
                <path d="M2 2V8H5V7H6V6H7V5H8V2H2Z" />
                <path d="M9 5H10V9H9V5Z" />
                <path d="M8 10H9V9H8V10Z" />
                <path d="M7 11H8V10H7V11Z" />
                <path d="M3 11V12H7V11H3Z" />
                <path d="M3 11V10H2V11H3Z" />
            </g>
            <g className="fill-foreground/80">
                <path d="M7 5H8V8H7V9H6V10H4V9H3V8H5V7H6V6H7V5Z" />
            </g>
        </svg>
    );
}
