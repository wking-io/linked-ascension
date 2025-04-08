import { type PageProps } from '@inertiajs/core';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    provider: string;
    avatar_url?: string;
    characters?: Array<{ id: number }>;
    supported_characters?: Array<{ id: number }>;
}

interface Props extends PageProps {
    user: User;
}

export default function Show({ user }: Props) {
    return <p>{user.name}</p>;
}
