<?php

namespace App\States;

use App\Models\Character;
use Carbon\Carbon;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Collection;
use Thunk\Verbs\State;

class CharacterState extends State
{
    public const INITIAL_HEALTH = 12;

    public ?Snowflake $user_id = null;

    public Snowflake $game_id;

    public ?Snowflake $blessing_id = null;

    public int $health = self::INITIAL_HEALTH;

    public ?string $element = null;

    public ?Carbon $unlocked_weapon_at = null;

    public ?Carbon $unlocked_armor_at = null;

    public ?Carbon $unlocked_special_at = null;

    public ?Carbon $claimed_at = null;

    public ?Carbon $blessing_claimed_at = null;

    public bool $is_blessing_active = false;

    public ?Carbon $last_acted_at = null;

    public int $expended_points = 0;

    public int $bonus_points = 0;

    public Collection $supported_by_ids;

    public function __construct()
    {
        $this->supported_by_ids = collect();
    }

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
        return $this->user_id ? UserState::load($this->user_id) : null;
    }

    public function blessing()
    {
        return $this->blessing_id && $this->is_blessing_active ? BlessingState::load($this->blessing_id) : null;
    }

    public function attackPower()
    {
        return $this->unlocked_weapon_at ? 2 : 1;
    }

    public function defensePower()
    {
        return $this->unlocked_armor_at ? 1 : 0;
    }

    public function canAct(): bool
    {
        return $this->health > 0 && $this->last_acted_at->addHour() < now();
    }

    public function supportPoints(): int
    {
        return $this->supported_by_ids->count() - $this->expended_points + $this->bonus_points;
    }

    public function supportedBy()
    {
        return $this->supported_by_ids->map(fn($id) => UserState::load($id));
    }

    public function isSupportedBy(Snowflake $user_id): bool
    {
        return $this->supported_by_ids->contains($user_id);
    }

    public function nextThreshold(): int
    {
        $points = $this->supportPoints();

        if ($points >= GameState::FOURTH_THRESHOLD || $this->unlocked_special_at) {
            return 999;
        }

        if ($points >= GameState::THIRD_THRESHOLD || ($this->unlocked_armor_at && $this->unlocked_weapon_at)) {
            return GameState::FOURTH_THRESHOLD;
        }

        if ($points >= GameState::SECOND_THRESHOLD || $this->unlocked_armor_at || $this->unlocked_weapon_at) {
            return GameState::THIRD_THRESHOLD;
        }

        if ($points >= GameState::FIRST_THRESHOLD || $this->element) {
            return GameState::SECOND_THRESHOLD;
        }

        return GameState::FIRST_THRESHOLD;
    }

    public function tier(): int
    {
        $points = $this->supportPoints();

        if ($points >= GameState::FOURTH_THRESHOLD) {
            return 4;
        }

        if ($points >= GameState::THIRD_THRESHOLD) {
            return 3;
        }

        if ($points >= GameState::SECOND_THRESHOLD) {
            return 2;
        }

        if ($points >= GameState::FIRST_THRESHOLD) {
            return 1;
        }

        return 0;
    }
}
