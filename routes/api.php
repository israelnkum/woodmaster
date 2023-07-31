<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PalletController;
use App\Http\Controllers\SpeciesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WoodController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('commons', [HomeController::class, 'getCommonData']);
    Route::prefix('user')->group(function () {
        Route::get('/{id}/roles/active', [UserController::class, 'getActiveRoles']);
        Route::get('/{id}/roles', [UserController::class, 'getUserRoles']);
        Route::post('/{id}/delete', [UserController::class, 'deleteUser']);
        Route::post('/roles/add', [UserController::class, 'addUserRoles']);
        Route::post('/roles/actions', [UserController::class, 'enableOrDisableRole']);
    });

    Route::resource('/users', UserController::class);
    Route::get('/pallet/search/{query}', [PalletController::class, 'searchPallets']);
    Route::get('/pallet/woods', [PalletController::class, 'getPalletWood']);
    Route::get('/pallet/woods/filter', [PalletController::class, 'filterPalletWoods']);
    Route::get('/pallet/{id}/logs', [PalletController::class, 'getPalletLogs']);
    Route::post('/pallet/logs/delete', [PalletController::class, 'deletePalletLog']);
    Route::get('/pallet-log/{id}/sub-logs', [PalletController::class, 'getPalletSubLogs']);
    Route::apiResource('/pallets', PalletController::class);
    Route::post('/wood/{id}/barcode', [WoodController::class, 'printBarcode']);
    Route::post('/woods/move', [WoodController::class, 'moveWoods']);
    Route::post('/woods/edit-log', [WoodController::class, 'editLog']);
    Route::apiResource('/wood', WoodController::class);

    Route::get('/pallet/{id}/report', [PalletController::class, 'getPalletReport']);

    Route::apiResource('/species', SpeciesController::class);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/pallet/{id}/stats', [PalletController::class, 'getPalletStatistics']);
