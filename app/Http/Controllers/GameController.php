<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Game;

class GameController extends Controller
{
    public function index()
    {
        return Inertia::render('games/list');
    }

    public function show(Game $game)
    {
        return Inertia::render('games/show', [
            'game' => $game
        ]);
    }

    public function create()
    {
        return Inertia::render('games/create');
    }

    public function edit(Game $game)
    {
        return Inertia::render('games/edit', [
            'game' => $game
        ]);
    }
}
