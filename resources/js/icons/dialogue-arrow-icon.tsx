export function DialogueArrow({ className }: { className?: string }) {
    return (
        <svg width="22" height="14" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path fillRule="evenodd" clipRule="evenodd" d="M2 1H3H4H5V2H4H3H2V1ZM6 1H7V2H6V1Z" className="fill-background" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 1H2V2H1V1ZM7 2H6V1H5V2H4H3H2V3H3V4H4V5H5V4H6V3H7V2ZM7 2V1H8V2H7Z"
                className="fill-foreground/20"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M8 1H9V2H8V1ZM7 3V2H8V3H7ZM6 4H7V3H6V4ZM6 4V5H5V4H6Z" className="fill-foreground/50" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H1H2H3H4H5H6H7H8H9H10H11V1H10H9H8H7H6H5H4H3H2H1V2H0V1V0ZM2 3H1V2H2V3ZM3 4H2V3H3V4ZM4 5V4H3V5H4ZM4 5V6H5V5H4Z"
                className="fill-foreground/40"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M10 1H9V2H8V3H7V4H6V5H5V6H6V5H7V4H8V3H9V2H10V1Z" className="fill-foreground/70" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1H11V2H10V1ZM9 3V2H10V3H9ZM8 4V3H9V4H8ZM7 5V4H8V5H7ZM6 6H7V5H6V6ZM6 6V7H5V6H6Z"
                className="fill-foreground/90"
            />
        </svg>
    );
}
