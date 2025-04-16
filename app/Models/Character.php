<?php

namespace App\Models;

use App\States\CharacterState;
use Glhd\Bits\Database\HasSnowflakes;
use Glhd\Bits\Snowflake;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
    protected $casts = [
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
    public function blessing(): BelongsTo
    {
        return $this->belongsTo(Blessing::class);
    }
}
