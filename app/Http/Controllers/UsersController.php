<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Support\Facades\Password;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => User::orderByDesc('created_at')->paginate(10),
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
        $user = User::findOrFail($id);

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
        $user = User::findOrFail($id);
        $this->authorize('update', $user);

        // Admin can't revoke his own role

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

        if ($user) {
            User::destroy($id);
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
