import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export function Box({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('box-shadow', className)} {...props}>
            <span className="box-outer">
                <span className="box-inner">{children}</span>
            </span>
        </div>
    );
}
