<?php

namespace App\Events;

use App\Enums\BlessingType;
use App\States\CharacterState;
use App\States\GameState;
use App\States\UserState;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class CharacterCollectedSupport extends Event
{
    #[StateId(UserState::class)]
    public Snowflake $supporter_id;

    #[StateId(GameState::class)]
    public Snowflake $game_id;

    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public function validate(UserState $supporter)
    {
        $this->assert(
            !$supporter->hasSupportedCharacter($this->character_id),
            'User has already supported character.'
        );
    }

    public function applyToSupporter(UserState $supporter)
    {
        $supporter->supported_character_ids->push($this->character_id);
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->supported_by_ids->push($this->supporter_id);

        $blessing = $character->blessing();

        if ($blessing?->type === BlessingType::DOUBLE_SUPPORT) {
            if ($character->blessing_claimed_at->addMinutes(15) < now()) {
                $character->bonus_points += 1;
            } else {
                $character->is_blessing_active = false;
            }
        }
    }

    public function handle(CharacterState $state)
    {
        $characterModel = $state->model();
        $characterModel->supportedBy()->attach($this->supporter_id->id());
        $characterModel->bonus_points = $state->bonus_points;
        $characterModel->is_blessing_active = $state->is_blessing_active;
        $characterModel->save();
    }
}
