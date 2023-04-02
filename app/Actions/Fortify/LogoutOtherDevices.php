<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutOtherDevices
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param callable $next
     * @return mixed
     */
    public function handle(Request $request, callable $next)
    {
        // logout other devices
        Auth::logoutOtherDevices($request->password);
        return $next($request);
    }
}
