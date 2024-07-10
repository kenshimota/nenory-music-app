<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StatesController;
use App\Http\Controllers\API\CitiesController;
use App\Http\Controllers\API\SuppliersController;
use App\Http\Controllers\API\PurchasesController;

Route::group(['prefix' => 'auth'], function () {
    Route::post('signin', [AuthController::class, 'signIn']);

    Route::middleware(["auth:api", "auth"])->group(function() {
        Route::get('me', [AuthController::class, 'user']);
        Route::delete('signout', [AuthController::class,'signOut']);
    });
});

Route::get("roles", [RoleController::class, "index"]);
Route::get("cities", [CitiesController::class, "index"]);
Route::get("states", [StatesController::class, "index"]);

Route::group([ "middleware" => ["auth:api", "auth"] ], function(){
    Route::apiResource("users",UserController::class);
    Route::apiResource("suppliers", SuppliersController::class);
    Route::apiResource("purchases", PurchasesController::class);
});

