import Nav from '@/components/nav';
import { User } from '@/types';
import { PropsWithChildren } from 'react';

export default function Layout({ children, user }: PropsWithChildren<{ user?: User }>) {
    return (
        <>
            {user && <Nav user={user} />}
            {children}
        </>
    );
}
