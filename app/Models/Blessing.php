<?php

namespace App\Models;

use App\Enums\BlessingType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blessing extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
    ];

    protected $casts = [
        'type' => BlessingType::class,
    ];

    public function characters(): HasMany
    {
        return $this->hasMany(Character::class);
    }

    public function applyEffect(int $value): int
    {
        return $this->type->applyEffect($value);
    }
}
