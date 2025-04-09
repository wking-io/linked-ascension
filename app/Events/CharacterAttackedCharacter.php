<?php

namespace App\Events;

use App\States\CharacterState;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

use function Illuminate\Log\log;

class CharacterAttackedCharacter extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    #[StateId(CharacterState::class)]
    public Snowflake $target_id;

    public Carbon $acted_at;

    public function __construct()
    {
        $this->acted_at = now();
    }

    public function validate(CharacterState $character, CharacterState $target)
    {

        // $this->assert(
        //     !$character->last_acted_at?->isSameHour($this->acted_at),
        //     'Character has already used their action for this hour.'
        // );

        // $this->assert(
        //     $target->health > 0,
        //     'Target has 0 health already.'
        // );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->last_acted_at = $this->acted_at;
    }

    public function applyToTarget(CharacterState $target, CharacterState $character)
    {
        $attack = $character->attackPower();
        $defense = $target->defensePower();
        $target->health -= max($attack - $defense, 0);
    }

    public function handle(CharacterState $character, CharacterState $target)
    {
        // Get fresh instances of the models
        $characterModel = $character->model();
        $targetModel = $target->model();

        // Update the models with the state values
        $characterModel->last_acted_at = $character->last_acted_at;
        $targetModel->health = $target->health;

        // Save both models
        $characterModel->save();
        $targetModel->save();
    }
}
