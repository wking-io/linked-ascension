import { unlockArmor, unlockElement, unlockSpecial, unlockWeapon } from '@/actions/App/Http/Controllers/CharacterController';
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

    return (
        <div>
            <p>{auth.user.name}</p>
            {character.user_id === auth.user.id ? (
                <>
                    <form onSubmit={handleUnlockElement}>
                        <button type="submit">Unlock Element</button>
                    </form>
                    <form onSubmit={handleUnlockArmor}>
                        <button type="submit">Unlock Armor</button>
                    </form>
                    <form onSubmit={handleUnlockWeapon}>
                        <button type="submit">Unlock Weapon</button>
                    </form>
                    <form onSubmit={handleUnlockSpecial}>
                        <button type="submit">Unlock Special</button>
                    </form>
                </>
            ) : (
                <Link href={support({ game, character })}>Support Character</Link>
            )}
        </div>
    );
}
