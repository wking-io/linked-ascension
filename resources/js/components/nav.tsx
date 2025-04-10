import blessingRoutes from '@/routes/blessings';
import gameRoutes from '@/routes/games';
import userRoutes from '@/routes/users';
import { SharedData, User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Nav({ user }: { user: User }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className="border-b px-4 py-2">
            <ul className="flex gap-4">
                <li>
                    <Link href={userRoutes.show(user.id)}>Home</Link>
                </li>
                <li>
                    <Link href={gameRoutes.index()}>Games</Link>
                </li>
                {auth.user.is_admin && (
                    <li>
                        <Link href={blessingRoutes.index()}>Blessings</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
