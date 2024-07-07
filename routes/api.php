<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\API\ForceJsonResponse;
use App\Http\Middleware\API\Cors;
use App\Http\Controllers\API\AuthController;

Route::group(['prefix' => 'auth'], function () {
    Route::post('signin', [AuthController::class, 'signIn']);

    Route::middleware(["auth:api", "auth"])->group(function() {
        Route::get('me', [AuthController::class, 'user']);
        Route::delete('signout', [AuthController::class,'signOut']);
    });
});

Route::group([ "middleware" => ["auth:api", "auth"] ], function(){
});

