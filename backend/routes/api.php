<?php

use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\Library\LibCategoryController;
use App\Http\Controllers\api\v1\Library\LibRankController;
use App\Http\Controllers\api\v1\Library\LibStationController;
use App\Http\Controllers\api\v1\Library\LibStatusController;
use App\Http\Controllers\api\v1\ReportController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function(){
        Route::post('register', [AuthController::class, 'register']);
        Route::post('register-as-community', [AuthController::class, 'registerAsCommunity']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);
        Route::middleware(['auth:sanctum'])->group(function (){
            Route::get('user', function (Request $request) {
                $user = $request->user();
                $user->load([
                    'role',
                    'gender',
                    'location',
                    'rank',
                    'station.location',
                    'station.status',
                    'dispatch',
                    'dispatch.location',
                    'dispatch.status',
                    'dispatch.category',
                    'reports.category',
                    'reports.location',
                    'reports.status',
                ]);
                return UserResource::make($user);
            });
        });
    });
    Route::prefix('crud')->group(function(){
        Route::apiResource('lib-category', LibCategoryController::class)->only(['index', 'show']);
        Route::apiResource('rank', LibRankController::class)->only(['index', 'show']);
        Route::apiResource('report', ReportController::class)->except(['update']);
        Route::apiResource('station', LibStationController::class)->only(['index', 'show']);
        Route::post('my-report', [ReportController::class, 'myReport']);


        Route::middleware(['auth:sanctum'])->group(function(){
            Route::apiResource('lib-category', LibCategoryController::class)->except(['index','show']);
            Route::apiResource('rank', LibRankController::class)->except(['index','show']);
            Route::apiResource('report', ReportController::class)->only(['update']);
            Route::apiResource('station', LibStationController::class)->except(['index', 'show']);
            Route::apiResource('user', UserController::class);
            Route::apiResource('status', LibStatusController::class);
            Route::put('location/{location}', [AuthController::class, 'changeLocation']);
            Route::put('status-station/{station}', [LibStationController::class, 'statusStation']);
            Route::get('get-pnp', [UserController::class, 'getPNP']);
            Route::get('pnp-report/{user}', [ReportController::class, 'pnpReport']);
            Route::get('pnp-resolved/{user}', [ReportController::class, 'pnpResolved']);
            Route::get('pnp-unresolved/{user}', [ReportController::class, 'pnpUnresolved']);
            Route::get('dashboard', [ReportController::class, 'dashboard']);
            Route::put('community-user/{user}', [UserController::class, 'communityUser']);

        });
    });
});
