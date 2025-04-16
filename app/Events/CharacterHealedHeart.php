<?php

namespace App\Events;

use App\States\CharacterState;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class CharacterHealedHeart extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public function validate(CharacterState $character)
    {
        $this->assert(
            $character->supportPoints() > 0,
            'Character does not have enough support points to heal.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->health = min($character->health + 4, 12);
        $character->expended_points++;
    }

    public function handle(CharacterState $state)
    {
        // Get fresh instance of the model
        $characterModel = $state->model();

        // Update the model with the state values
        $characterModel->health = $state->health;
        $characterModel->expended_points = $state->expended_points;

        // Save the model
        $characterModel->save();
    }
}
