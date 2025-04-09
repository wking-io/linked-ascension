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
    const form = useForm({
        element: 'fire',
    });

    const handleUnlockElement = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.submit();
    };
    return (
        <div>

    <p>{auth.user.name}</p>
    {character.user_id === auth.user.id ?  (
        <form onSubmit={handleUnlockElement}>
            <button type="submit">Unlock Element</button>
        </form>
    ) : (
<Link href={support({ game, character })}>Support Character</Link>
    )}
        </div>

}
