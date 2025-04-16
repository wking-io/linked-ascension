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
use App\Models\Character;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CharacterController extends Controller
{
    public function show(Game $game, Character $character)
    {
        if ($character->user_id === null) {
            return to_route('characters.welcome', [$game, $character]);
        }

        $player = $character->user;

        return Inertia::render('characters/show', [
            'game' => $game,
            'character' => array_merge($character->toArray(), ['support_points' => $character->state()->supportPoints()]),
            'next_threshold' => $character->state()->nextThreshold(),
            'github_username' => $player?->username,
        ]);
    }

    public function edit(Game $game, Character $character)
    {
        return Inertia::render('characters/edit', [
            'game' => $game,
            'character' => $character,
            'next_threshold' => $character->state()->nextThreshold(),
        ]);
    }

    public function welcome(Request $request, Game $game, Character $character)
    {
        $user = Auth::user(); // Get current user from session

        // 1. Redirect if user owns the character
        if ($user && $character->user_id === $user->id) {
            return to_route('characters.show', [$game, $character]);
        }

        // 2. Redirect if character is claimed or user has a character in this game
        if ($character->user_id !== null || $game->characters()->where('user_id', $user->id)->exists()) {
            return to_route('characters.support', [$game, $character]);
        }

        // 3. Redirect if there is a logged-in user and character is unclaimed
        if ($user && $character->user_id === null) {
            return to_route('characters.claim', [$game, $character]);
        }

        return Inertia::render('characters/welcome', [
            'game_id' => $game->id,
            'character_id' => $character->id,
        ]);
    }

    public function support(Game $game, Character $character)
    {
        $user = Auth::user();

        // 1. Redirect if character is unclaimed
        if ($character->user_id === null) {
            return to_route('users.show', $user);
        }

        // 2. Redirect if user owns this character or already supports this character
        if ($character->user_id?->is($user->id) || $character->state()->isSupportedBy($user->id)) {
            return to_route('characters.show', [$game, $character]);
        }

        CharacterCollectedSupport::fire(
            game_id: $game->id,
            character_id: $character->id,
            supporter_id: $user->id
        );

        return Inertia::render('characters/support', [
            'game' => $game,
            'character' => $character,
        ]);
    }

    public function claim(Game $game, Character $character)
    {
        $user = Auth::user();

        // Check if user already owns this character
        if ($character->user_id?->is($user->id)) {
            return to_route('characters.show', [$game, $character]);
        }

        // Check if user already has a character in this game
        if ($game->characters()->where('user_id', $user->id)->exists()) {
            return to_route('characters.support', [$game, $character])
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

        return to_route('games.show', $game);
    }

    public function target(Game $game, Character $character)
    {
        if (! $character->user_id?->is(Auth::user()->id)) {
            return to_route('games.show', [$game]);
        }

        $characters = $game->characters()
            ->where('id', '!=', $character->id)
            ->whereNotNull('user_id')
            ->with(['user:id,name,username'])
            ->with(['blessing:id,type'])
            ->get()
            ->map(function ($character) {
                $data = $character->toArray();
                $blessing_type = $character->blessing->type ?? null;

                // Remove the blessing object and add blessing_type directly
                unset($data['blessing']);
                $data['blessing_type'] = $blessing_type;

                return array_merge($data, [
                    'support_points' => $character->state()->supportPoints(),
                ]);
            });

        return Inertia::render('characters/target', [
            'character' => $character,
            'game' => $game,
            'characters' => $characters,
        ]);
    }

    public function attack(Game $game, Character $character, Request $request)
    {
        if (! $character->user_id?->is(Auth::user()->id)) {
            return to_route('games.show', [$game]);
        }

        $request->validate([
            'target_id' => ['required', 'exists:characters,id'],
        ]);

        $target = Character::findOrFail($request->target_id);

        CharacterAttackedCharacter::fire(
            game_id: $game->id,
            character_id: $character->id,
            target_id: $target->id
        );

        return to_route('characters.show', [$game, $character])
            ->with('success', 'Attack successful!');
    }

    public function upgrade(Game $game, Character $character)
    {
        $user = Auth::user();

        if ($character->user_id?->is($user->id)) {
            return to_route('characters.show', [$game, $character]);
        }

        $tier = $character->state()->tier();

        if ($tier === 0) {
            return to_route('characters.show', [$game, $character]);
        }

        // Get all elements claimed by other characters in this game
        $claimedElements = $game->characters()
            ->whereNotNull('element')
            ->pluck('element')
            ->toArray();

        // Define all available elements
        $allElements = [
            'fire',
            'water',
            'earth',
            'air',
            'lightning',
            'ice',
            'metal',
            'nature',
        ];

        // Filter out claimed elements
        $availableElements = array_values(array_diff($allElements, $claimedElements));

        return Inertia::render('characters/upgrade', [
            'game' => $game,
            'character' => $character,
            'tier' => $tier,
            'available_elements' => $availableElements,
        ]);
    }

    public function unlockElement(Game $game, Character $character, Request $request)
    {
        $user = Auth::user();

        if (! $character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        // @TODO: Add other elements
        $request->validate([
            'element' => ['required', 'string', 'in:fire,water,earth,air'],
        ]);

        CharacterUnlockedElement::fire(
            character_id: $character->id,
            element: $request->element
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockArmor(Game $game, Character $character)
    {
        $user = Auth::user();

        if (! $character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        CharacterUnlockedArmor::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockWeapon(Game $game, Character $character)
    {
        $user = Auth::user();

        if (! $character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        CharacterUnlockedWeapon::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockSpecial(Game $game, Character $character)
    {
        $user = Auth::user();

        if (! $character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        CharacterUnlockedSpecial::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function healHeart(Game $game, Character $character)
    {
        $user = Auth::user();

        if (! $character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        CharacterHealedHeart::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }
}
