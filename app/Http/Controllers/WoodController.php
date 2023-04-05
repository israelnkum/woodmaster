<?php

namespace App\Http\Controllers;

use App\Helpers\Barcode;
use App\Http\Requests\StoreWoodRequest;
use App\Http\Requests\UpdateWoodRequest;
use App\Http\Resources\WoodResource;
use App\Models\Wood;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $woods = Wood::query()->paginate(10);

        return WoodResource::collection($woods);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreWoodRequest $request
     * @return WoodResource|JsonResponse
     */
    public function store(StoreWoodRequest $request): WoodResource|JsonResponse
    {
        DB::beginTransaction();

        try {
            $request['number'] = $this->getNumber($request->pallet_log_id, $request->sub_log);
            $request['user_id'] = Auth::user()->id;
            $request['square_meter'] = round(($request->length * $request->width * $request->sheets) / 10000, 2);

            $wood = Wood::create($request->all());

            DB::commit();

            Barcode::printBarcode([
                'length' => $request->length,
                'width' => $request->width,
                'log' => $request->log,
                'subLog' => $request->sub_log,
                'number' => $request->number,
                'sheets' => $request->sheets,
                'squareMeter' => $request->square_meter
            ]);

            return new WoodResource($wood);
        } catch (Exception $exception) {
            Log::error('Add Wood ', [$exception]);

            return response()->json([
                'message' => "Something went wrong"
            ], 400);
        }
    }


    public function getNumber($pallet_log_id, $subLog): int
    {
        $query = Wood::query()->where('pallet_log_id', $pallet_log_id)->where('sub_log', $subLog)->orderBy('created_at', 'desc')->first();

        if ($query) {
            $number = $query->number + 1;
        } else {
            $number = 1;
        }

        return $number;
    }

    /**
     * Display the specified resource.
     *
     * @param UpdateWoodRequest $request
     * @param $id
     * @return WoodResource|JsonResponse
     */
    public function update(UpdateWoodRequest $request, $id): JsonResponse|WoodResource
    {
        DB::beginTransaction();
        try {
            $wood = Wood::findOrFail($id);
            $wood->update($request->all());

            DB::commit();

            return new WoodResource($wood);
        } catch (Exception $exception) {
            Log::error('Update Wood ', [$exception]);

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
            $wood = Wood::findOrFail($id);
            $wood->delete();

            DB::commit();

            return response()->json([
                'message' => 'Wood Deleted'
            ]);
        } catch (Exception $exception) {
            Log::error('Delete Wood ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    public function printBarcode($woodId): JsonResponse
    {
        try {
            $wood = Wood::query()->findOrFail($woodId);

            Barcode::printBarcode([
                'length' => $wood->length,
                'width' => $wood->width,
                'log' => $wood->log,
                'subLog' => $wood->sub_log,
                'number' => $wood->number,
                'sheets' => $wood->sheets,
                'squareMeter' => $wood->square_meter
            ]);

            return response()->json([
                'message' => 'Printing successful'
            ]);

        }catch (\Exception $exception) {
            Log::error('Print Barcode: ', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }
}
