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
    }

    public function handle(GameState $state)
    {
        Game::create(
            [
                'id' => $this->game_id,
                'name' => $state->name,
                'starts_at' => $state->starts_at,
                'ends_at' => $state->ends_at,
            ]
        );
    }
}
