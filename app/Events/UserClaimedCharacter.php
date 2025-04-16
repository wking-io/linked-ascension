<?php

namespace App\Events;

use App\States\CharacterState;
use App\States\GameState;
use App\States\UserState;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Thunk\Verbs\Attributes\Autodiscovery\StateId;
use Thunk\Verbs\Event;

class UserClaimedCharacter extends Event
{
    #[StateId(UserState::class)]
    public Snowflake $user_id;

    #[StateId(GameState::class)]
    public Snowflake $game_id;

    #[StateId(CharacterState::class)]
    public Snowflake $character_id;

    public Carbon $claimed_at;

    public function __construct()
    {
        $this->claimed_at = now();
    }

    public function validate(GameState $game)
    {
        $this->assert(
            ! $game->hasUser($this->user_id),
            'User is already in the game.'
        );
    }

    public function applyToUser(UserState $user)
    {
        $user->addCharacter($this->character_id);
    }

    public function applyToGame(GameState $game)
    {
        $game->addCharacter($this->character_id);
    }

    public function applyToCharacter(CharacterState $character, UserState $user)
    {
        $character->user_id = $this->user_id;
        $character->game_id = $this->game_id;
        $character->claimed_at = $this->claimed_at;
    }

    public function handle(CharacterState $character)
    {
        $character->model()->update(
            [
                'user_id' => $this->user_id,
                'game_id' => $this->game_id,
                'claimed_at' => $this->claimed_at,
            ]
        );
    }
}
