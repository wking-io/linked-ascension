<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;

class CharacterController extends Controller
{
    public function show(Character $character)
    {
        return Inertia::render('characters/show', [
            'character' => $character
        ]);
    }

    public function create()
    {
        return Inertia::render('characters/create');
    }

    public function edit(Character $character)
    {
        return Inertia::render('characters/edit', [
            'character' => $character
        ]);
    }

    public function welcome(Request $request, Character $character)
    {
        $user = Auth::user(); // Get current user from session

        // 1. Redirect if user owns the character
        if ($user && $character->user_id === $user->id) {
            return redirect()->route('character.show');
        }

        // 2. Redirect if character is claimed
        if ($character->user_id !== null) {
            return redirect()->route('character.support', ['character' => $character->id]);
        }

        // 3. Redirect if there is a logged-in user and character is unclaimed
        if ($user && $character->user_id === null) {
            return redirect()->route('character.claim', ['character' => $character->id]);
        }

        return Inertia::render('characters/welcome', [
            'character_id' => $character->id
        ]);
    }

    public function support(Character $character)
    {
        return Inertia::render('characters/support', [
            'character' => $character
        ]);
    }

    public function claim(Character $character)
    {
        $user = Auth::user();
        if ($character->user_id === $user->id) {
            return redirect()->route('character.show');
        }

        return Inertia::render('characters/claim', [
            'character' => $character,
            'user_id' => $user->id
        ]);
    }
}
