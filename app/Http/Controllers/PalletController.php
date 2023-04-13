<?php

namespace App\Http\Controllers;

use App\Exports\EmployeeExport;
use App\Exports\PalletWoodsExport;
use App\Http\Requests\StorePalletRequest;
use App\Http\Requests\UpdatePalletRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\PalletResource;
use App\Http\Resources\WoodResource;
use App\Models\Pallet;
use App\Models\PalletLog;
use App\Models\Wood;
use App\Traits\HasPrint;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PalletController extends Controller
{
    use HasPrint;

    /**
     * Display a listing of the resource.
     *
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $pallets = Pallet::query();

        $pallets->when($request->has('species_id') &&
            $request->species_id !== 'all', function ($q) use ($request) {
            return $q->where('species_id', $request->species_id);
        });

        $pallets->when($request->has('quality_id') &&
            $request->quality_id !== 'all', function ($q) use ($request) {
            return $q->where('quality_id', $request->quality_id);
        });

        $pallets->when($request->has('thickness') &&
            $request->thickness !== 'all', function ($q) use ($request) {
            return $q->where('thickness', $request->thickness);
        });

        $pallets->when($request->has('pallet_number') &&
            $request->pallet_number !== '', function ($q) use ($request) {
            return $q->where('pallet_number', 'like', '%' . $request->pallet_number . '%');
        });

//        $pallets->when($request->has('log_number') &&
//            $request->log_number !== 'all', function ($q) use ($request) {
//            return $q->logs()->where('log_number', $request->log_number);
//        });

        return PalletResource::collection($pallets->paginate(10));
    }

    /**
     * @param Pallet $pallet
     * @return PalletResource
     */
    public function show(Pallet $pallet): PalletResource
    {
        return new PalletResource($pallet);
    }

    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function getPalletWood(Request $request): AnonymousResourceCollection
    {
        $pal = Pallet::findOrFail($request->query('palletId'));
        return WoodResource::collection($pal->woods()->paginate(100));
    }

    public function getPalletSubLogs($palletLogId): JsonResponse
    {
        $pal = Wood::query()->where('pallet_log_id', $palletLogId)->distinct('sub_log')->pluck('sub_log');

        return response()->json($pal);
    }

    /**
     * @param $pallet
     * @return Collection|array
     */
    public function getPalletLogs($pallet): Collection|array
    {
        return PalletLog::query()->where('pallet_id', $pallet)->get();
    }

    /**
     * @param Request $request
     * @param $palletId
     * @return Response|BinaryFileResponse
     */
    public function getPalletReport(Request $request, $palletId): Response|BinaryFileResponse
    {
        $pallet = Pallet::query()->find($palletId);

        $woodResource = WoodResource::collection($pallet->woods)->collection
            ->groupBy(['palletLog.log_number', 'sub_log']);

        if ($request->query('export') === 'true') {
            return Excel::download(new PalletWoodsExport($woodResource, $pallet),
                'Pallet-wood-report.xlsx');
        }

        return $this->pdf('print.pallet.report', [
            'palletId' => $palletId,
            'woodResource' => $woodResource
        ], 'Pallet-' . $pallet->pallet_number);
    }


    /**
     * @param $palletId
     * @return JsonResponse
     */
    public function getPalletStatistics($palletId): JsonResponse
    {
        $pallet = Pallet::query()->find($palletId);

        $res = $pallet->woods->groupBy(['palletLog.log_number', 'sub_log'])
            ->mapToGroups(function ($subLogs, $log) {
                return [
                    'items' => collect($subLogs)->mapToGroups(function ($first, $last) use ($log) {
                        return [$log . '/' . $last => count($first)];
                    })
                ];
            });

        return response()->json($res);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StorePalletRequest $request
     * @return PalletResource|JsonResponse
     */
    public function store(StorePalletRequest $request): PalletResource|JsonResponse
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::user()->id;
            $pallet = Pallet::create($request->all());

            $pallet->logs()->create([
                'log_number' => $request->log,
                'user_id' => Auth::id()
            ]);

            DB::commit();

            return new PalletResource($pallet);
        } catch (Exception $exception) {
            Log::error('Add Pallet ', [$exception]);

            return response()->json([
                'message' => "Something went wrong"
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param UpdatePalletRequest $request
     * @param $id
     * @return PalletResource|JsonResponse
     */
    public function update(UpdatePalletRequest $request, $id): JsonResponse|PalletResource
    {
        DB::beginTransaction();

        try {
            $pallet = Pallet::findOrFail($id);

            $pallet->update($request->all());

            // create a new log if pallet log does not exit
            if (!$pallet->logs->pluck('log_number')->contains($request->log)) {
                $pallet->logs()->create([
                    'log_number' => $request->log,
                    'user_id' => Auth::id()
                ]);

            }

            DB::commit();

            return new PalletResource(Pallet::find($id));
        } catch (Exception $exception) {
            Log::error('Update Pallet ', [$exception]);

            return response()->json([
                'message' => "Something went wrong"
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse|null
     */
    public function destroy($id): ?JsonResponse
    {
        DB::beginTransaction();
        try {
            $pallet = Pallet::findOrFail($id);
            $pallet->delete();

            DB::commit();

            return response()->json([
                'message' => 'Emergency Contact Deleted'
            ]);
        } catch (Exception $exception) {
            Log::error('Delete Pallet ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }
}
