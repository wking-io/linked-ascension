import { healHeart } from '@/actions/App/Http/Controllers/CharacterController';
import { ActionAnchor, ActionButton, ActionLink } from '@/components/action';
import { Health } from '@/components/health';
import { SupportPointsIcon } from '@/icons/support-points-icon';
import { attackPower, defensePower } from '@/lib/character';
import target from '@/routes/characters/target';
import { CharacterResponse, Game, SharedData, User } from '@/types';
import { getElementBackground } from '@/utils/element-background';
import { useCharacterRenderLoop } from '@/utils/use-character-render-loop';
import { type PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props extends PageProps {
    game: Game;
    character: CharacterResponse;
    player: User;
    next_threshold: number;
}

export default function Show({ game, character, next_threshold, player }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const healForm = useForm();
    const { canvasRef, canvasWidth, canvasHeight } = useCharacterRenderLoop(character);

    const handleHealHeart = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        healForm.submit(healHeart({ game, character }));
    };

    useEffect(() => {
        if (!character.last_acted_at) {
            return;
        }

        const lastActedAt = new Date(character.last_acted_at);
        const now = new Date();

        // Calculate next half hour (either :30 or :00)
        const getNextHalfHour = (date: Date) => {
            const result = new Date(date);
            if (date.getMinutes() < 30) {
                // Next half hour is :30 of the current hour
                result.setMinutes(30, 0, 0);
            } else {
                // Next half hour is :00 of the next hour
                result.setHours(date.getHours() + 1, 0, 0, 0);
            }
            return result;
        };

        const nextHalfHour = getNextHalfHour(now);

        // Only show cooldown if character acted in the current half-hour period
        const inSameHalfHourPeriod =
            lastActedAt.getHours() === now.getHours() && Math.floor(lastActedAt.getMinutes() / 30) === Math.floor(now.getMinutes() / 30);

        if (inSameHalfHourPeriod) {
            const diff = nextHalfHour.getTime() - now.getTime();
            setTimeRemaining(diff);
        } else {
            setTimeRemaining(null);
        }

        const interval = setInterval(() => {
            const now = new Date();
            const nextHalfHour = getNextHalfHour(now);
            const diff = nextHalfHour.getTime() - now.getTime();

            // Use the last acted at time we already parsed above, since we know it's valid
            const inSameHalfHourPeriod =
                lastActedAt.getHours() === now.getHours() && Math.floor(lastActedAt.getMinutes() / 30) === Math.floor(now.getMinutes() / 30);

            if (!inSameHalfHourPeriod || diff <= 0) {
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
                <Health className="flex-1" health={character.health} />
                <p className="flex items-center gap-2 text-2xl">
                    <SupportPointsIcon />
                    {character.support_points}/{next_threshold}
                </p>
            </div>
            <div className="flex justify-between gap-2 px-5 pt-24">
                <div className="flex flex-col">
                    <p className="">{player?.name}</p>
                    <p className="text-foreground-muted">@{player?.username}</p>
                </div>
                <div className="flex flex-col">
                    <p className="">Atk: {attackPower(character)}</p>
                    <p className="">Def: {defensePower(character)}</p>
                </div>
            </div>
            <div className="border-foreground/50 relative flex flex-col items-center overflow-hidden border-b-2 pt-8">
                <img
                    src={getElementBackground(character.element)}
                    className="pixelated absolute bottom-0 left-1/2 max-w-none -translate-x-1/2"
                    width={512}
                    height={256}
                />
                <canvas ref={canvasRef} className="pixelated relative" width={canvasWidth} height={canvasHeight} />
            </div>
            {auth.user.id === character.user_id ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 p-5">
                    <ActionLink href={target({ game, character })} className="font-numeric col-span-2" inert={timeRemaining !== null}>
                        Attack {timeRemaining !== null ? `in ${formatTime(timeRemaining)}` : 'Now!'}
                    </ActionLink>
                    <form onSubmit={handleHealHeart}>
                        <ActionButton disabled={character.support_points === 0 || character.health === 12} type="submit" className="w-full">
                            Heal Heart
                        </ActionButton>
                    </form>
                    <ActionAnchor href="https://t.me/+1ccKQVHfyChjMmUx" target="_blank">
                        Chat
                    </ActionAnchor>
                </div>
            ) : (
                <div className="p-5">
                    <ActionAnchor href={`https://github.com/${player?.username}`} target="_blank">
                        View Players GitHub
                    </ActionAnchor>
                </div>
            )}
        </div>
    );
}
