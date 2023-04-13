<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PalletController;
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
    Route::get('/pallet/woods', [PalletController::class, 'getPalletWood']);
    Route::get('/pallet/{id}/logs', [PalletController::class, 'getPalletLogs']);
    Route::get('/pallet-log/{id}/sub-logs', [PalletController::class, 'getPalletSubLogs']);
    Route::apiResource('/pallets', PalletController::class);
    Route::post('/wood/{id}/barcode', [WoodController::class, 'printBarcode']);
    Route::post('/woods/move', [WoodController::class, 'moveWoods']);
    Route::apiResource('/wood', WoodController::class);

    Route::get('/pallet/{id}/report', [PalletController::class, 'getPalletReport']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/pallet/{id}/stats', [PalletController::class, 'getPalletStatistics']);
