<?php

namespace App\Carbon;

use Carbon\Carbon;
use Illuminate\Support\Carbon as IlluminateCarbon;
use Illuminate\Support\ServiceProvider;

class HalfHourMacro extends ServiceProvider
{
    public function boot(): void {}

    /**
     * Register the isSameHalfHour macro.
     */
    public function register(): void
    {
        Carbon::macro('isSameHalfHour', function (Carbon $dt) {
            /** @var Carbon $this */
            return $this->isSameDay($dt) &&
                $this->hour === $dt->hour &&
                (int)($this->minute / 30) === (int)($dt->minute / 30);
        });

        IlluminateCarbon::macro('isSameHalfHour', function (IlluminateCarbon $dt) {
            /** @var IlluminateCarbon $this */
            return $this->isSameDay($dt) &&
                $this->hour === $dt->hour &&
                (int)($this->minute / 30) === (int)($dt->minute / 30);
        });
    }
}
