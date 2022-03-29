<?php

namespace App\Http\Controllers;

use App\Enums\TicketStatus;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\ReplyMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class MessageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MessageRequest $request, $id)
    {
        $ticket = Ticket::with('user:id,first_name,last_name', 'worker:id,first_name,last_name')->findOrFail($id);
        if ($ticket->status == TicketStatus::OPEN) {
            $message = Message::create([
                'body' => $request->message,
                'ticket_id' => $id,
                'user_id' => Auth::user()->id,
            ]);

            // Notification
            if ($message->user_id == $ticket->user->first()->id) {
                $user = User::find($ticket->worker->first()->id);
            } elseif ($message->user_id == $ticket->worker->first()->id) {
                $user = User::find($ticket->user->first()->id);
            } else {
                $user = User::findMany([$ticket->worker->first()->id, $ticket->user->first()->id]);
            }
            Notification::send($user, new ReplyMessage($ticket));
            activity()->causedBy(User::find($message->user_id))->performedOn($ticket)->log(':causer.first_name :causer.last_name has replied to ticket :subject.ticket_id');
        }
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $this->authorize('delete', $message);

        if ($message) {
            Message::destroy($id);
        }
        return redirect()->back();
    }
}
