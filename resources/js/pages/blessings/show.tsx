import { ActionButton } from '@/components/action';
import { Blessing, Character, Game } from '@/types';
import { useForm } from '@inertiajs/react';
import claim from '@routes/blessings/claim';

interface Props {
    blessing: Blessing;
    character: Character;
    game: Game;
}

export default function Show({ blessing, character, game }: Props) {
    const { submit, processing } = useForm();

    const handleClaimBlessing = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(claim({ game, character, blessing }));
    };

    return (
        <div className="flex h-[100dvh] flex-col items-center justify-center gap-5 p-5 text-center">
            <p>{blessing.name}</p>
            <p>{blessing.description}</p>
            <form onSubmit={handleClaimBlessing} className="w-full">
                <ActionButton type="submit" disabled={processing}>
                    Claim Blessing
                </ActionButton>
            </form>
        </div>
    );
}
