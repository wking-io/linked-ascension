<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\UserAuthenticated;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Thunk\Verbs\Facades\Verbs;

class AuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('auth/login');
    }

    public function redirect(): RedirectResponse
    {
        if (request()->has('redirect_to')) {
            session()->put('post_auth_redirect', request()->query('redirect'));
        }
        return Socialite::driver('github')->redirect();
    }

    public function callback(): RedirectResponse
    {
        $githubUser = Socialite::driver('github')->user();

        $user = User::where('provider_id', $githubUser->getId())->first();

        if (!$user) {
            $user_id = UserAuthenticated::fire(
                name: $githubUser->getName(),
                username: $githubUser->getNickname(),
                email: $githubUser->getEmail(),
                provider_id: $githubUser->getId(),
            )->user_id;

            Verbs::commit();
            $user = User::where('id', $user_id)->first();
        }


        event(new Registered($user));

        Auth::login($user, true);

        // Redirect to the saved route or fallback
        $redirect = session()->pull('post_auth_redirect', route('users.show', $user));

        return redirect()->to($redirect);
    }

    public function logout(): RedirectResponse
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }
}
