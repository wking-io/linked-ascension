import create from '@/routes/games/create';
import show from '@/routes/games/show';
import { Game, SharedData } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';

interface Props extends PageProps {
    games: Game[];
}

export default function List({ games }: Props) {
    const { auth } = usePage<SharedData>().props;
    return (
        <div>
            <h1>Games</h1>
            {auth.user.is_admin && <Link href={create()}>Create Game</Link>}
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <Link href={show(game.id)}>{game.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
