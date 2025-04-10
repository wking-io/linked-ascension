<?php

namespace App\Http\Controllers;

use App\Enums\BlessingType;
use App\Events\AdminCreatedBlessing;
use App\Events\CharacterClaimedBlessing;
use App\Models\Blessing;
use App\Models\Character;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class BlessingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('blessings/index', [
            'blessings' => Blessing::all(),
        ]);
    }

    public function show(Game $game, Character $character, Blessing $blessing): Response
    {
        return Inertia::render('blessings/show', [
            'blessing' => $blessing,
            'character' => $character,
            'game' => $game,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('blessings/create', [
            'blessingTypes' => BlessingType::cases(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'alpha_dash', 'max:255', 'unique:blessings'],
            'type' => ['required', 'string', 'in:' . implode(',', array_column(BlessingType::cases(), 'value'))],
            'description' => ['required', 'string'],
        ]);

        AdminCreatedBlessing::fire(
            name: $validated['name'],
            slug: $validated['slug'],
            description: $validated['description'],
            type: BlessingType::from($validated['type']),
        );

        return redirect()->route('blessings.index');
    }

    public function claim(Game $game, Character $character, Blessing $blessing): RedirectResponse
    {
        if (!$character->user_id?->is(Auth::user()->id)) {
            return redirect()->route('games.show', [$game]);
        }

        CharacterClaimedBlessing::fire(
            character_id: $character->id,
            blessing_id: $blessing->id,
        );

        return redirect()->route('characters.show', [$game, $character])
            ->with('success', 'Blessing claimed successfully!');
    }
}
