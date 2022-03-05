<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FirstLoginController extends Controller
{
    /**
     * Reset the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $user = new ResetUserPassword();
        $user->reset(Auth::user(), $request->all());
        return redirect()->back();
    }
}
