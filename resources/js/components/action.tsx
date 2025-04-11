import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps } from 'react';

export function ActionButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className="action-inner">{children}</span>
            </span>
        </button>
    );
}

export function ActionLink({ children, className, ...props }: ComponentProps<typeof Link>) {
    return (
        <Link className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className="action-inner">{children}</span>
            </span>
        </Link>
    );
}

export function ActionAnchor({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className="action-inner">{children}</span>
            </span>
        </a>
    );
}
