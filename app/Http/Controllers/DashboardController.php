<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
                    ->whereRelation('category', 'id', 'like', '%' . $request->category . '%')
                    ->where('tickets.title', 'like', '%' . $request->search . '%')
                    ->paginate(10)
                    ->appends($request->all()),
                'filters' => $request->all(),
                'categories' => Category::all(['id', 'name']),
            ]);
        } else {
            return Inertia::render('Dashboard/User');
        }
    }
}
