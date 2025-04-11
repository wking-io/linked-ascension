import Layout from '@/layouts/layout';
import { CharacterResponse, Game, SharedData } from '@/types';
import { store } from '@actions/App/Http/Controllers/CharacterController';
import { type PageProps } from '@inertiajs/core';
import { Link, useForm, usePage } from '@inertiajs/react';
import show from '@routes/characters/show';
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
        submit(store(game.id));
    };

    console.log(characters);
    return (
        <Layout user={auth.user}>
            <p>{game.name}</p>
            <p>Available Characters: {characters.filter((c) => !c.user_id).length}</p>
            {auth.user.is_admin && (
                <>
                    {characters.map((c) => (
                        <p key={c.id}>
                            <Link href={show({ game: game.id, character: c.id })}>
                                {c.id}
                                {c.user_id ? ' (taken)' : ''}
                            </Link>
                        </p>
                    ))}
                    <form onSubmit={handleSubmit}>
                        <button type="submit" disabled={processing}>
                            Create Character
                        </button>
                    </form>
                </>
            )}
        </Layout>
    );
}
