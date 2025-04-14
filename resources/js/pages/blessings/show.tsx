import { Blessing, Character, Game } from '@/types';
import { useForm } from '@inertiajs/react';
import claim from '@routes/blessings/claim';

interface Props {
    blessing: Blessing;
    character: Character;
    game: Game;
}

// TODO: Add a component for the blessing
export default function Show({ blessing, character, game }: Props) {
    const { submit, processing } = useForm();

    const handleClaimBlessing = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(claim({ game, character, blessing }));
    };

    return (
        <>
            <p>{blessing.name}</p>
            <p>{blessing.description}</p>
            <form onSubmit={handleClaimBlessing}>
                <button type="submit" disabled={processing}>
                    Claim Blessing
                </button>
            </form>
        </>
    );
}
