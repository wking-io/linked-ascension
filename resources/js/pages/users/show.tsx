import Layout from '@/layouts/layout';
import create from '@/routes/games/create';
import { SharedData, User } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';

interface Props extends PageProps {
    user: User;
}

export default function Show({ user }: Props) {
    const { auth } = usePage<SharedData>().props;
    return (
        <Layout user={auth.user}>
            <p>{user.name}</p>
            {auth.user.is_admin && <Link href={create()}>Create Game</Link>}
        </Layout>
    );
}
