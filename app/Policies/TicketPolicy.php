<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class TicketPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        if ($user->isAdmin() || $user->isWorker()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Ticket $ticket)
    {
        if ($user->isAdmin() || $user->isWorker() || (auth()->check() && $ticket->user()->first()->id == auth()->id())) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Ticket $ticket)
    {
        if ($user->isAdmin() || $user->isWorker() || (auth()->check() && $ticket->user()->first()->id == auth()->id())) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Ticket $ticket)
    {
        if ($user->isAdmin() || $user->isWorker()) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Ticket $ticket)
    {
        if ($user->isAdmin() || $user->isWorker()) {
            return true;
        }
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Ticket $ticket)
    {
        //
    }

    /**
     * Determine whether the user can download the attachment.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function download(User $user, Ticket $ticket)
    {
        if (Auth::check() && ($user->isAdmin() || $user->isWorker() || $ticket->user()->first()->id == auth()->id())) {
            return true;
        }
    }

    public function openTicket(User $user)
    {
        if (Auth::check() && ($user->isAdmin() || $user->isWorker())) {
            return true;
        }
    }

    public function closeTicket(User $user, Ticket $ticket)
    {
        if (
            Auth::check()
            && ($user->isAdmin()
                || ($user->isWorker() && $ticket->worker()->first()->id == auth()->id())
                || $ticket->user()->first()->id == auth()->id())
        ) {
            return true;
        }
    }

    public function viewRestore(User $user)
    {
        if ($user->isAdmin() || $user->isWorker()) {
            return true;
        }
    }
}
