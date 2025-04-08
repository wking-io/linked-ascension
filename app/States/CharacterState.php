<?php

namespace App\States;

use App\Models\Character;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Collection;
use Thunk\Verbs\State;

class CharacterState extends State
{
    public Snowflake $user_id;

    public Snowflake $game_id;

    public int $health;

    public ?string $element = null;

    public bool $weapon;

    public bool $armor;

    public bool $special;

    public ?Carbon $claimed_at = null;

    public ?Carbon $last_acted = null;

    public int $expended_points = 0;

    public Collection $supported_by_ids;

    public function model()
    {
        return Character::find($this->id);
    }

    public function game()
    {
        return GameState::load($this->game_id);
    }

    public function owner()
    {
        return UserState::load($this->user_id);
    }

    public function attackPower()
    {
        return $this->weapon ? 2 : 1;
    }

    public function defensePower()
    {
        return $this->armor ? 2 : 1;
    }

    public function canAct(): bool
    {
        return $this->health > 0 && $this->last_acted->addHour() < now();
    }

    public function supportPoints(): int
    {
        return collect($this->supported_by_ids)->length() - $this->expended_points;
    }

    public function supportedBy()
    {
        return collect($this->supported_by_ids)->map(fn($id) => UserState::load($id));
    }
}
