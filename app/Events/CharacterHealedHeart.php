<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Event;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;

class CharacterHealedHeart extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public function validate(CharacterState $character)
    {
        $required_threshold = $character->weapon ? GameState::THIRD_THRESHOLD : GameState::SECOND_THRESHOLD;
        $this->assert(
            $character->supportPoints() > 0,
            'Character does not have enough support points to heal.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->health += 4;
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
