import { store } from '@/actions/App/Http/Controllers/CharacterController';
import { CharacterResponse, Game, SharedData } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props extends PageProps {
    game: Game;
    characters: CharacterResponse[];
}

export default function Show({ game, characters }: Props) {
    const { auth } = usePage<SharedData>().props;

    const { submit, processing } = useForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(store(`${game.id}`));
    };

    return (
        <>
            <p>{game.name}</p>
            <p>{characters.length}</p>
            {auth.user.is_admin && (
                <form onSubmit={handleSubmit}>
                    <button type="submit" disabled={processing}>
                        Create Character
                    </button>
                </form>
            )}
        </>
    );
}
