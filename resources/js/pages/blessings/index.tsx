import create from '@/routes/blessings/create';
import { Blessing } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Link } from '@inertiajs/react';

interface Props extends PageProps {
    blessings: Blessing[];
}

export default function Index({ blessings }: Props) {
    return (
        <div>
            <h1>Blessings</h1>
            <Link href={create()}>Create Blessing</Link>
            <ul>
                {blessings.map((blessing) => (
                    <li key={blessing.id}>{blessing.name}</li>
                ))}
            </ul>
        </div>
    );
}
