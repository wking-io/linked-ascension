import { ActionButton } from '@/components/action';
import { Box } from '@/components/box';
import { Health } from '@/components/health';
import { ArmorIcon } from '@/icons/armor-icon';
import { SupportPointsIcon } from '@/icons/support-points-icon';
import { WeaponIcon } from '@/icons/weapon-icon';
import { calculateDamage } from '@/lib/character';
import { cn } from '@/lib/utils';
import { CharacterResponse, CharacterWithUser, Game } from '@/types';
import { attack } from '@actions/App/Http/Controllers/CharacterController';
import { type PageProps } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
interface Props extends PageProps {
    character: CharacterResponse;
    game: Game;
    characters: CharacterWithUser[];
}

export default function Target({ character, game, characters }: Props) {
    const { data, setData, submit, processing } = useForm({
        target_id: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(attack({ game, character }));
    };

    return (
        <div className="p-5">
            <h1>Choose Target</h1>
            <form onSubmit={handleSubmit} className="mt-5">
                <fieldset>
                    <legend className="sr-only">Target</legend>
                    <div className={cn(data.target_id && 'mb-[103px]', 'flex flex-col gap-2')}>
                        {characters.map((c) => {
                            const notTarget = data.target_id.length && data.target_id !== c.id;
                            const isTarget = data.target_id.length && data.target_id === c.id;
                            const previewHealth = isTarget ? calculateDamage(character, c) : undefined;
                            console.log(previewHealth);
                            return (
                                <div className="h-[94px]" key={c.id}>
                                    <Box>
                                        <input
                                            onChange={(e) => setData('target_id', e.target.value)}
                                            type="radio"
                                            name="target_id"
                                            value={c.id}
                                            id={`target-${c.id}`}
                                            className="sr-only"
                                        />
                                        <label key={c.id} className={cn(notTarget && 'opacity-50', 'flex flex-col gap-2')} htmlFor={`target-${c.id}`}>
                                            <span className="max-w-[300px] truncate" title={c.user?.name ?? 'Mysterious Stranger'}>
                                                {c.user?.name ?? 'Mysterious Stranger'}
                                            </span>
                                            <span className="-mt-1 mb-2 flex items-center justify-between gap-3">
                                                <span className="flex items-center gap-3">
                                                    <Health health={c.health} previewHealth={previewHealth} />
                                                    <WeaponIcon status={Boolean(c.unlocked_weapon_at?.length)} />
                                                    <ArmorIcon status={Boolean(c.unlocked_armor_at?.length)} />
                                                </span>
                                                <span className="flex items-center gap-2 text-2xl">
                                                    <SupportPointsIcon />
                                                    {character.support_points ?? 0}
                                                </span>
                                            </span>
                                        </label>
                                    </Box>
                                </div>
                            );
                        })}
                    </div>
                </fieldset>
                <div
                    className={cn(
                        data.target_id.length ? 'translate-y-0' : 'translate-y-full',
                        'ring-foreground border-foreground/30 bg-foreground/10 fixed right-0 bottom-0 left-0 z-50 border-t-2 p-5 ring-2 backdrop-blur-2xl transition-transform duration-300',
                    )}
                >
                    <ActionButton type="submit" disabled={processing} className="w-full">
                        Confirm Attack
                    </ActionButton>
                </div>
            </form>
        </div>
    );
}
