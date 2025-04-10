<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Event;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;

class CharacterUnlockedSpecial extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public ?Carbon $unlocked_at;

    public function __construct()
    {
        $this->unlocked_at = now();
    }

    public function validate(CharacterState $character)
    {
        $this->assert(
            $character->supportPoints() >= GameState::FOURTH_THRESHOLD,
            'Character has not met threshold for special upgrade.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->unlocked_special_at = $this->unlocked_at;
    }

    public function handle(CharacterState $state)
    {
        // Get fresh instance of the model
        $characterModel = $state->model();

        // Update the model with the state values
        $characterModel->unlocked_special_at = $this->unlocked_at;

        // Save the model
        $characterModel->save();
    }
}
