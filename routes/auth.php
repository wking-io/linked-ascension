<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/auth/redirect', [AuthController::class, 'redirect']);
});

Route::get('/auth/callback', [AuthController::class, 'callback']);
