import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps } from 'react';

type ActionProps = { size?: 'default' | 'icon' };

export function ActionButton({ children, className, size = 'default', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & ActionProps) {
    return (
        <button className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className={cn('action-inner', size === 'icon' && 'action-inner-icon')}>{children}</span>
            </span>
        </button>
    );
}

export function ActionLink({ children, className, size = 'default', ...props }: Omit<ComponentProps<typeof Link>, 'size'> & ActionProps) {
    return (
        <Link className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className={cn('action-inner', size === 'icon' && 'action-inner-icon')}>{children}</span>
            </span>
        </Link>
    );
}

export function ActionAnchor({ children, className, size = 'default', ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & ActionProps) {
    return (
        <a className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className={cn('action-inner', size === 'icon' && 'action-inner-icon')}>{children}</span>
            </span>
        </a>
    );
}
