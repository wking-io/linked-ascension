<?php

namespace App\States;

use App\Models\Game;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Thunk\Verbs\State;

class GameState extends State
{
    public string $name;

    public array $character_ids = [];

    public Carbon $starts_at;

    public Carbon $ends_at;

    public function model()
    {
        return Game::find($this->id);
    }

    public function isActive(): bool
    {
        return $this->starts_at <= now() && $this->ends_at >= now();
    }

    public function characters()
    {
        return collect($this->character_ids)->map(fn($id) => CharacterState::load($id));
    }
}
