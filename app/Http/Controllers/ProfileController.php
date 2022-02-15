<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Support\Facades\Redirect;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Profile/Index');
    }

    public function updateProfile(Request $request)
    {
        $request->merge([
            'email' => Auth::user()->email,
        ]);

        $user = new UpdateUserProfileInformation();
        $user->update(Auth::user(), $request->all());
        return Redirect::back();
    }

    public function updatePassword(Request $request)
    {
        $user = new UpdateUserPassword();
        $user->update(Auth::user(), $request->all());
        return Redirect::back();
    }
}
