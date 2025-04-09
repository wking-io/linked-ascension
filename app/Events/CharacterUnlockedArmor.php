<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Event;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;

class CharacterUnlockedArmor extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public function validate(CharacterState $character)
    {
        $required_threshold = $character->armor ? GameState::THIRD_THRESHOLD : GameState::SECOND_THRESHOLD;
        $this->assert(
            $character->supportPoints() >= $required_threshold,
            'Character has not met threshold for armor upgrade.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->armor = true;
    }

    public function handle(CharacterState $state)
    {
        // Get fresh instance of the model
        $characterModel = $state->model();

        // Update the model with the state values
        $characterModel->armor = $state->armor;

        // Save the model
        $characterModel->save();
    }
}
