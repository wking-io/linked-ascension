<?php

namespace App\Events;

use App\Enums\BlessingType;
use App\States\CharacterState;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Carbon;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

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
        $can_act = !$character->last_acted_at?->isSameHour($this->acted_at);

        $character_blessing = $character->blessing();
        $can_act = $character_blessing?->type === BlessingType::DOUBLE_ACTION;

        $this->assert(
            $can_act,
            'Character has already used their action for this hour.'
        );

        $this->assert(
            $target->health > 0,
            'Target has 0 health already.'
        );
    }

    public function applyToCharacter(CharacterState $target, CharacterState $character)
    {
        $target_blessing = $target->blessing();

        if ($target_blessing?->type === BlessingType::INVINCIBLE) {
            if ($target->blessing_claimed_at?->isSameHour($this->acted_at)) {
                return;
            }
        }

        $character_blessing = $character->blessing();
        if ($character_blessing?->type === BlessingType::DOUBLE_ACTION && $character->last_acted_at?->isSameHour($this->acted_at)) {
            $character->is_blessing_active = false;
        }

        $character->last_acted_at = $this->acted_at;
    }

    public function applyToTarget(CharacterState $target, CharacterState $character)
    {
        $target_blessing = $target->blessing();

        if ($target_blessing?->type === BlessingType::INVINCIBLE) {
            if ($target->blessing_claimed_at?->isSameHour($this->acted_at)) {
                return;
            } else {
                $target->is_blessing_active = false;
            }
        }

        $attack = $character->attackPower($target);

        $character_blessing = $character->blessing();
        if ($character_blessing?->type === BlessingType::DOUBLE_ATTACK_POWER) {
            $attack *= 2;
            $character->is_blessing_active = false;
        }


        $defense = $target->defensePower();

        if ($target_blessing?->type === BlessingType::EVADE) {
            if ($target->blessing_claimed_at?->isSameHour($this->acted_at)) {
                if (random_int(0, 1) === 1) {
                    $attack = 0;
                }
            } else {
                $target->is_blessing_active = false;
            }
        }

        $target->health -= max($attack - $defense, 0);


        if ($target->health <= 0) {
            if ($target_blessing?->type === BlessingType::FREE_HEART) {
                $target->health = 4;
                $target->is_blessing_active = false;
            }
        }
    }

    public function handle(CharacterState $character, CharacterState $target)
    {
        // Get fresh instances of the models
        $characterModel = $character->model();
        $targetModel = $target->model();

        // Update the models with the state values
        $characterModel->last_acted_at = $character->last_acted_at;
        $characterModel->is_blessing_active = $character->is_blessing_active;
        $targetModel->health = $target->health;
        $targetModel->is_blessing_active = $target->is_blessing_active;

        // Save both models
        $characterModel->save();
        $targetModel->save();
    }
}
