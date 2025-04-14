export function Heart({ className, visible, preview }: { className?: string; visible: number; preview: number }) {
    const getOpacityClass = (segmentIndex: number) => {
        if (visible >= segmentIndex) {
            return preview < segmentIndex ? 'animate-pulse' : '';
        }
        return 'opacity-0';
    };

    return (
        <svg width="32" height="28" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g className={getOpacityClass(1)}>
                <path d="M3 1H6V2H3V1Z" fill="#FF8C8C" />
                <path d="M2 3V2H3V3H2Z" fill="#FF8C8C" />
                <path d="M2 3H1V7H2V3Z" fill="#FF8C8C" />
                <path d="M5 2V3H3V4H2V7H8V3H7V2H5Z" fill="#E65078" />
                <path d="M3 2V3H2V4H3V3H5V2H3Z" fill="#FFCDB4" />
            </g>
            <g className={getOpacityClass(2)}>
                <path d="M2 7H8V11H5V10H4V9H3V8H2V7Z" fill="#E65078" />
                <path d="M6 11V12H7V13H8V11H6Z" fill="#B4236E" />
            </g>
            <g className={getOpacityClass(3)}>
                <path d="M8 7H12V8H11V9H10V10H9V11H8V7Z" fill="#E65078" />
                <path d="M12 7V8H11V9H10V10H9V11H8V13H9V12H10V11H11V10H12V9H13V8H14V7H12Z" fill="#B4236E" />
            </g>
            <g className={getOpacityClass(4)}>
                <path d="M10 1V2H9V3H8V4H9V3H10V2H13V1H10Z" fill="#FF8C8C" />
                <path d="M10 2H11V3H10V2Z" fill="#FFCDB4" />
                <path d="M10 3V4H9V3H10Z" fill="#FFCDB4" />
                <path d="M11 2H14V6H13V7H8V4H10V3H11V2Z" fill="#E65078" />
                <path d="M15 3H14V6H13V7H15V3Z" fill="#B4236E" />
            </g>
            <g fill="#4B143C">
                <path d="M3 0H6V1H3V0Z" />
                <path d="M2 2V1H3V2H2Z" />
                <path d="M1 3V2H2V3H1Z" />
                <path d="M1 7H0V3H1V7Z" />
                <path d="M2 8H1V7H2V8Z" />
                <path d="M3 9H2V8H3V9Z" />
                <path d="M4 10H3V9H4V10Z" />
                <path d="M5 11H4V10H5V11Z" />
                <path d="M6 12H5V11H6V12Z" />
                <path d="M7 13H6V12H7V13Z" />
                <path d="M7 13V14H9V13H10V12H11V11H12V10H13V9H14V8H15V7H16V3H15V2H14V1H13V0H10V1H9V2H7V1H6V2H7V3H9V2H10V1H13V2H14V3H15V7H14V8H13V9H12V10H11V11H10V12H9V13H7Z" />
            </g>
        </svg>
    );
}
