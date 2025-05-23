<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Event;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;

class CharacterUnlockedWeapon extends Event
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
        $required_threshold = $character->unlocked_armor_at ? GameState::THIRD_THRESHOLD : GameState::SECOND_THRESHOLD;
        $this->assert(
            $character->supportPoints() >= $required_threshold,
            'Character has not met threshold for weapon upgrade.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->unlocked_weapon_at = $this->unlocked_at;
    }

    public function handle(CharacterState $state)
    {
        // Get fresh instance of the model
        $characterModel = $state->model();

        // Update the model with the state values
        $characterModel->unlocked_weapon_at = $this->unlocked_at;

        // Save the model
        $characterModel->save();
    }
}
