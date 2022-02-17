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
        //
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
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }
}
