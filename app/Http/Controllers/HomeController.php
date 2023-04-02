<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestResource;
use App\Http\Resources\MyTeamResource;
use App\Models\EmployeeSupervisor;
use App\Models\LeaveRequest;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
//    public function __construct()
//    {
//        $this->middleware('auth');
//    }

    public function index(): Factory|View|Application
    {
        return view('home');
    }
}
