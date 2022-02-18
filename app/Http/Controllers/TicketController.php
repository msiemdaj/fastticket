<?php

namespace App\Http\Controllers;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Category;
use App\Models\Ticket;
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
    public function index()
    {
        return Inertia::render('Ticket/Index', [
            'tickets' => Ticket::orderByDesc('created_at')->paginate(10),
            'can' => [
                'ticket_viewAny' => $this->authorize('viewAny', Ticket::class),
            ]
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
            'categories' => Category::all(),
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
                    'user_id' => Auth::user()->id,
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
                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                foreach ($request->file('attachments') as $file) {
                    Storage::delete($file);
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
        $ticket = Ticket::with('user', 'category')->findOrFail($id);
        return Inertia::render('Ticket/Show', [
            'ticket' => $ticket,
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
}
