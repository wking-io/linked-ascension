import { attack } from '@/actions/App/Http/Controllers/CharacterController';
import { CharacterResponse, Game } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props extends PageProps {
    character: CharacterResponse;
    game: Game;
    characters: CharacterResponse[];
}

export default function Target({ character, game, characters }: Props) {
    const { setData, submit, processing } = useForm({
        target_id: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(attack({ game, character }));
    };

    return (
        <div>
            <h1>Choose Target</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Target</legend>
                    {characters.map((c) => (
                        <label key={c.id} className="flex items-center gap-2">
                            <input onChange={(e) => setData('target_id', e.target.value)} type="radio" name="target_id" value={c.id} />
                            {c.id}
                        </label>
                    ))}
                </fieldset>
                <button type="submit" disabled={processing}>
                    Confirm Attack
                </button>
            </form>
        </div>
    );
}
