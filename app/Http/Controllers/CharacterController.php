<?php

namespace App\Http\Controllers;

use App\Events\AdminCreatedCharacter;
use App\Events\CharacterAttackedCharacter;
use App\Events\CharacterCollectedSupport;
use App\Events\CharacterHealedHeart;
use App\Events\CharacterUnlockedArmor;
use App\Events\CharacterUnlockedElement;
use App\Events\CharacterUnlockedSpecial;
use App\Events\CharacterUnlockedWeapon;
use App\Events\UserClaimedCharacter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;

class CharacterController extends Controller
{
    public function show(Game $game, Character $character)
    {
        return Inertia::render('characters/show', [
            'game' => $game,
            'character' => $character
        ]);
    }

    public function edit(Game $game, Character $character)
    {
        return Inertia::render('characters/edit', [
            'game' => $game,
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

    public function support(Game $game, Character $character)
    {
        $user = Auth::user();

        if ($character->user_id?->is($user->id) || $character->state()->isSupportedBy($user->id)) {
            return redirect()->route('characters.show', [$game, $character]);
        }

        CharacterCollectedSupport::fire(
            game_id: $game->id,
            character_id: $character->id,
            supporter_id: $user->id
        );

        return Inertia::render('characters/support', [
            'character' => $character
        ]);
    }

    public function claim(Game $game, Character $character)
    {
        $user = Auth::user();

        // Check if user already owns this character
        if ($character->user_id?->is($user->id)) {
            return redirect()->route('characters.show', [$game, $character]);
        }

        // Check if user already has a character in this game
        if ($game->characters()->where('user_id', $user->id)->exists()) {
            return redirect()->route('characters.support', [$game, $character])
                ->with('error', 'You already have a character in this game.');
        }

        UserClaimedCharacter::fire(
            game_id: $game->id,
            character_id: $character->id,
            user_id: $user->id
        );

        return Inertia::render('characters/claim', [
            'game_id' => $game->id,
            'character_id' => $character->id,
        ]);
    }

    public function store(Game $game): RedirectResponse
    {
        AdminCreatedCharacter::fire(
            game_id: $game->id,
        )->game_id;

        return redirect()->route('games.show', $game);
    }

    public function target(Game $game, Character $character)
    {
        if (!$character->user_id?->is(Auth::user()->id)) {
            return redirect()->route('games.show', [$game]);
        }

        return Inertia::render('characters/target', [
            'character' => $character,
            'game' => $game,
            'characters' => $game->characters()->where('id', '!=', $character->id)->get(),
        ]);
    }

    public function attack(Game $game, Character $character, Request $request)
    {
        if (!$character->user_id?->is(Auth::user()->id)) {
            return redirect()->route('games.show', [$game]);
        }

        $request->validate([
            'target_id' => ['required', 'exists:characters,id']
        ]);

        $target = Character::findOrFail($request->target_id);

        CharacterAttackedCharacter::fire(
            game_id: $game->id,
            character_id: $character->id,
            target_id: $target->id
        );

        return redirect()->route('characters.target', [$game, $character])
            ->with('success', 'Attack successful!');
    }

    public function unlockElement(Game $game, Character $character, Request $request)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return redirect()->route('games.show', [$game]);
        }

        // @TODO: Add other elements
        $request->validate([
            'element' => ['required', 'string', 'in:fire,water,earth,air']
        ]);

        CharacterUnlockedElement::fire(
            character_id: $character->id,
            element: $request->element
        );

        return redirect()->route('characters.show', [$game, $character]);
    }

    public function unlockArmor(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return redirect()->route('games.show', [$game]);
        }

        CharacterUnlockedArmor::fire(
            character_id: $character->id,
        );

        return redirect()->route('characters.show', [$game, $character]);
    }

    public function unlockWeapon(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return redirect()->route('games.show', [$game]);
        }

        CharacterUnlockedWeapon::fire(
            character_id: $character->id,
        );

        return redirect()->route('characters.show', [$game, $character]);
    }

    public function unlockSpecial(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return redirect()->route('games.show', [$game]);
        }

        CharacterUnlockedSpecial::fire(
            character_id: $character->id,
        );

        return redirect()->route('characters.show', [$game, $character]);
    }

    public function healHeart(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return redirect()->route('games.show', [$game]);
        }

        CharacterHealedHeart::fire(
            character_id: $character->id,
        );

        return redirect()->route('characters.show', [$game, $character]);
    }
}
