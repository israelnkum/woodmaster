<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePalletRequest;
use App\Http\Requests\UpdatePalletRequest;
use App\Http\Resources\PalletResource;
use App\Http\Resources\WoodResource;
use App\Models\Pallet;
use App\Models\Wood;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PalletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $pallets = Pallet::query()->paginate(10);

        return PalletResource::collection($pallets);
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
     * @param $pallet
     * @return AnonymousResourceCollection
     */
    public function getPalletWood($pallet): AnonymousResourceCollection
    {
        $pal = Pallet::findOrFail($pallet);

        return WoodResource::collection($pal->woods()->paginate(10));
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
            DB::commit();

            return new PalletResource($pallet);
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
