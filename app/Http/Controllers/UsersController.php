<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('User/Index', [
            'users' => User::orderByDesc('created_at')
                ->where('users.role', 'like', '%' . $request->role . '%')
                ->where(function ($query) use ($request) {
                    $query->where('users.first_name', 'like', '%' . $request->search . '%')
                        ->orWhere('users.last_name', 'like', '%' . $request->search . '%');
                })
                ->paginate(10, ['id', 'first_name', 'last_name', 'email', 'email_verified_at', 'role', 'created_at'])
                ->appends($request->all()),
            'roles' => UserRole::TYPES,
            'filters' => $request->all(),
            'can' => [
                'users_viewAny' => $this->authorize('viewAny', User::class),
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
        return Inertia::render('User/Create', [
            'roles' => UserRole::TYPES,
            'can' => [
                'users_create' => $this->authorize('create', User::class),
            ]
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
        $this->authorize('create', User::class);

        $newUser = new CreateNewUser();
        $newUser->create($request->all());

        return redirect()->route('users');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::withTrashed()->findOrFail($id, ['id', 'first_name', 'last_name', 'email', 'email_verified_at', 'role', 'created_at', 'deleted_at']);
        $tickets = $user->tickets()->with('category:id,name')->paginate(10);

        return Inertia::render('User/Show', [
            'user' => $user,
            'tickets' => $tickets,
            'can' => [
                'users_view' => $this->authorize('view', $user),
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
        $user = User::withTrashed()->findOrFail($id, ['id', 'first_name', 'last_name', 'email', 'role', 'created_at']);

        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => UserRole::TYPES,
            'can' => [
                'users_update' => $this->authorize('update', $user),
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
        $user = User::withTrashed()->findOrFail($id);
        $this->authorize('update', $user);

        // Admin can't revoke his own role
        if (auth()->user()->id == $id) {
            if (auth()->user()->role != $request->input('role')) {
                return redirect()->back()->withErrors(['role' => 'You can not revoke your own admin role.']);
            }
        }

        $newUser = new UpdateUserProfileInformation();
        $newUser->update($user, $request->all());
        return redirect()->route('users');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $this->authorize('delete', $user);

        if ($user && $user != Auth::user()) {
            $user->delete();
        }
        return redirect()->back();
    }

    public function passwordReset($id)
    {
        $user = User::findOrFail($id);
        $this->authorize('update', $user);

        $token = Password::getRepository()->create($user);
        $user->sendPasswordResetNotification($token);
        return redirect()->back();
    }
}
