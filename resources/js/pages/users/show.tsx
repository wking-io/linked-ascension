import Layout from '@/layouts/layout';
import { SharedData, User } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import create from '@routes/games/create';

interface Props extends PageProps {
    user: User;
}

export default function Show({ user }: Props) {
    const { auth } = usePage<SharedData>().props;
    return (
        <Layout user={auth.user}>
            <p>{user.name}</p>
            {auth.user.is_admin && <Link href={create()}>Create Game</Link>}
            <p>If you have a token and just logged in with Github, scan your token again. Sorry!</p>
        </Layout>
    );
}
