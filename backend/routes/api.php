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
        Route::post('login', [AuthController::class, 'login']);
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

        Route::middleware(['auth:sanctum'])->group(function(){
            Route::apiResource('lib-category', LibCategoryController::class)->except(['index','show']);
            Route::apiResource('rank', LibRankController::class)->except(['index','show']);
            Route::apiResource('report', ReportController::class)->only(['update']);
            Route::apiResource('station', LibStationController::class)->except(['index', 'show']);
            Route::apiResource('user', UserController::class);
            Route::apiResource('status', LibStatusController::class);
            Route::put('location/{location}', [AuthController::class, 'changeLocation']);
        });
    });
});
