<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('users/index');
    }

    // @TODO: Make this a page that shows links to the user's characters. Or a link to the video ontro.
    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
        ]);
    }
}
