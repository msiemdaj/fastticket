<?php

namespace App\Http\Controllers;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Category;
use App\Models\Message;
use App\Models\Ticket;
use App\Models\TicketUser;
use App\Models\User;
use App\Notifications\TicketOpened;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Ticket/Index', [
            'tickets' => Ticket::orderByDesc('created_at')->with('category:id,name')
                ->where('tickets.status', 'like', '%' . $request->status . '%')
                ->where('tickets.priority', 'like', '%' . $request->priority . '%')
                ->whereRelation('category', 'id', 'like', '%' . $request->category . '%')
                ->where('tickets.title', 'like', '%' . $request->search . '%')
                ->paginate(10)
                ->appends($request->all()),
            'filters' => $request->all(),
            'categories' => Category::all(['id', 'name']),
            'statuses' => TicketStatus::TYPES,
            'priorities' => TicketPriority::TYPES,
            'can' => [
                'ticket_viewAny' => $this->authorize('viewAny', Ticket::class),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Ticket/Create', [
            'categories' => Category::all('id', 'name'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required|string',
                'description' => 'required',
                'category' => 'required|exists:categories,id',
                'attachments' => 'array',
                'attachments.*' => 'mimes:jpg,jpeg,gif,png,tiff,pdf,doc,docx,xls,xlsx,txt',
            ],
            [
                'mimes' => 'File format is invalid',
            ]
        );

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors());
        } else {
            try {
                DB::beginTransaction();
                $ticket = Ticket::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'category_id' => $request->category,
                    'status' => TicketStatus::PENDING,
                    'priority' => TicketPriority::UNASSIGNED,
                ]);
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $files[] = $file->store('attachments');
                    }
                    $ticket->attachments = json_encode($files);
                    $ticket->save();
                }
                $ticket->user()->attach(Auth::user()->id);
                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        Storage::delete($file);
                    }
                }
            }
        }
        // TODO: Redirect to specific ticket (show)
        return redirect()->route('ticket.show', $ticket->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ticket = Ticket::with('user:id,first_name,last_name', 'worker:id,first_name,last_name', 'category:id,name')->findOrFail($id);
        return Inertia::render('Ticket/Show', [
            'ticket' => $ticket,
            'messages' => Message::where('ticket_id', $id)->with('user:id,first_name,last_name,role')->get(),
            'can' => [
                'ticket_view' => $this->authorize('view', $ticket),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $ticket = Ticket::findOrFail($id);
        return Inertia::render('Ticket/Edit', [
            'ticket' => $ticket,
            'can' => [
                'ticket_update' => $this->authorize('update', $ticket),
            ]
        ]);
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
        //
    }

    public function openTicket($id)
    {
        $ticket = Ticket::with('user:id')->findOrFail($id);
        $this->authorize('openTicket', $ticket);
        if (!$ticket->isOpen() && !$ticket->isClosed()) {
            $ticket->user()->updateExistingPivot($ticket->user()->first()->id, ['worker_id' => Auth::user()->id]);
            $ticket->status = TicketStatus::OPEN;
            $ticket->save();

            $user = User::find($ticket->user()->first()->id);
            $user->notify(new TicketOpened($ticket));
        }
        return redirect()->back();
    }

    /**
     * Display a listing of tickets that are opened by worker.
     *
     * @return \Illuminate\Http\Response
     */
    public function myTickets(Request $request)
    {
        return Inertia::render('Ticket/MyTickets', [
            'tickets' => Ticket::orderByDesc('created_at')->with(['category:id,name', 'worker:id'])
                ->whereRelation('worker', 'id', '=', Auth::user()->id)
                ->where('tickets.status', 'like', '%' . $request->status . '%')
                ->where('tickets.priority', 'like', '%' . $request->priority . '%')
                ->whereRelation('category', 'id', 'like', '%' . $request->category . '%')
                ->where('tickets.title', 'like', '%' . $request->search . '%')
                ->paginate(10)
                ->appends($request->all()),
            'filters' => $request->all(),
            'categories' => Category::all(['id', 'name']),
            'statuses' => TicketStatus::TYPES,
            'priorities' => TicketPriority::TYPES,
            'can' => [
                'ticket_viewAny' => $this->authorize('viewAny', Ticket::class),
            ],
        ]);
    }
}
