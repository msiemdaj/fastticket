<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    public function showTicket($id)
    {
        $notification = Auth::user()->notifications->where('id', $id)->first();
        if ($notification) {
            $notification->markAsRead();
            return redirect()->route('ticket.show', $notification->data['ticket_id']);
        }
    }

    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->each->markAsRead();
        return redirect()->back();
    }

    public function deleteAll()
    {
        Auth::user()->notifications->each->delete();
        return redirect()->back();
    }
}
