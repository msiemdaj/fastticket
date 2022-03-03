<?php

namespace App\Http\Controllers;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        /** @var App\Models\User $user */
        $user = Auth::user();
        if ($user->isAdmin() || $user->isWorker()) {
            return Inertia::render('Dashboard/Worker', [
                'newtickets' => Ticket::orderByDesc('created_at')->with('category:id,name')
                    ->where('tickets.created_at', '>', Carbon::now()->subDays(2))
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
                'mytickets' => Ticket::orderByDesc('created_at')->with(['category:id,name', 'worker:id'])
                    ->whereRelation('worker', 'id', '=', Auth::user()->id)->take(10)
                    ->where('tickets.status', TicketStatus::OPEN)->get(),
                'activity' => Activity::orderByDesc('created_at')->take(10)->get(['description', 'subject_id', 'created_at']),
            ]);
        } else {
            return Inertia::render('Dashboard/User', [
                'tickets' => Ticket::orderByDesc('created_at')->with('category:id,name')
                    ->where('tickets.status', 'like', '%' . $request->status . '%')
                    ->where('tickets.priority', 'like', '%' . $request->priority . '%')
                    ->where(function ($query) use ($request) {
                        if ($request->category != null) {
                            $query->whereRelation('category', 'id', 'like', '%' . $request->category . '%');
                        }
                    })
                    ->whereRelation('user', 'id', '=', Auth::user()->id)
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
            ]);
        }
    }
}
