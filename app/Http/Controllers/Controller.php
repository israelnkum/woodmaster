<?php

namespace App\Http\Controllers;

use App\Models\Pallet;
use App\Models\PalletLog;
use App\Models\Quality;
use App\Models\Species;
use App\Models\Wood;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @return JsonResponse
     */
    public function getCommonData(): JsonResponse
    {
        $loggedInUser = Auth::user();

        $species = Species::all();
        $qualities = Quality::all();
        $pallets = Pallet::query()->count();
        $palletLogs = PalletLog::query()->count();
        $woods = Wood::query()->count();

        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        return response()->json([
            'species' => $species,
            'qualities' => $qualities,
            'counts' => [
                'species' => $species->count(),
                'qualities' => $qualities->count(),
                'pallets' => $pallets,
                'palletLogs' => $palletLogs,
                'woods' => $woods,
            ]
        ]);
    }

    public function getRoles()
    {
        return Auth::user()?->getRoleNames();
    }
}
