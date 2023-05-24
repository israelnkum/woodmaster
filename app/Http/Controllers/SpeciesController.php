<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSpeciesRequest;
use App\Http\Requests\UpdateSpeciesRequest;
use App\Http\Resources\SpeciesResource;
use App\Models\Species;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SpeciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(): AnonymousResourceCollection
    {
        $species = Species::query();

        return SpeciesResource::collection($species->paginate(200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreSpeciesRequest $request
     * @return JsonResponse|SpeciesResource
     */
    public function store(StoreSpeciesRequest $request): JsonResponse|SpeciesResource
    {
        DB::beginTransaction();
        try {
            $request['user_id'] = Auth::id();
            $species = Species::create($request->all());

            DB::commit();

            return new SpeciesResource($species);
        } catch (Exception $exception) {

            Log::error('create species: ', [$exception]);
            DB::rollBack();

            return response()->json([
                'message' => "Something went wrong"
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateSpeciesRequest $request
     * @param Species $species
     * @return JsonResponse|SpeciesResource
     */
    public function update(UpdateSpeciesRequest $request, Species $species): JsonResponse|SpeciesResource
    {
        DB::beginTransaction();
        try {
            $species->update($request->all());

            DB::commit();

            return new SpeciesResource($species);
        } catch (Exception $exception) {

            Log::error('update species: ', [$exception]);
            DB::rollBack();

            return response()->json([
                'message' => "Something went wrong"
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Species $species
     * @return JsonResponse|Response
     */
    public function destroy(Species $species): Response|JsonResponse
    {
        DB::beginTransaction();
        try {
            $species->delete();

            DB::commit();

            return response()->json([
                'message' => 'Species Deleted'
            ]);
        } catch (Exception $exception) {
            Log::error('Delete Species ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }
}
