<?php

namespace App\Http\Controllers;

use App\Enums\BlessingType;
use App\Events\AdminCreatedCharacter;
use App\Events\CharacterAttackedCharacter;
use App\Events\CharacterCollectedSupport;
use App\Events\CharacterHealedHeart;
use App\Events\CharacterUnlockedArmor;
use App\Events\CharacterUnlockedElement;
use App\Events\CharacterUnlockedSpecial;
use App\Events\CharacterUnlockedWeapon;
use App\Events\UserClaimedCharacter;
use App\Models\Blessing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class CharacterController extends Controller
{
    public function show(Game $game, Character $character)
    {
        if ($character->user_id === null) {
            return to_route('characters.welcome', [$game, $character]);
        }

        $player = $character->user;

        $supportPoints = $character->supportPoints();
        $canGetFirstUpgrade = $character->element === null && $supportPoints >= Game::FIRST_THRESHOLD;
        $canGetSecondeUpgrade = $character->unlocked_armor_at === null && $character->unlocked_weapon_at === null && $supportPoints >= Game::SECOND_THRESHOLD;
        $canGetThirdUpgrade = $character->unlocked_weapon_at === null && $supportPoints >= Game::THIRD_THRESHOLD;
        $canUpgrade = $canGetFirstUpgrade || $canGetSecondeUpgrade || $canGetThirdUpgrade;

        if ($canUpgrade) {
            return to_route('characters.upgrade', [$game, $character]);
        }

        return Inertia::render('characters/show', [
            'game' => $game,
            'character' => array_merge($character->toArray(), ['support_points' => $character->supportPoints()]),
            'next_threshold' => $character->nextThreshold(),
            'player' => $player,
        ]);
    }

    public function edit(Game $game, Character $character)
    {
        return Inertia::render('characters/edit', [
            'game' => $game,
            'character' => $character,
            'next_threshold' => $character->nextThreshold(),
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
        if ($character->user_id !== null || ($user && $game->characters()->where('user_id', $user->id)->exists())) {
            return to_route('characters.support', [$game, $character]);
        }

        // 3. Redirect if there is a logged-in user and character is unclaimed
        if ($user && $character->user_id === null) {
            return to_route('characters.claim', [$game, $character]);
        }

        return Inertia::render('characters/welcome', [
            'game_id' => $game->id,
            'character_id' => $character->id
        ]);
    }

    public function support(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$user) {
            return to_route('login');
        }

        // 1. Redirect if character is unclaimed
        if ($character->user_id === null) {
            return to_route('users.show', $user);
        }

        // 2. Redirect if user owns this character or already supports this character
        if ($character->user_id?->is($user->id) || $character->isSupportedBy($user->id)) {
            return to_route('characters.show', [$game, $character]);
        }

        $character->load('blessing');

        $character->supportedBy()->attach($user->id->id());

        if ($character->blessing?->type === BlessingType::DOUBLE_SUPPORT) {
            if ($character->blessing_claimed_at->addMinutes(15) < now()) {
                $character->bonus_points += 1;
            } else {
                $character->is_blessing_active = false;
            }
        }

        $character->save();

        return Inertia::render('characters/support', [
            'game' => $game,
            'character' => $character
        ]);
    }

    public function claim(Game $game, Character $character)
    {
        $user = Auth::user();


        // Check if user already owns this character
        if ($character->user_id?->is($user->id)) {
            return to_route('characters.show', [$game, $character]);
        }

        if ($character->user_id) {
            return to_route('characters.support', [$game, $character]);
        }

        // Check if user already has a character in this game
        if ($game->characters()->where('user_id', $user->id)->exists()) {
            return to_route('characters.support', [$game, $character])
                ->with('error', 'You already have a character in this game.');
        }


        $character->update(
            [
                'user_id' => $user->id,
                'game_id' => $game->id,
                'claimed_at' => now(),
            ]
        );

        return Inertia::render('characters/claim', [
            'game_id' => $game->id,
            'character_id' => $character->id,
        ]);
    }

    public function store(Game $game): RedirectResponse
    {
        Character::create(
            [
                'game_id' => $game->id,
                'health' => 12,
            ]
        );

        return to_route('games.show', $game);
    }

    public function target(Game $game, Character $character)
    {
        if (!$character->user_id?->is(Auth::user()->id)) {
            return to_route('games.show', [$game]);
        }

        $characters = Character::where('game_id', $game->id)
            // ->where('user_id', '!=', '303499880094707712')
            // ->where('id', '!=', $character->id->id())
            ->get();


        return Inertia::render('characters/target', [
            'character' => $character,
            'game' => $game,
            'characters' => $characters->filter(function ($c) use ($character) {
                return true;
            })->map(function ($character) {
                $data = $character->toArray();
                $user = User::find(id: $character->user_id);
                $data['user'] = $user;
                $blessing = Blessing::find(id: $character->blessing_id?->id());
                $data['blessing_type'] = $blessing->type ?? null;
                $data['support_points'] = $character->supportPoints();
                return $data;
            })->values()->toArray(),
        ]);
    }

    public function attack(Game $game, Character $character, Request $request)
    {
        if (!$character->user_id?->is(Auth::user()->id)) {
            return to_route('games.show', [$game]);
        }

        $request->validate([
            'target_id' => ['required', 'exists:characters,id']
        ]);

        $target = Character::findOrFail($request->target_id)->with('blessing')->first();

        $acted_at = now();

        if ($target->blessing?->type === BlessingType::INVINCIBLE) {
            if ($target->blessing_claimed_at?->isSameHalfHour($acted_at)) {
                return;
            } else {
                $target->is_blessing_active = false;
            }
        }

        if ($character->blessing?->type === BlessingType::DOUBLE_ACTION && $character->last_acted_at?->isSameHalfHour($acted_at)) {
            $character->is_blessing_active = false;
        }

        $attack = $character->attackPower($target);

        if ($character->blessing?->type === BlessingType::DOUBLE_ATTACK_POWER) {
            $attack *= 2;
            $character->is_blessing_active = false;
        }


        $defense = $target->defensePower();

        if ($target->blessing?->type === BlessingType::EVADE) {
            if ($target->blessing_claimed_at?->isSameHalfHour($acted_at)) {
                if (random_int(0, 1) === 1) {
                    $attack = 0;
                }
            } else {
                $target->is_blessing_active = false;
            }
        }

        $target->health -= max($attack - $defense, 0);


        if ($target->health <= 0) {
            if ($target->blessing?->type === BlessingType::FREE_HEART) {
                $target->health = 4;
                $target->is_blessing_active = false;
            }
        }

        // Update the models with the state values
        $character->last_acted_at = $acted_at;

        // Save both models
        $character->save();
        $target->save();

        return to_route('characters.show', [$game, $character])
            ->with('success', 'Attack successful!');
    }

    public function upgrade(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return to_route('characters.show', [$game, $character]);
        }

        $tier = $character->tier();


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
            'nature'
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

        if (!$character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        // @TODO: Add other elements
        $request->validate([
            'element' => ['required', 'string', 'in:fire,water,earth,air']
        ]);

        $character->element = $request->validated('element');
        $character->save();

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockArmor(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        $character->is_armor_unlocked = true;
        $character->save();

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockWeapon(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        $character->is_weapon_unlocked = true;
        $character->save();

        return to_route('characters.show', [$game, $character]);
    }

    public function unlockSpecial(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        $character->is_special_unlocked = true;
        $character->save();

        return to_route('characters.show', [$game, $character]);
    }

    public function healHeart(Game $game, Character $character)
    {
        $user = Auth::user();

        if (!$character->user_id?->is($user->id)) {
            return to_route('games.show', [$game]);
        }

        $character->health = min($character->health + 4, 12);
        $character->save();

        return to_route('characters.show', [$game, $character]);
    }
}
