<?php

use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('users.show', Auth::user());
    }
    return redirect()->route('login');
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
    Route::get('users', [UserController::class, 'index'])->name('users.list');
});

Route::middleware(['auth'])->group(function () {
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
});


require __DIR__ . '/auth.php';
