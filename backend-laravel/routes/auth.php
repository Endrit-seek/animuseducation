<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');

Route::middleware(['auth:sanctum'])->group(function () {
  Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
        ->name('verification.send');
});

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, 'verify'])
                ->middleware(['signed'])
                ->name('verification.verify');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth:sanctum')
                ->name('logout');
