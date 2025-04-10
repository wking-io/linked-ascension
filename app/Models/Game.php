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

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
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
