<?php

use App\Helpers\Barcode;
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
    Route::get('/pallet/{id}/wood', [PalletController::class, 'getPalletWood']);
    Route::apiResource('/pallets', PalletController::class);
    Route::post('/wood/{id}/barcode', [WoodController::class, 'printBarcode']);
    Route::apiResource('/wood', WoodController::class);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('commons', [HomeController::class, 'getCommonData']);
//Route::get('test-print', static function () {
//
//    Barcode::printBarcode([
//        'content' => '200/10',
//        'length' => 250,
//        'width' => 18,
//        'log' => 20,
//        'subLog' => 9,
//        'number' => 8,
//        'sheets' => 32,
//        'squareMeter' => 14.40
//    ]);
//});
