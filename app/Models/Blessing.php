<?php

namespace App\Models;

use App\Enums\BlessingType;
use Glhd\Bits\Database\HasSnowflakes;
use Glhd\Bits\Snowflake;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blessing extends Model
{
    use HasFactory, HasSnowflakes;

    protected $fillable = [
        'id',
        'name',
        'slug',
        'description',
        'type',
    ];

    protected $casts = [
        'id' => Snowflake::class,
        'type' => BlessingType::class,
    ];

    public function characters(): HasMany
    {
        return $this->hasMany(Character::class);
    }
}
