<?php

namespace App\Events;

use App\Models\Game;
use App\States\GameState;
use Illuminate\Support\Carbon;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class AdminCreatedGame extends Event
{
    #[StateId(GameState::class)]
    public ?int $game_id = null;

    public string $name;

    public Carbon $starts_at;

    public Carbon $ends_at;

    public function apply(GameState $state)
    {
        $state->name = $this->name;
        $state->starts_at = $this->starts_at;
        $state->ends_at = $this->ends_at;
        $state->character_ids = collect();
    }

    public function handle(GameState $game)
    {
        Game::create(
            [
                'id' => $game->id,
                'name' => $game->name,
                'starts_at' => $game->starts_at,
                'ends_at' => $game->ends_at,
            ]
        );
    }
}
