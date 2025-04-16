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
use App\Http\Requests\AttackCharacterRequest;
use App\Http\Resources\AttackableCharacterResource;
use App\Models\Character;
use App\Models\Game;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CharacterController extends Controller
{
    use AuthorizesRequests;

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
        $this->authorize('update', $character);

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
        $response = Gate::inspect('claim', $character);
        if ($response->denied()) {
            // Redirect if user cannot claim (e.g., already owns one in the game, or char is owned)
            // We replicate the original redirect logic's most restrictive case.
            return to_route('characters.support', [$game, $character])
                ->with('error', 'You already have a character in this game.');
        }

        $user = Auth::user();

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
        $this->authorize('attack', $character);

        $characters = Character::attackableTargets($character, $game)->get();

        return Inertia::render('characters/target', [
            'character' => $character,
            'game' => $game,
            'characters' => AttackableCharacterResource::collection($characters),
        ]);
    }

    // @TODO: I feel like this is one of several instances where we don't need to know the Character.
    // It seems like you're expecting the User to have an active Character that we could refer to
    // instead.
    public function attack(Game $game, Character $character, AttackCharacterRequest $request)
    {
        $target = Character::findOrFail($request->validated()['target_id']);

        CharacterAttackedCharacter::fire(
            game_id: $game->id,
            character_id: $character->id,
            target_id: $target->id
        );

        return to_route('characters.show', [$game, $character])
            ->with('success', 'Attack successful!');
    }

    // @TODO: Move to reusable Service controller.
    public function upgrade(Game $game, Character $character)
    {
        $response = Gate::inspect('upgrade', $character);
        if ($response->denied()) {
            // User doesn't own the character
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
        // @TODO: Move to Enum
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
        $response = Gate::inspect('unlock', $character);
        if ($response->denied()) {
            // User doesn't own the character
            return to_route('games.show', [$game]);
        }

        // @TODO: Add other elements
        // @TODO: Move to FormRequest
        $request->validate([
            // @TODO: Move in to look at enum (Consider Caleb's Sushi package for this)
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
        $response = Gate::inspect('unlock', $character);
        if ($response->denied()) {
            // User doesn't own the character
            return to_route('games.show', [$game]);
        }

        CharacterUnlockedArmor::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockWeapon(Game $game, Character $character)
    {
        $response = Gate::inspect('unlock', $character);
        if ($response->denied()) {
            // User doesn't own the character
            return to_route('games.show', [$game]);
        }

        CharacterUnlockedWeapon::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockSpecial(Game $game, Character $character)
    {
        $response = Gate::inspect('unlock', $character);
        if ($response->denied()) {
            // User doesn't own the character
            return to_route('games.show', [$game]);
        }

        CharacterUnlockedSpecial::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }

    public function healHeart(Game $game, Character $character)
    {
        $response = Gate::inspect('heal', $character);
        if ($response->denied()) {
            // User doesn't own the character
            return to_route('games.show', [$game]);
        }

        CharacterHealedHeart::fire(
            character_id: $character->id,
        );

        return to_route('characters.show', [$game, $character]);
    }
}
