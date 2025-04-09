<?php

namespace App\Events;

use App\Models\Character;
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
    }

    public function handle(CharacterState $state)
    {
        $state->model()->supportedBy()->attach($this->supporter_id->id());
        $state->model()->save();
    }
}
