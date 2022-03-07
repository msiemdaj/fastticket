<?php

namespace App\Http\Controllers;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Category;
use App\Models\Message;
use App\Models\Ticket;
use App\Models\TicketUser;
use App\Models\User;
use App\Notifications\TicketClosed;
use App\Notifications\TicketOpened;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Models\Activity;

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
                ->where(function ($query) use ($request) {
                    if ($request->age != null) {
                        $query->where('tickets.created_at', '>', Carbon::now()->subDays($request->age));
                    }
                })
                ->where('tickets.status', 'like', '%' . $request->status . '%')
                ->where('tickets.priority', 'like', '%' . $request->priority . '%')
                ->where(function ($query) use ($request) {
                    if ($request->category != null) {
                        $query->whereRelation('category', 'id', 'like', '%' . $request->category . '%');
                    }
                })
                ->where(function ($query) use ($request) {
                    $query->where('tickets.title', 'like', '%' . $request->search . '%')
                        ->orWhere('tickets.ticket_id', 'like', '%' . $request->search . '%');
                })
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
            'priorities' => TicketPriority::TYPES,
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
                'priority' => ['required', Rule::in(TicketPriority::TYPES)],
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
                    'ticket_id' => 'TKT-' . strtoupper(bin2hex(random_bytes(8))),
                    'title' => $request->title,
                    'description' => $request->description,
                    'category_id' => $request->category,
                    'status' => TicketStatus::PENDING,
                    'priority' => $request->priority,
                ]);
                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $files[] = $file->store('attachments');
                    }
                    $ticket->attachments = json_encode($files);
                    $ticket->save();
                }
                $ticket->user()->attach(Auth::user()->id);
                activity()->causedBy(Auth::user())->performedOn($ticket)->log(':causer.first_name :causer.last_name created new ticket :subject.ticket_id');

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
        $ticket = Ticket::withTrashed()->with('user:id,first_name,last_name', 'worker:id,first_name,last_name', 'closedBy:id,first_name,last_name', 'category:id,name')->findOrFail($id);
        return Inertia::render('Ticket/Show', [
            'ticket' => $ticket,
            'messages' => Message::where('ticket_id', $id)->with('user:id,first_name,last_name,role')->get(),
            'can' => [
                'ticket_view' => $this->authorize('view', $ticket),
            ],
            'activity' => Activity::orderByDesc('created_at')->where('subject_id', $id)->paginate(10),
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
        $ticket = Ticket::withTrashed()->with('worker:id,first_name,last_name', 'user:id')->findOrFail($id);
        return Inertia::render('Ticket/Edit', [
            'ticket' => $ticket,
            'categories' => Category::all(['id', 'name']),
            'priorities' => TicketPriority::TYPES,
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
        $ticket = Ticket::findOrFail($id);
        $this->authorize('update', $ticket);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required',
            'category' => 'required|exists:categories,id',
            'priority' => [
                'required',
                Rule::in(TicketPriority::TYPES)
            ],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors());
        } else {
            $ticket->forceFill([
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category,
                'priority' => $request->priority,
            ])->save();

            activity()->causedBy(Auth::user())->performedOn($ticket)->log(':causer.first_name :causer.last_name edited ticket :subject.ticket_id details');

            return redirect()->route('ticket.show', $id);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $this->authorize('delete', $ticket);

        $ticket->delete();
        activity()->causedBy(Auth::user())->performedOn($ticket)->log('Ticket :subject.ticket_id was deleted by :causer.first_name :causer.last_name');

        return redirect()->back();
    }

    public function openTicket($id)
    {
        $ticket = Ticket::with('user:id')->findOrFail($id);
        $this->authorize('openTicket', $ticket);
        if (!$ticket->isOpen()) {
            $ticket->user()->updateExistingPivot($ticket->user()->first()->id, ['worker_id' => Auth::user()->id]);
            $ticket->status = TicketStatus::OPEN;
            $ticket->save();

            $user = User::find($ticket->user()->first()->id);
            $user->notify(new TicketOpened($ticket));

            activity()->causedBy(Auth::user())->performedOn($ticket)->log('Ticket :subject.ticket_id was opened by :causer.first_name :causer.last_name');
        }
        return redirect()->route('ticket.show', $id);
    }

    public function closeTicket(Request $request, $id)
    {
        $ticket = Ticket::with('user:id')->findOrFail($id);
        $this->authorize('closeTicket', $ticket);

        if ($request->completed == true) {
            if (!$ticket->isCompleted()) {
                $ticket->status = TicketStatus::COMPLETED;
            }
        } else {
            $ticket->status = TicketStatus::CLOSED;
        }

        $ticket->user()->updateExistingPivot($ticket->user()->first()->id, ['closed_by' => Auth::user()->id]);
        $ticket->save();

        $user = User::find($ticket->worker()->first()->id);
        if (Auth::user()->id != $user->id) {
            $user->notify(new TicketClosed($ticket));
        }
        activity()->causedBy(Auth::user())->performedOn($ticket)->log('Ticket :subject.ticket_id was closed by :causer.first_name :causer.last_name');

        return redirect()->route('ticket.show', $id);
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
                ->where(function ($query) use ($request) {
                    if ($request->age != null) {
                        $query->where('tickets.created_at', '>', Carbon::now()->subDays($request->age));
                    }
                })
                ->whereRelation('worker', 'id', '=', Auth::user()->id)
                ->where('tickets.status', 'like', '%' . $request->status . '%')
                ->where('tickets.priority', 'like', '%' . $request->priority . '%')
                ->where(function ($query) use ($request) {
                    if ($request->category != null) {
                        $query->whereRelation('category', 'id', 'like', '%' . $request->category . '%');
                    }
                })
                ->where(function ($query) use ($request) {
                    $query->where('tickets.title', 'like', '%' . $request->search . '%')
                        ->orWhere('tickets.ticket_id', 'like', '%' . $request->search . '%');
                })
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

    public function deletedTickets(Request $request)
    {
        return Inertia::render('Ticket/DeletedTickets', [
            'tickets' => Ticket::onlyTrashed()->orderByDesc('deleted_at')->with('category:id,name')
                ->where(function ($query) use ($request) {
                    if ($request->age != null) {
                        $query->where('tickets.deleted_at', '>', Carbon::now()->subDays($request->age));
                    }
                })
                ->where('tickets.status', 'like', '%' . $request->status . '%')
                ->where('tickets.priority', 'like', '%' . $request->priority . '%')
                ->where(function ($query) use ($request) {
                    if ($request->category != null) {
                        $query->whereRelation('category', 'id', 'like', '%' . $request->category . '%');
                    }
                })
                ->where(function ($query) use ($request) {
                    $query->where('tickets.title', 'like', '%' . $request->search . '%')
                        ->orWhere('tickets.ticket_id', 'like', '%' . $request->search . '%');
                })
                ->paginate(10)
                ->appends($request->all()),
            'filters' => $request->all(),
            'categories' => Category::all(['id', 'name']),
            'statuses' => TicketStatus::TYPES,
            'priorities' => TicketPriority::TYPES,
            'can' => [
                'viewRestore' => $this->authorize('viewRestore', Ticket::class),
            ],
        ]);
    }

    public function restore($id)
    {
        $ticket = Ticket::withTrashed()->find($id);
        $this->authorize('restore', $ticket);

        $ticket->restore();
        activity()->causedBy(Auth::user())->performedOn($ticket)->log('Ticket :subject.ticket_id has been restored by :causer.first_name :causer.last_name');

        return redirect()->back();
    }
}
