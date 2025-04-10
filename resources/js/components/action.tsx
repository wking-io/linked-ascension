import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export default function Action({ children, className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button className={cn('action-shadow', className)} {...props}>
            <span className="action-outer">
                <span className="action-inner">{children}</span>
            </span>
        </button>
    );
}
