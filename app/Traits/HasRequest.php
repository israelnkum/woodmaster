<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

trait HasRequest
{
    public function formatRequest(Request $request): Request
    {
        return $request->merge(['user_id' => Auth::user()->id]);
    }
}
