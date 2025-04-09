import { index } from '@/routes/games';
import show from '@/routes/users/show';
import { User } from '@/types';
import { Link } from '@inertiajs/react';

export default function Nav({ user }: { user: User }) {
    return (
        <nav className="border-b px-4 py-2">
            <ul className="flex gap-4">
                <li>
                    <Link href={show(user.id)}>Home</Link>
                </li>
                <li>
                    <Link href={index()}>Games</Link>
                </li>
            </ul>
        </nav>
    );
}
