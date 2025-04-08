<?php

namespace App\Http\Controllers;

use App\Events\AdminCreatedCharacter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;

class CharacterController extends Controller
{
    public function show(Character $character)
    {
        return Inertia::render('characters/show', [
            'character' => $character
        ]);
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
            return redirect()->route('characters.show', $character);
        }

        // 2. Redirect if character is claimed
        if ($character->user_id !== null) {
            return redirect()->route('characters.support', $character);
        }

        // 3. Redirect if there is a logged-in user and character is unclaimed
        if ($user && $character->user_id === null) {
            return redirect()->route('characters.claim', $character);
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
            return redirect()->route('characters.show', $character);
        }

        return Inertia::render('characters/claim', [
            'character' => $character,
            'user_id' => $user->id
        ]);
    }

    public function store(Game $game): RedirectResponse
    {
        AdminCreatedCharacter::fire(
            game_id: $game->id,
        )->game_id;

        return redirect()->route('games.show', $game);
    }
}
