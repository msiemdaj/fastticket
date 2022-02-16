<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
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
Route::put('/profile/update/details', [ProfileController::class, 'updateProfile'])->name('profile.update.details')->middleware('auth');
Route::put('/profile/update/password', [ProfileController::class, 'updatePassword'])->name('profile.update.password')->middleware('auth');

# Category
Route::get('/categories', [CategoryController::class, 'index'])->name('categories')->middleware('auth');
Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create')->middleware('auth');
Route::post('/categories/create', [CategoryController::class, 'store'])->name('categories.create')->middleware('auth');
Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit')->middleware('auth');
Route::put('/categories/{id}/update', [CategoryController::class, 'update'])->name('categories.update')->middleware('auth');
Route::delete('/categories/{id}/destroy', [CategoryController::class, 'destroy'])->name('categories.destroy')->middleware('auth');

# User
Route::get('/users', [UsersController::class, 'index'])->name('users')->middleware('auth');
Route::get('/users/create', [UsersController::class, 'create'])->name('users.create')->middleware('auth');
Route::post('/users/create', [UsersController::class, 'store'])->name('users.store')->middleware('auth');
Route::get('/users/{id}/edit', [UsersController::class, 'edit'])->name('users.edit')->middleware('auth');
Route::put('/users/{id}/update', [UsersController::class, 'update'])->name('users.update')->middleware('auth');
Route::post('/users/{id}/password-reset', [UsersController::class, 'passwordReset'])->name('users.password.reset')->middleware('auth');
Route::delete('/users/{id}/destroy', [UsersController::class, 'destroy'])->name('users.destroy')->middleware('auth');
