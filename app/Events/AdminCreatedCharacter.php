<?php

namespace App\Events;

use App\Models\Character;
use App\States\CharacterState;
use App\States\GameState;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class AdminCreatedCharacter extends Event
{
    #[StateId(CharacterState::class)]
    public ?int $character_id = null;

    #[StateId(GameState::class)]
    public Snowflake $game_id;

    public function applyToCharacter(CharacterState $state)
    {
        $state->game_id = $this->game_id;
        $state->health = CharacterState::INITIAL_HEALTH;
    }

    public function applyToGame(GameState $state)
    {
        collect($state->character_ids)->push($this->character_id);
    }

    public function handle(CharacterState $state)
    {
        Character::create(
            [
                'id' => $state->id,
                'game_id' => $state->game_id,
                'health' => $state->health,
            ]
        );
    }
}
