<?php

namespace App\Http\Controllers;

use App\Events\AdminCreatedGame;
use App\Http\Requests\StoreGameRequest;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        // @TODO: Use APIResource similar to AttackableCharacterResource for Games
        return Inertia::render('games/index', [
            'games' => Game::query()
                ->orderBy('starts_at', 'desc')
                ->get()
                ->map(fn (Game $game) => [
                    'id' => $game->id,
                    'name' => $game->name,
                    'starts_at' => $game->starts_at,
                    'ends_at' => $game->ends_at,
                ]),
        ]);
    }

    public function show(Game $game): Response
    {
        return Inertia::render('games/show', [
            'game' => $game,
            'characters' => $game->characters,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('games/create');
    }

    public function store(StoreGameRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $game_id = AdminCreatedGame::fire(
            name: $validated['name'],
            starts_at: $validated['starts_at'],
            ends_at: $validated['ends_at'],
        )->game_id;

        return to_route('games.show', $game_id);
    }

    public function edit(Game $game): Response
    {
        return Inertia::render('games/edit', [
            'game' => $game,
        ]);
    }
}
