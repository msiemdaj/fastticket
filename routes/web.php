<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\FirstLoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
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


Route::middleware(['firstlogin'])->group(function () {

    # Profile
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile')->middleware('auth');
    Route::put('/profile/update/details', [ProfileController::class, 'updateProfile'])->name('profile.update.details')->middleware('auth');
    Route::put('/profile/update/password', [ProfileController::class, 'updatePassword'])->name('profile.update.password')->middleware('auth');

    # Category
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories')->middleware('auth');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create')->middleware('auth');
    Route::post('/categories/create', [CategoryController::class, 'store'])->name('categories.store')->middleware('auth');
    Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit')->middleware('auth');
    Route::put('/categories/{id}/update', [CategoryController::class, 'update'])->name('categories.update')->middleware('auth');
    Route::delete('/categories/{id}/destroy', [CategoryController::class, 'destroy'])->name('categories.destroy')->middleware('auth');

    # User
    Route::get('/users', [UsersController::class, 'index'])->name('users')->middleware('auth');
    Route::get('/users/create', [UsersController::class, 'create'])->name('users.create')->middleware('auth');
    Route::get('/users/deleted', [UsersController::class, 'deletedUsers'])->name('users.deleted')->middleware('auth');
    Route::post('/users/{id}/restore', [UsersController::class, 'restore'])->name('users.restore')->middleware('auth');
    Route::post('/users/create', [UsersController::class, 'store'])->name('users.store')->middleware('auth');
    Route::get('/users/{id}', [UsersController::class, 'show'])->name('users.show')->middleware('auth');
    Route::get('/users/{id}/edit', [UsersController::class, 'edit'])->name('users.edit')->middleware('auth');
    Route::put('/users/{id}/update', [UsersController::class, 'update'])->name('users.update')->middleware('auth');
    Route::post('/users/{id}/password-reset', [UsersController::class, 'passwordReset'])->name('users.password.reset')->middleware('auth');
    Route::delete('/users/{id}/destroy', [UsersController::class, 'destroy'])->name('users.destroy')->middleware('auth');

    # Ticket
    Route::get('/ticket/all', [TicketController::class, 'index'])->name('ticket.all')->middleware('auth');
    Route::get('/ticket/my-tickets', [TicketController::class, 'myTickets'])->name('ticket.mytickets')->middleware('auth');
    Route::get('/ticket/create', [TicketController::class, 'create'])->name('ticket.create')->middleware('auth');
    Route::post('/ticket/create', [TicketController::class, 'store'])->name('ticket.store')->middleware('auth');
    Route::get('/ticket/deleted', [TicketController::class, 'deletedTickets'])->name('ticket.deleted')->middleware('auth');
    Route::post('/ticket/{id}/restore', [TicketController::class, 'restore'])->name('ticket.restore')->middleware('auth');
    Route::get('/ticket/{id}', [TicketController::class, 'show'])->name('ticket.show')->middleware('auth');
    Route::get('/ticket/{id}/edit', [TicketController::class, 'edit'])->name('ticket.edit')->middleware('auth');
    Route::put('/ticket/{id}/update', [TicketController::class, 'update'])->name('ticket.update')->middleware('auth');
    Route::get('/ticket/{id}/open', [TicketController::class, 'openTicket'])->name('ticket.open')->middleware('auth');
    Route::get('/ticket/{id}/close', [TicketController::class, 'closeTicket'])->name('ticket.close')->middleware('auth');
    Route::delete('/ticket/{id}/destroy', [TicketController::class, 'destroy'])->name('ticket.destroy')->middleware('auth');

    # Download
    Route::get('/ticket/{id}/download', [DownloadController::class, 'download'])->name('attachment.download');

    # Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');

    # Message
    Route::post('/ticket/{id}/message/reply', [MessageController::class, 'store'])->name('message.store')->middleware('auth');
    Route::delete('/message/{id}/delete', [MessageController::class, 'destroy'])->name('message.delete')->middleware('auth');

    # Notifications
    Route::get('/notifications/read/{id}', [NotificationsController::class, 'showTicket'])->name('notifications.read')->middleware('auth');
    Route::get('/notifications/readall', [NotificationsController::class, 'markAllAsRead'])->name('notifications.readall')->middleware('auth');
    Route::get('/notifications/deleteall', [NotificationsController::class, 'deleteAll'])->name('notifications.deleteall')->middleware('auth');

    # Activity
    Route::get('/activity', [ActivityController::class, 'index'])->name('activity')->middleware('auth');
});
# First login
Route::post('/password/first', [FirstLoginController::class, 'store'])->name('password.first')->middleware('auth');
