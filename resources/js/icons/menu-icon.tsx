import { cn } from '@/lib/utils';

export function MenuIcon({ className }: { className?: string }) {
    return (
        <svg width="24" height="20" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('fill-current', className)}>
            <rect width="12" height="1" />
            <rect y="1" width="12" height="1" opacity="0.5" />
            <rect y="4" width="12" height="1" />
            <rect y="5" width="12" height="1" opacity="0.5" />
            <rect y="8" width="12" height="1" />
            <rect y="9" width="12" height="1" opacity="0.5" />
        </svg>
    );
}
