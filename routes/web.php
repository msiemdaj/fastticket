<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware('auth');

# Profile
Route::get('/profile', [ProfileController::class, 'index'])->name('profile')->middleware('auth');
Route::put('profile/update/details', [ProfileController::class, 'updateProfile'])->name('profile.update.details')->middleware('auth');
Route::put('profile/update/password', [ProfileController::class, 'updatePassword'])->name('profile.update.password')->middleware('auth');
