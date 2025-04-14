import { Heart } from '@/icons/heart-icon';
import { cn } from '@/lib/utils';

export function Health({ health, previewHealth = health, className }: { health: number; previewHealth?: number; className?: string }) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Heart visible={Math.min(health, 4)} preview={Math.min(previewHealth, 4)} />
            <Heart visible={Math.min(health - 4, 4)} preview={Math.min(previewHealth - 4, 4)} />
            <Heart visible={Math.min(health - 8, 4)} preview={Math.min(previewHealth - 8, 4)} />
        </div>
    );
}
