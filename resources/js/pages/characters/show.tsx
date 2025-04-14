import { ActionAnchor, ActionLink } from '@/components/action';
import { Health } from '@/components/health';
import { SupportPointsIcon } from '@/icons/support-points-icon';
import show from '@/routes/characters/show';
import target from '@/routes/characters/target';
import { CharacterResponse, Game, SharedData } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import bg from '../../../images/bg.png';

interface Props extends PageProps {
    game: Game;
    character: CharacterResponse;
    github_username: string;
    next_threshold: number;
}

const SPRITE_WIDTH = 128; // Adjust based on your sprite dimensions
const SPRITE_HEIGHT = 128;
const CANVAS_SCALE = 1;
const CANVAS_WIDTH = SPRITE_WIDTH * CANVAS_SCALE;
const CANVAS_HEIGHT = SPRITE_HEIGHT * CANVAS_SCALE;
const FRAME_COUNT = 12; // Adjust based on your sprite sheet
const FPS = 16;

export default function Show({ game, character, next_threshold, github_username }: Props) {
    const { auth } = usePage<SharedData>().props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [canAttack, setCanAttack] = useState(false);

    useEffect(() => {
        if (!character.last_acted_at) {
            return;
        }

        const lastActedAt = new Date(character.last_acted_at);
        const now = new Date();
        const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);

        if (lastActedAt.getHours() === now.getHours() && lastActedAt.getDate() === now.getDate()) {
            const diff = nextHour.getTime() - now.getTime();
            setTimeRemaining(diff);
        } else {
            setTimeRemaining(null);
        }

        const interval = setInterval(() => {
            const now = new Date();
            const diff = nextHour.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeRemaining(null);
            } else {
                setTimeRemaining(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [character.last_acted_at]);

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="flex h-[100dvh] flex-col">
            <div className="flex items-center gap-2 p-5">
                {/* <ActionButton className="text-foreground" size="icon">
                    <span className="sr-only">menu</span>
                    <MenuIcon />
                </ActionButton> */}
                <Health className="flex-1" health={character.health} />
                <p className="flex items-center gap-2 text-2xl">
                    <SupportPointsIcon />
                    {character.support_points}/{next_threshold}
                </p>
            </div>
            <div className="relative flex-1">
                <img src={bg} className="pixelated absolute bottom-0 left-1/2 -translate-x-1/2" width={512} height={256} />
                <canvas ref={canvasRef} className="pixelated relative" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            </div>
            {auth.user.id === character.user_id ? (
                <div className="grid grid-cols-2 gap-2 p-5">
                    <ActionLink href={target({ game, character })} className="font-numeric col-span-2" inert={timeRemaining !== null}>
                        Attack {timeRemaining !== null ? `in ${formatTime(timeRemaining)}` : 'Now!'}
                    </ActionLink>
                    <ActionAnchor href={show({ game, character }).url}>Refresh</ActionAnchor>
                    <ActionAnchor href="https://t.me/+1ccKQVHfyChjMmUx" target="_blank">
                        Chat
                    </ActionAnchor>
                </div>
            ) : (
                <div className="p-5">
                    <ActionAnchor href={`https://github.com/${github_username}`} target="_blank">
                        View Players GitHub
                    </ActionAnchor>
                </div>
            )}
        </div>
    );
}
