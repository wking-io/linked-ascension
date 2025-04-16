<?php

namespace App\Http\Controllers;

use App\Enums\BlessingType;
use App\Events\AdminCreatedBlessing;
use App\Events\CharacterClaimedBlessing;
use App\Http\Requests\StoreBlessingRequest;
use App\Models\Blessing;
use App\Models\Character;
use App\Models\Game;
use App\States\CharacterState;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BlessingController extends Controller
{
    use AuthorizesRequests;

    public function index(): Response
    {
        $this->authorize('viewAny', Blessing::class);
        return Inertia::render('blessings/index', [
            'blessings' => Blessing::all(),
        ]);
    }

    public function show(Game $game, Character $character, Blessing $blessing)
    {
        $user = Auth::user();
        $response = Gate::inspect('view', $character);
        if ($response->denied()) {
            return to_route('users.show', [$user]);
        }

        if ($character->blessing_id) {
            return to_route('characters.show', [$game, $character]);
        }

        return Inertia::render('blessings/show', [
            'blessing' => $blessing,
            'character' => $character,
            'game' => $game,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Blessing::class);
        return Inertia::render('blessings/create', [
            'blessingTypes' => BlessingType::cases(),
        ]);
    }

    public function store(StoreBlessingRequest $request): RedirectResponse
    {
        $this->authorize('create', Blessing::class);
        $validated = $request->validated();

        AdminCreatedBlessing::fire(
            name: $validated['name'],
            slug: $validated['slug'],
            description: $validated['description'],
            type: BlessingType::from($validated['type']),
        );

        return to_route('blessings.index');
    }

    public function claim(Game $game, Character $character, Blessing $blessing): RedirectResponse
    {
        $response = Gate::inspect('claim', [$blessing, $character]); // Passing $blessing in to use the BlessingPolicy
        if ($response->denied()) {
            return to_route('games.show', [$game]);
        }

        CharacterClaimedBlessing::fire(
            character_id: $character->id,
            blessing_id: $blessing->id,
        );

        return to_route('characters.show', [$game, $character])
            ->with('success', 'Blessing claimed successfully!');
    }

    public function withCharacter(Blessing $blessing)
    {
        $user = Auth::user();

        // Get the user's character in an active game
        $character = Character::query()
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->first();

        $state = CharacterState::load($character->id);
        $game = $state->game();

        if (! $character || $game->isActive()) {
            return to_route('users.show', [$user])
                ->with('error', 'You don\'t have any characters in active games.');
        }

        return to_route('blessings.show', [$character->game, $character, $blessing]);
    }
}
