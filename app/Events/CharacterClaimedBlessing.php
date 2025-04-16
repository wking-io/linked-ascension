<?php

namespace App\Events;

use App\States\BlessingState;
use App\States\CharacterState;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class CharacterClaimedBlessing extends Event
{
    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    #[StateId(BlessingState::class)]
    public Snowflake $blessing_id;

    public ?Carbon $blessing_claimed_at;

    public ?Carbon $claimed_at;

    public function __construct()
    {
        $this->claimed_at = now();
    }

    public function validate(CharacterState $character)
    {
        $this->assert(
            ! $character->blessing_id,
            'Character already has a blessing.'
        );
    }

    public function applyToCharacter(CharacterState $character)
    {
        $character->blessing_id = $this->blessing_id;
        $character->blessing_claimed_at = $this->claimed_at;
        $character->is_blessing_active = true;
    }

    public function applyToBlessing(BlessingState $blessing)
    {
        $blessing->addCharacter($this->character_id);
    }

    public function handle(CharacterState $character, BlessingState $blessing)
    {
        // Get fresh instances of the models
        $characterModel = $character->model();

        // Update the models with the state values
        $characterModel->blessing_id = $character->blessing_id;
        $characterModel->blessing_claimed_at = $character->blessing_claimed_at;
        $characterModel->is_blessing_active = $character->is_blessing_active;

        // Save the models
        $characterModel->save();
    }
}
