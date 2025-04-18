<?php

namespace App\Models;

use App\States\GameState;
use Glhd\Bits\Database\HasSnowflakes;
use Glhd\Bits\Snowflake;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory, HasSnowflakes;
    public const FIRST_THRESHOLD = 10;

    public const SECOND_THRESHOLD = 25;

    public const THIRD_THRESHOLD = 50;

    public const FOURTH_THRESHOLD = 200;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'starts_at',
        'ends_at',
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
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function state()
    {
        return GameState::load($this->id);
    }

    /**
     * Get the characters for the game.
     */
    public function characters()
    {
        return $this->hasMany(Character::class);
    }

    public function isActive(): bool
    {
        return $this->starts_at <= now() && $this->ends_at >= now();
    }
}
