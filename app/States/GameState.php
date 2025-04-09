<?php

namespace App\States;

use App\Models\Game;
use Illuminate\Support\Carbon;
use Thunk\Verbs\State;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Collection;

class GameState extends State
{
    public const FIRST_THRESHOLD = 10;

    public const SECOND_THRESHOLD = 20;

    public const THIRD_THRESHOLD = 40;

    public const FOURTH_THRESHOLD = 80;

    public string $name;

    public Collection $character_ids;

    public Carbon $starts_at;

    public Carbon $ends_at;

    public function __construct()
    {
        $this->character_ids = collect();
    }

    public function addCharacter(Snowflake $character_id): void
    {
        $this->character_ids = $this->character_ids->push($character_id);
    }

    public function hasCharacter(Snowflake $character_id): bool
    {
        return $this->character_ids->contains($character_id);
    }

    public function hasUser(Snowflake $user_id): bool
    {
        return $this->characters()->contains(fn($character) => $character->user_id === $user_id);
    }

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
