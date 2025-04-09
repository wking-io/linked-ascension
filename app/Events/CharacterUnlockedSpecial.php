<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Event;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;

class CharacterUnlockedSpecial extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public function validate(CharacterState $character)
    {
        $this->assert(
            $character->supportPoints() >= GameState::FOURTH_THRESHOLD,
            'Character has not met threshold for special upgrade.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->special = true;
    }

    public function handle(CharacterState $state)
    {
        // Get fresh instance of the model
        $characterModel = $state->model();

        // Update the model with the state values
        $characterModel->special = $state->special;

        // Save the model
        $characterModel->save();
    }
}
