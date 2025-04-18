<?php

namespace App\Providers;

use App\Carbon\HalfHourMacro;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict();

        // Register Carbon macros
        $this->app->register(HalfHourMacro::class);
    }
}
