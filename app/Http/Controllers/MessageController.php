<?php

namespace App\Http\Controllers;

use App\Enums\TicketStatus;
use App\Models\Message;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\ReplyMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $ticket = Ticket::with('user:id,first_name,last_name', 'worker:id,first_name,last_name')->findOrFail($id);
        $this->authorize('create', [Message::class, $ticket]);

        if ($ticket->status == TicketStatus::OPEN) {
            $validator = Validator::make(
                $request->all(),
                [
                    'message' => 'required',
                ]
            );

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator->errors());
            } else {
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
            }
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
