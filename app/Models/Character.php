<?php

namespace App\Models;

use App\States\CharacterState;
use Glhd\Bits\Database\HasSnowflakes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Glhd\Bits\Snowflake;

class Character extends Model
{
    use HasFactory, HasSnowflakes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'health',
        'unlocked_armor_at',
        'unlocked_weapon_at',
        'element',
        'claimed_at',
        'last_acted_at',
        'expended_points',
        'game_id',
        'user_id',
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
            'user_id' => Snowflake::class,
            'game_id' => Snowflake::class,
            'unlocked_armor_at' => 'datetime',
            'unlocked_weapon_at' => 'datetime',
            'claimed_at' => 'datetime',
            'last_acted_at' => 'datetime',
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
}
