<?php

use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BlessingController;

Route::get('/', function () {
    if (Auth::check()) {
        return to_route('users.show', Auth::user());
    }
    return to_route('login');
})->name('home');

// Public character routes
Route::controller(CharacterController::class)->group(function () {
    Route::get('games/{game}/characters/{character}/welcome', 'welcome')->name('characters.welcome');
    Route::get('games/{game}/characters/{character}/support', 'support')->name('characters.support');
});

// Authenticated and Admin Routes
Route::middleware(['auth', 'can:isAdmin'])->group(function () {
    Route::controller(GameController::class)->prefix('games')->name('games.')->group(function () {
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{game}/edit', 'edit')->name('edit');
    });

    Route::controller(CharacterController::class)->group(function () {
        Route::post('games/{game}', 'store')->name('characters.store'); // Note: This was moved from the GameController group, assuming it relates to storing a character within a game.
        Route::get('games/{game}/characters/{character}/edit', 'edit')->name('characters.edit');
    });

    Route::controller(UserController::class)->prefix('users')->name('users.')->group(function () {
        Route::get('/', 'index')->name('index');
    });

    Route::controller(BlessingController::class)->prefix('blessings')->name('blessings.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
    });
});

// Authenticated Routes
Route::middleware(['auth'])->group(function () {
    Route::controller(GameController::class)->prefix('games')->name('games.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{game}', 'show')->name('show');
    });

    Route::controller(CharacterController::class)->prefix('games/{game}/characters/{character}')->name('characters.')->group(function () {
        Route::get('/', 'show')->name('show');
        Route::get('/claim', 'claim')->name('claim');
        Route::get('/target', 'target')->name('target');
        Route::post('/attack', 'attack')->name('attack');
        Route::get('/upgrade', 'upgrade')->name('upgrade');
        Route::post('/unlock-element', 'unlockElement')->name('element.store');
        Route::post('/unlock-armor', 'unlockArmor')->name('armor.store');
        Route::post('/unlock-weapon', 'unlockWeapon')->name('weapon.store');
        Route::post('/unlock-special', 'unlockSpecial')->name('unlockSpecial'); // Consider renaming to specials.store?
        Route::post('/heal-heart', 'healHeart')->name('healHeart'); // Consider renaming to hearts.store or similar?
    });

    Route::controller(UserController::class)->prefix('users')->name('users.')->group(function () {
        Route::get('/{user}', 'show')->name('show');
        Route::get('/{user}/edit', 'edit')->name('edit');
    });

    Route::controller(BlessingController::class)->name('blessings.')->group(function () {
        Route::get('blessings/{blessing}', 'withCharacter')->name('withCharacter'); // Does this need character context?
        Route::get('games/{game}/characters/{character}/blessings/{blessing}', 'show')->name('show');
        Route::post('games/{game}/characters/{character}/blessings/{blessing}/claim', 'claim')->name('claim');
    });
});

require __DIR__ . '/auth.php';
