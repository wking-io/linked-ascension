import { redirect } from '@/actions/App/Http/Controllers/Auth/AuthController';
import { Head } from '@inertiajs/react';

export default function Login() {
    return (
        <div>
            <Head title="Log in" />
            <a href={redirect().url} className="">
                Login with Github
            </a>
        </div>
    );
}
