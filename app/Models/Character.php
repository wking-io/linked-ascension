<?php

namespace App\Models;

use App\Enums\Element;
use App\States\CharacterState;
use Glhd\Bits\Database\HasSnowflakes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Glhd\Bits\Snowflake;
use Illuminate\Support\Facades\DB;

class Character extends Model
{
    use HasFactory, HasSnowflakes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'health',
        'unlocked_armor_at',
        'unlocked_weapon_at',
        'element',
        'claimed_at',
        'blessing_claimed_at',
        'last_acted_at',
        'expended_points',
        'bonus_points',
        'game_id',
        'user_id',
        'blessing_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => Snowflake::class,
            'health' => 'int',
            'expended_points' => 'int',
            'bonus_points' => 'int',
            'user_id' => Snowflake::class,
            'game_id' => Snowflake::class,
            'blessing_id' => Snowflake::class,
            'unlocked_armor_at' => 'datetime',
            'unlocked_weapon_at' => 'datetime',
            'claimed_at' => 'datetime',
            'last_acted_at' => 'datetime',
            'blessing_claimed_at' => 'datetime',
        ];
    }

    public function state()
    {
        return CharacterState::load($this->id);
    }

    /**
     * Get the user that this character belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the users that support this character.
     */
    public function supportedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'character_support');
    }

    /**
     * Get the game that this character belongs to.
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Get the blessing that this character has.
     */
    public function blessing()
    {
        return $this->belongsTo(Blessing::class);
    }

    public function attackPower(Character $target)
    {
        $power = $this->unlocked_weapon_at ? 2 : 1;
        $multiplier = $this->element && $target->element ? Element::from($this->element)->getDamageMultiplier(Element::from($target->element)) : 1;

        return $power * $multiplier;
    }

    public function defensePower()
    {
        return $this->unlocked_armor_at ? 1 : 0;
    }

    public function canAct(): bool
    {
        return $this->health > 0 && $this->last_acted_at->addMinutes(30) < now();
    }

    public function supportPoints(): int
    {
        $supportCount = DB::table('character_support')
            ->where('character_id', $this->id->id())
            ->count();
        return $supportCount + ($this->bonus_points - $this->expended_points);
    }

    public function isSupportedBy(Snowflake $supporterId): bool
    {
        return DB::table('character_support')
            ->where('character_id', $this->id->id())
            ->where('user_id', $supporterId->id())
            ->exists();
    }

    public function tier(): int
    {
        $points = $this->supportPoints();

        if ($points >= Game::FOURTH_THRESHOLD) {
            return 4;
        }

        if ($points >= Game::THIRD_THRESHOLD) {
            return 3;
        }

        if ($points >= Game::SECOND_THRESHOLD) {
            return 2;
        }

        if ($points >= Game::FIRST_THRESHOLD) {
            return 1;
        }

        return 0;
    }

    public function nextThreshold(): int
    {
        $points = $this->supportPoints();

        if ($points >= Game::FOURTH_THRESHOLD || $this->unlocked_special_at) {
            return 999;
        }

        if ($points >= Game::THIRD_THRESHOLD || ($this->unlocked_armor_at && $this->unlocked_weapon_at)) {
            return Game::FOURTH_THRESHOLD;
        }

        if ($points >= Game::SECOND_THRESHOLD || $this->unlocked_armor_at || $this->unlocked_weapon_at) {
            return Game::THIRD_THRESHOLD;
        }

        if ($points >= Game::FIRST_THRESHOLD || $this->element) {
            return Game::SECOND_THRESHOLD;
        }

        return Game::FIRST_THRESHOLD;
    }
}
