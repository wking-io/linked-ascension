import show from '@/routes/games/show';
import { Game } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { Link } from '@inertiajs/react';

interface Props extends PageProps {
    games: Game[];
}

export default function List({ games }: Props) {
    return (
        <div>
            <h1>Games</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <Link href={show(`${game.id}`)}>{game.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
