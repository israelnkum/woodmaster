<?php

use App\Http\Controllers\SocialAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('auth/google')->group(static function () {
    Route::get('redirect', [SocialAuthController::class, 'redirectToGoogle']);
    Route::get('callback', [SocialAuthController::class, 'handleGoogleCallback']);
});

Route::get('/account-not-found', static function () {
    return view('auth.account-not-found');
})->name('account-not-found');

Route::middleware(['auth'])->get('/{path?}', function () {
    return view('home');
})->where('path', '.*')->name('home');
