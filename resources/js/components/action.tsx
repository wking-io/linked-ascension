import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps, PropsWithChildren } from 'react';

type ActionProps = { size?: 'default' | 'icon' };

export function ActionButton({ children, className, size = 'default', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & ActionProps) {
    return (
        <ActionButtonFixed className={className}>
            <button className="action-shadow" {...props}>
                <span className="action-outer">
                    <span className={cn('action-inner', size === 'icon' && 'action-inner-icon')}>{children}</span>
                </span>
            </button>
        </ActionButtonFixed>
    );
}

export function ActionLink({ children, className, size = 'default', ...props }: Omit<ComponentProps<typeof Link>, 'size'> & ActionProps) {
    return (
        <ActionButtonFixed className={className}>
            <Link className="action-shadow" {...props}>
                <span className="action-outer">
                    <span className={cn('action-inner', size === 'icon' && 'action-inner-icon')}>{children}</span>
                </span>
            </Link>
        </ActionButtonFixed>
    );
}

export function ActionAnchor({ children, className, size = 'default', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & ActionProps) {
    return (
        <ActionButtonFixed className={className}>
            <a className="action-shadow" {...props}>
                <span className="action-outer">
                    <span className={cn('action-inner', size === 'icon' && 'action-inner-icon')}>{children}</span>
                </span>
            </a>
        </ActionButtonFixed>
    );
}

export function ActionButtonFixed({ children, className }: PropsWithChildren<{ className?: string }>) {
    return <div className={cn('flex h-14 flex-col', className)}>{children}</div>;
}
