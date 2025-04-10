import { healHeart, unlockArmor, unlockElement, unlockSpecial, unlockWeapon } from '@/actions/App/Http/Controllers/CharacterController';
import support from '@/routes/characters/support';
import { CharacterResponse, Game, SharedData } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { Link, useForm, usePage } from '@inertiajs/react';
interface Props extends PageProps {
    game: Game;
    character: CharacterResponse;
}

export default function Show({ game, character }: Props) {
    const { auth } = usePage<SharedData>().props;
    const elementForm = useForm({
        element: 'fire',
    });
    const form = useForm();

    const handleUnlockElement = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        elementForm.submit(unlockElement({ game, character }));
    };

    const handleUnlockArmor = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.submit(unlockArmor({ game, character }));
    };

    const handleUnlockWeapon = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.submit(unlockWeapon({ game, character }));
    };

    const handleUnlockSpecial = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.submit(unlockSpecial({ game, character }));
    };

    const handleHealHeart = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.submit(healHeart({ game, character }));
    };

    return (
        <div>
            <p>{auth.user.name}</p>
            {character.user_id === auth.user.id ? (
                <>
                    {character?.element ? (
                        <p>Element: {character.element}</p>
                    ) : (
                        <form onSubmit={handleUnlockElement}>
                            <button type="submit">Unlock Element</button>
                        </form>
                    )}
                    {character.unlocked_armor_at ? (
                        <p>Has Armor</p>
                    ) : (
                        <form onSubmit={handleUnlockArmor}>
                            <button type="submit">Unlock Armor</button>
                        </form>
                    )}
                    {character.unlocked_weapon_at ? (
                        <p>Has Weapon</p>
                    ) : (
                        <form onSubmit={handleUnlockWeapon}>
                            <button type="submit">Unlock Weapon</button>
                        </form>
                    )}
                    {character.unlocked_special_at ? (
                        <p>Has Special</p>
                    ) : (
                        <form onSubmit={handleUnlockSpecial}>
                            <button type="submit">Unlock Special</button>
                        </form>
                    )}
                    <div className="flex flex-row gap-2">
                        <p>Health: {character.health}</p>
                        <form onSubmit={handleHealHeart}>
                            <button type="submit">Heal Heart</button>
                        </form>
                    </div>
                </>
            ) : (
                <Link href={support({ game, character })}>Support Character</Link>
            )}
        </div>
    );
}
