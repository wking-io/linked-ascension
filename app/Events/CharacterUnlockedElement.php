<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Event;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;

class CharacterUnlockedElement extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public string $element;

    public function validate(CharacterState $character)
    {
        $this->assert(
            $character->supportPoints() >= GameState::FIRST_THRESHOLD,
            'Character has not met threshold for elemental upgrade.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->element = $this->element;
    }

    public function handle(CharacterState $state)
    {
        // Get fresh instance of the model
        $characterModel = $state->model();

        // Update the model with the state values
        $characterModel->element = $state->element;

        // Save the model
        $characterModel->save();
    }
}
