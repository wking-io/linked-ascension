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
Route::get('games/{game}/characters/{character}/welcome', [CharacterController::class, 'welcome'])->name('characters.welcome');
Route::get('games/{game}/characters/{character}/support', [CharacterController::class, 'support'])->name('characters.support');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('games/{game}/characters/{character}/edit', [CharacterController::class, 'edit'])->name('characters.edit');
});

Route::middleware(['auth'])->group(function () {
    Route::get('games/{game}/characters/{character}', [CharacterController::class, 'show'])->name('characters.show');
    Route::get('games/{game}/characters/{character}/claim', [CharacterController::class, 'claim'])->name('characters.claim');
    Route::get('games/{game}/characters/{character}/target', [CharacterController::class, 'target'])->name('characters.target');
    Route::post('games/{game}/characters/{character}/attack', [CharacterController::class, 'attack'])->name('characters.attack');
    Route::get('games/{game}/characters/{character}/upgrade', [CharacterController::class, 'upgrade'])->name('characters.upgrade');
    Route::post('games/{game}/characters/{character}/unlock-element', [CharacterController::class, 'unlockElement'])->name('characters.element.store');
    Route::post('games/{game}/characters/{character}/unlock-armor', [CharacterController::class, 'unlockArmor'])->name('characters.armor.store');
    Route::post('games/{game}/characters/{character}/unlock-weapon', [CharacterController::class, 'unlockWeapon'])->name('characters.weapon.store');
    Route::post('games/{game}/characters/{character}/unlock-special', [CharacterController::class, 'unlockSpecial'])->name('characters.unlockSpecial');
    Route::post('games/{game}/characters/{character}/heal-heart', [CharacterController::class, 'healHeart'])->name('characters.healHeart');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('games/create', [GameController::class, 'create'])->name('games.create');
    Route::post('games', [GameController::class, 'store'])->name('games.store');
    Route::post('games/{game}', [CharacterController::class, 'store'])->name('characters.store');
    Route::get('games/{game}/edit', [GameController::class, 'edit'])->name('games.edit');
});

Route::middleware(['auth'])->group(function () {
    Route::get('games', [GameController::class, 'index'])->name('games.index');
    Route::get('games/{game}', [GameController::class, 'show'])->name('games.show');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('users.index');
});

Route::middleware(['auth'])->group(function () {
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('blessings', [BlessingController::class, 'index'])->name('blessings.index');
    Route::get('blessings/create', [BlessingController::class, 'create'])->name('blessings.create');
    Route::post('blessings', [BlessingController::class, 'store'])->name('blessings.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('games/{game}/characters/{character}/blessings/{blessing}', [BlessingController::class, 'show'])->name('blessings.show');
    Route::post('games/{game}/characters/{character}/blessings/{blessing}/claim', [BlessingController::class, 'claim'])->name('blessings.claim');
});

require __DIR__ . '/auth.php';
