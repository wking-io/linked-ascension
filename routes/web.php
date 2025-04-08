<?php

use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('user.show', Auth::user());
    }
    return redirect()->route('login');
})->name('home');

// Public character routes
Route::get('character/{character}/welcome', [CharacterController::class, 'welcome'])->name('character.welcome');
Route::get('character/{character}/support', [CharacterController::class, 'support'])->name('character.support');

// Protected routes
Route::middleware(['auth'])->group(function () {
    // Character routes
    Route::get('character/{character}', [CharacterController::class, 'show'])->name('character.show');
    Route::get('character/{character}/claim', [CharacterController::class, 'claim'])->name('character.claim');

    // Game routes
    Route::get('games', [GameController::class, 'index'])->name('game.index');
    Route::get('game/{game}', [GameController::class, 'show'])->name('game.show');

    // User routes
    Route::get('user/{user}', [UserController::class, 'show'])->name('user.show');
    Route::get('user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
});

// Admin-only routes
Route::middleware(['auth', 'admin'])->group(function () {
    // Character admin routes
    Route::get('character/{character}/edit', [CharacterController::class, 'edit'])->name('character.edit');
    Route::get('character/create', [CharacterController::class, 'create'])->name('character.create');

    // Game admin routes
    Route::get('game/{game}/edit', [GameController::class, 'edit'])->name('game.edit');
    Route::get('game/create', [GameController::class, 'create'])->name('game.create');

    // User admin routes
    Route::get('users', [UserController::class, 'index'])->name('user.list');
});

require __DIR__ . '/auth.php';
